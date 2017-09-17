import React from 'react';
import { mount } from 'enzyme';
import User from '../../../src/components/presentation/User';

describe('User Component', () => {
  const user = {
    username: 'phemmz',
    email: 'phemmzmcllroy@gmail.com',
    phoneNumber: '08012345678'
  };
  it('should render a user component', () => {
    const wrapper = mount(<User user={user} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('user')).toBe(user);
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.find('span').exists()).toBe(true);
    expect(wrapper.find('br').exists()).toBe(true);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('span').length).toBe(3);
    expect(wrapper.find('br').length).toBe(2);
  });
});