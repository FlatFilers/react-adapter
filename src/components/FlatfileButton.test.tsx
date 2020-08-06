import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { Button } from '../index';

import FlatfileButton from './FlatFileButton';

const testSettings = {
  customer: { userId: '12345' },
  licenseKey: 'aa921983-4db2-4da1-a580-fbca0b1c75b2',
  config: {
    type: 'test import',
    fields: [
      { label: 'Name', key: 'name' },
      { label: 'Email', key: 'email' },
    ],
  },
};

// describe('<FlatfileButton settings={testSettings} />', () => {
//   it('renders button', () => {
//     const wrapper = mount(<FlatfileButton settings={testSettings} />);
//     expect(wrapper.contains(<Button />)).toEqual(true);
//   });
// });
describe('<FlatfileButton settings={testSettings} />', () => {
  it('renders button', () => {
    const wrapper = mount(<FlatfileButton settings={testSettings} />);
    expect(wrapper.find('Button')).toHaveLength(1);
  });
});
