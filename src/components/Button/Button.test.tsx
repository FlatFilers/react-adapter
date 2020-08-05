import { mount } from 'enzyme';
import * as React from 'react';

import Button from './Button';

describe('<Button />', () => {
  it('to render', () => {
    const wrapper = mount(<Button />);
    const button = wrapper.find('button');

    expect(button.text()).toEqual('click me');
  });
});
