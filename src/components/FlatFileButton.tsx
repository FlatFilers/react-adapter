import FlatfileImporter, { FieldHookCallback } from '@flatfile/adapter';
import CustomerObject from '@flatfile/adapter/build/main/obj.customer';
import { IDataHookResponse } from '@flatfile/adapter/build/main/obj.validation-response';
import FlatfileResults from '@flatfile/adapter/build/main/results';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { IDictionary, ScalarDictionaryWithCustom } from '../interfaces/general';

import { ISettings } from '../interfaces/settings';

const FlatfileButton: FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    settings: ISettings;
    licenseKey: string;
    customer: CustomerObject;
    onCancel?: () => void;
    onData?: (results: FlatfileResults) => Promise<string | void>;
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
      importer: FlatfileImporter,
      launch: () => void
    ) => React.ReactElement;
  }
> = ({
  settings,
  licenseKey,
  customer,
  onCancel,
  onData,
  onRecordChange,
  onRecordInit,
  fieldHooks,
  children,
  render,
  ...props
}) => {
  const [importer, setImporter] = useState<FlatfileImporter>();
  useEffect(() => {
    const tempImporter = new FlatfileImporter(licenseKey, settings, customer);
    if (fieldHooks) {
      for (const key in fieldHooks) {
        tempImporter.registerFieldHook(key, fieldHooks[key]);
      }
    }
    if (onRecordChange || onRecordInit) {
      // @ts-ignore
      tempImporter.registerRecordHook((record, index, eventType) => {
        if (eventType === 'init' && onRecordInit) {
          return onRecordInit(record, index);
        }
        if (eventType === 'change' && onRecordChange) {
          return onRecordChange(record, index);
        }
      });
    }
    setImporter(tempImporter);
  }, []);
  const dataHandler = (results: FlatfileResults) => {
    importer?.displayLoader();
    onData?.(results).then(
      (optionalMessage?: string | void) => {
        importer?.displaySuccess(optionalMessage || 'Success!');
      },
      (error: any) =>
        importer
          ?.requestCorrectionsFromUser(
            error instanceof Error ? error.message : error
          )
          .then(dataHandler, () => onCancel?.())
    );
  };
  const launch = () => {
    if (!importer) {
      return;
    }
    importer.requestDataFromUser().then(dataHandler, () => onCancel?.());
  };
  if (!importer) {
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
