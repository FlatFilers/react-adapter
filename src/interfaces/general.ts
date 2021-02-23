export type ScalarDictionary = IDictionary<Nullable<IPrimitive>>;

export interface IDictionary<V = string> {
  [key: string]: V;
}

export type ScalarDictionaryWithCustom = {
  $custom?: ScalarDictionary;
  [key: string]: Nullable<IPrimitive> | ScalarDictionary;
};

export type IPrimitive = string | number | boolean;
export type Nullable<T> = T | undefined | null;
