import { IPrimitive, Nullable, ScalarDictionary } from '@flatfile/adapter';

export type ScalarDictionaryWithCustom = {
  $custom?: ScalarDictionary;
  [key: string]: Nullable<IPrimitive> | ScalarDictionary;
};
