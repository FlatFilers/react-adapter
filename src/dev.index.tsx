import React from 'react';
import { render } from 'react-dom';

import { Button } from './index';

export const mount = (doc: Document) => {
  const container = doc.createElement('div');
  doc.body.appendChild(container);

  render(<Button />, container);
};

mount(document);
