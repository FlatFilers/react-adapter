import React from 'react';
import { render } from 'react-dom';
import { FlatfileButton } from './index';

/**
 * @NOTE Apply your token here
 */
const token = 'YOUR_TOKEN_HERE';

export const mount = (doc: Document) => {
  const container = doc.createElement('div');
  doc.body.appendChild(container);
  render(
    <FlatfileButton
      token={token}
      mountUrl='http://localhost:8080'
      apiUrl='http://localhost:3000'
      onInit={(payload) => {
        console.log(payload);
      }}
      onLaunch={(payload) => {
        console.log(payload);
      }}
      onError={(payload) => {
        console.log(payload);
      }}
      onClose={() => {
        console.log('closed');
      }}
      onComplete={async (payload) => {
        console.log(payload);

        console.log(JSON.stringify(await payload.data(true), null, 2));
      }}
    >
      Start FF
    </FlatfileButton>,
    container
  );
};

mount(document);
