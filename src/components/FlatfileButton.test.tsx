import { mount } from 'enzyme';
import * as React from 'react';

import FlatfileButton, { FlatfileButtonProps } from './FlatFileButton';

describe('<FlatfileButton />', () => {
  it.skip('renders button', () => {
    const testProps: FlatfileButtonProps = {
      token: 'YOUR_TOKEN',
    };
    const wrapper = mount(<FlatfileButton {...testProps} />);
    expect(wrapper.contains('button')).toEqual(true);
  });
});
