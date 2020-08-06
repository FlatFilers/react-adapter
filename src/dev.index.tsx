import React from 'react';
import { render } from 'react-dom';

import Flatfile from './index';

const ffOptions = {
  config: {
    type: 'test import',
    fields: [
      { label: 'Name', key: 'name' },
      { label: 'Email', key: 'email' },
    ],
  },
  license: 'aa921983-4db2-4da1-a580-fbca0b1c75b2',
  customer: { userId: '12345' },
};

export const mount = (doc: Document) => {
  const container = doc.createElement('div');
  doc.body.appendChild(container);

  render(<Flatfile flatfileOptions={ffOptions} />, container);
};

mount(document);
