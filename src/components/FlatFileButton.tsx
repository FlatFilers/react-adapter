import FlatfileImporter, { FieldHookCallback } from '@flatfile/adapter';
import {
  IBeforeFetchRequest,
  IBeforeFetchResponse,
} from '@flatfile/adapter/build/main/obj.before-fetch';
import CustomerObject from '@flatfile/adapter/build/main/obj.customer';
import { IInteractionEvent } from '@flatfile/adapter/build/main/obj.interaction-event';
import LoadOptionsObject from '@flatfile/adapter/build/main/obj.load-options';
import { ISettings } from '@flatfile/adapter/build/main/obj.settings';
import { IDataHookResponse } from '@flatfile/adapter/build/main/obj.validation-response';
import FlatfileResults from '@flatfile/adapter/build/main/results';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { IDictionary, ScalarDictionaryWithCustom } from '../interfaces/general';

export type FlatfileButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  settings: ISettings;
  licenseKey: string;
  customer: CustomerObject;
  onBeforeFetch?: (req: IBeforeFetchRequest) => IBeforeFetchResponse;
  onInteractionEvent?: (req: IInteractionEvent) => void;
  onCancel?: () => void;
  onData?: (results: FlatfileResults) => Promise<string | void | null>;
  onRecordChange?: (
    data: ScalarDictionaryWithCustom,
    index: number
  ) => IDataHookResponse | Promise<IDataHookResponse>;
  onRecordInit?: (
    data: ScalarDictionaryWithCustom,
    index: number
  ) => IDataHookResponse | Promise<IDataHookResponse>;
  fieldHooks?: IDictionary<FieldHookCallback>;
  render?: (
    importer: FlatfileImporter | undefined,
    launch: () => void
  ) => React.ReactElement;
  source?: LoadOptionsObject['source'];
  mountUrl?: string;
  preload?: boolean;
};

const FlatfileButton: FC<FlatfileButtonProps> = ({
  settings,
  licenseKey,
  customer,
  onInteractionEvent,
  onBeforeFetch,
  onCancel,
  onData,
  onRecordChange,
  onRecordInit,
  fieldHooks,
  children,
  render,
  source,
  mountUrl,
  preload = true,
  ...props
}) => {
  const importerRef = useRef<FlatfileImporter>();
  const [loaded, setLoaded] = useState(false);
  const loadImporter = () => {
    if (importerRef.current) {
      return;
    }
    if (mountUrl) {
      FlatfileImporter.setMountUrl(mountUrl);
    }
    const tempImporter = new FlatfileImporter(licenseKey, settings, customer);
    if (fieldHooks) {
      for (const key in fieldHooks) {
        tempImporter.registerFieldHook(key, fieldHooks[key]);
      }
    }
    if (onBeforeFetch) {
      tempImporter.registerBeforeFetchCallback(onBeforeFetch);
    }
    if (onInteractionEvent) {
      tempImporter.registerInteractionEventCallback(onInteractionEvent);
    }
    if (onRecordChange || onRecordInit) {
      tempImporter.registerRecordHook(
        (
          record: ScalarDictionaryWithCustom,
          index: number,
          eventType: 'init' | 'change'
        ) => {
          if (eventType === 'init' && onRecordInit) {
            return onRecordInit(record, index);
          }
          if (eventType === 'change' && onRecordChange) {
            return onRecordChange(record, index);
          }
        }
      );
    }
    importerRef.current = tempImporter;
    setLoaded(true);
  };
  useEffect(() => {
    if (preload) {
      loadImporter();
    }
  }, []);
  const dataHandler = useCallback(
    (results: FlatfileResults) => {
      importerRef.current?.displayLoader();
      onData?.(results).then(
        (optionalMessage) =>
          optionalMessage !== null
            ? importerRef.current?.displaySuccess(optionalMessage || undefined)
            : importerRef.current?.close(),
        (error: Error | string) =>
          importerRef.current
            ?.requestCorrectionsFromUser(
              error instanceof Error ? error.message : error
            )
            .then(dataHandler, () => onCancel?.())
      );
    },
    [onData, onCancel]
  );
  const launch = () => {
    if (!importerRef.current) {
      if (preload) {
        return;
      }
      loadImporter();
    }
    importerRef.current
      ?.requestDataFromUser({ source })
      .then(dataHandler, () => onCancel?.());
  };
  if (!loaded && preload) {
    return <></>;
  }
  return render ? (
    render(importerRef.current, launch)
  ) : (
    <button {...props} onClick={launch}>
      {children}
    </button>
  );
};

export default FlatfileButton;
