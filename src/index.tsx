import FlatfileImporter from '@flatfile/adapter';
import FlatfileResults from '@flatfile/adapter/build/main/results';
import { ISettings as FlatfileSettings } from 'interfaces/settings';

import FlatfileButton from './components/FlatFileButton';
import { useFlatfileImporter } from './components/useFlatfileImporter';

export {
  FlatfileButton,
  FlatfileImporter,
  FlatfileResults,
  FlatfileSettings,
  useFlatfileImporter,
};
