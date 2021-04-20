import FlatfileImporter, {
  CustomerObject as FlatfileCustomer,
  FieldHookCallback,
  FlatfileResults,
  IDataHookResponse,
} from '@flatfile/adapter';
import { ISettings as FlatfileSettings } from '@flatfile/adapter';

import FlatfileButton from './components/FlatFileButton';

export * from './interfaces/general';

export {
  FlatfileButton,
  FlatfileCustomer,
  FlatfileImporter,
  FlatfileResults,
  FieldHookCallback,
  IDataHookResponse,
  FlatfileSettings,
};
