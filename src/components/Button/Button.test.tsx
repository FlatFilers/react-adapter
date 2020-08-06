import { mount } from 'enzyme';
import * as React from 'react';

import Button from './Button';

describe('<Button />', () => {
  it('to render', () => {
    const wrapper = mount(<Button text='Import with Flatfile' />);
    const button = wrapper.find('button');

    expect(button.text()).toEqual('Import with Flatfile');
  });
});
