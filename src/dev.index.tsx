import React from 'react';
import { render } from 'react-dom';
import { FlatfileButton } from './index';

const config = {
  type: 'test import',
  fields: [
    { label: 'name', key: 'name' },
    { label: 'Email', key: 'email' },
  ],
};
const license = 'aa921983-4db2-4da1-a580-fbca0b1c75b2';
const customer = { userId: '12345' };

const data = [
  {
    data: {
      firstName: 'foo',
      lastName: 'bar',
      email: 'john@doe.com',
      address: 'US',
    },
    errors: [{ key: 'firstName', message: 'foo' }],
  },
  {
    data: {
      firstName: 'Alice',
      lastName: 'bar',
      email: 'alice@doe.com',
      address: 'US',
    },
    errors: [{ key: 'lastName', message: 'another message' }],
  },
  {
    data: {
      firstName: 'Henry',
      lastName: 'Person',
      email: 'henry@example.com',
      address: 'US',
    },
    errors: [{ key: 'email', message: 'example.com is not allowed' }],
  },
];

export const mount = (doc: Document) => {
  const container = doc.createElement('div');
  doc.body.appendChild(container);
  let errorState = true;
  render(
    <FlatfileButton
      settings={config}
      licenseKey={license}
      customer={customer}
      onData={async (results) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (errorState) {
              reject('rejected');
              errorState = false;
            } else {
              resolve();
            }
          }, 3000);
        });
      }}
      onInteractionEvent={(payload) => {
        console.log('event', payload);
      }}
      onRecordChange={(record) => {
        return { name: { value: record.name?.toString().toUpperCase() } };
      }}
      onRecordInit={(record) => {
        return { name: { value: record.name?.toString().substring(0, 2) } };
      }}
      fieldHooks={{
        email: (values) => {
          return values.map(([item, index]) => [{ value: item + '@' }, index]);
        },
      }}
      onCancel={() => {
        console.log('cancel');
      }}
      render={(importer, launch) => {
        return <a onClick={launch}>upload here</a>;
      }}
      source={data}
    >
      Start FF
    </FlatfileButton>,
    container
  );
};

mount(document);
