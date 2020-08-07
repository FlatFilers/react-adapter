import FlatfileImporter from '@flatfile/adapter';
import FlatfileResults from '@flatfile/adapter/build/main/results';
import { FC, useEffect, useState } from 'react';
import * as React from 'react';

import { Button } from '../index';

const FlatfileButton: FC<{ settings: any }> = ({ settings }) => {
  const [importer, setImporter] = useState<FlatfileImporter>();
  const { config, license, customer } = settings;
  useEffect(() => {
    const tempImporter = new FlatfileImporter(license, config);
    tempImporter.setCustomer(customer);
    setImporter(tempImporter);
  }, []);
  const launch = () => {
    if (!importer) {
      return;
    }
    importer
      .requestDataFromUser()
      .then((results: FlatfileResults) => {
        importer.displayLoader();
        console.log(results);
      })
      .then((something) => importer.displaySuccess('Success!'));
  };
  return <Button clickFunction={launch} text='Import with Flatfile' />;
};

export default FlatfileButton;
