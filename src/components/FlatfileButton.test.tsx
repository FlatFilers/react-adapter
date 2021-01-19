import { mount } from 'enzyme';
import * as React from 'react';

import FlatfileButton, { FlatfileButtonProps } from './FlatFileButton';

describe('<FlatfileButton />', () => {
  it.skip('renders button', () => {
    const testProps: FlatfileButtonProps = {
      customer: { userId: '12345' },
      licenseKey: 'aa921983-4db2-4da1-a580-fbca0b1c75b2',
      settings: {
        type: 'test import',
        fields: [
          { label: 'Name', key: 'name' },
          { label: 'Email', key: 'email' },
        ],
      },
    };
    const wrapper = mount(<FlatfileButton {...testProps} />);
    expect(wrapper.contains('button')).toEqual(true);
  });
});
