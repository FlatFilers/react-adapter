export type ScalarDictionary = IDictionary<Nullable<IPrimitive>>;
export type IPrimitiveDictionary = IDictionary<IPrimitive>;

export interface IDictionary<V = string> {
  [key: string]: V;
}

export interface IValidationResponse {
  key: string;
  message: string;
  level?: IWarningLevel;
}

export type ScalarDictionaryWithCustom = {
  $custom?: ScalarDictionary;
  [key: string]: Nullable<IPrimitive> | ScalarDictionary;
};

type IWarningLevel = 'error' | 'warning' | 'info';

export type IPrimitive = string | number | boolean;
export type Nullable<T> = T | undefined | null;
