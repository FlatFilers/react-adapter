import {
  IDataHookResponse,
  IPrimitive,
  Nullable,
  ScalarDictionary,
} from '@flatfile/adapter';

export type ScalarDictionaryWithCustom = {
  $custom?: ScalarDictionary;
  [key: string]: Nullable<IPrimitive> | ScalarDictionary;
};

export interface ICorrectionsFromUser {
  message: string;
  corrections: IDataHookResponse[];
}
