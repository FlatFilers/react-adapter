import FlatfileImporter, { FieldHookCallback } from '@flatfile/adapter';
import CustomerObject from '@flatfile/adapter/build/main/obj.customer';
import { IDataHookResponse } from '@flatfile/adapter/build/main/obj.validation-response';
import { useEffect, useState } from 'react';

import {
  IBeforeFetchRequest,
  IBeforeFetchResponse,
  IDictionary,
  ScalarDictionaryWithCustom,
} from '../interfaces/general';
import { ISettings } from '../interfaces/settings';

interface Props {
  settings: ISettings;
  licenseKey: string;
  customer: CustomerObject;
  onBeforeFetch?: (req: IBeforeFetchRequest) => IBeforeFetchResponse;
  onRecordChange?: (
    data: ScalarDictionaryWithCustom,
    index: number
  ) => IDataHookResponse | Promise<IDataHookResponse>;
  onRecordInit?: (
    data: ScalarDictionaryWithCustom,
    index: number
  ) => IDataHookResponse | Promise<IDataHookResponse>;
  fieldHooks?: IDictionary<FieldHookCallback>;
  mountUrl?: string;
}

export function useFlatfileImporter({
  settings,
  licenseKey,
  customer,
  onBeforeFetch,
  onRecordChange,
  onRecordInit,
  fieldHooks,
  mountUrl,
}: Props): FlatfileImporter | undefined {
  const [importer, setImporter] = useState<FlatfileImporter>();

  useEffect(() => {
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
    if (onRecordChange || onRecordInit) {
      tempImporter.registerRecordHook(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (record: any, index: number, eventType: 'init' | 'change') => {
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
  }, []);

  return importer;
}
