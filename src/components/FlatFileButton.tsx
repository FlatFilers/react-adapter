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
import React, { FC, useEffect, useRef, useState } from 'react';

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
  const importerLoaded = useRef(false);
  const [importer, setImporter] = useState<FlatfileImporter>();
  const loadImporter = () => {
    if (importerLoaded.current) {
      return;
    }

    importerLoaded.current = true;

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
    setImporter(tempImporter);

    return tempImporter;
  };
  useEffect(() => {
    if (preload) {
      loadImporter();
    }
  }, []);
  const dataHandler = (results: FlatfileResults) => {
    importer?.displayLoader();
    onData?.(results).then(
      (optionalMessage) =>
        optionalMessage !== null
          ? importer?.displaySuccess(optionalMessage || undefined)
          : importer?.close(),
      (error: Error | string) =>
        importer
          ?.requestCorrectionsFromUser(
            error instanceof Error ? error.message : error
          )
          .then(dataHandler, () => onCancel?.())
    );
  };
  const launch = () => {
    if (!importer) {
      if (!preload) {
        loadImporter()
          ?.requestDataFromUser({ source })
          .then(dataHandler, () => onCancel?.());
      }

      return;
    }
    importer
      .requestDataFromUser({ source })
      .then(dataHandler, () => onCancel?.());
  };
  if (!importer && preload) {
    return <></>;
  }
  return render ? (
    render(importer, launch)
  ) : (
    <button {...props} onClick={launch}>
      {children}
    </button>
  );
};

export default FlatfileButton;
