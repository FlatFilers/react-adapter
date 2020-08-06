import FlatfileImporter from '@flatfile/adapter';
import FlatfileResults from '@flatfile/adapter/build/main/results';
import * as React from 'react';

import { Button } from '../index';

const Flatfile: any = (flatfileOptions: {}) => {
  const { config, license, customer } = flatfileOptions.flatfileOptions;
  console.log(flatfileOptions);
  const importer = new FlatfileImporter(license, config);
  importer.setCustomer(customer);
  const launch = () => {
    importer
      .requestDataFromUser()
      .then((results: FlatfileResults) => {
        importer.displayLoader();
        console.log(results);
      })
      .then((something) => importer.displaySuccess('yay'));
  };
  return <Button clickFunction={launch} text='click me' />;
};

export default Flatfile;
