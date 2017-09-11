import React from 'react';
import { mount } from 'enzyme';
import SideNav from '../../../src/components/presentation/SideNav';

describe('SideNav Component', () => {
  const currentUser = {
    username: 'phemmz',
    email: 'phemmzmcllroy@gmail.com'
  };
  it('should render a sidenav component', () => {
    const wrapper = mount(<SideNav currentUser={currentUser} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('currentUser')).toBe(currentUser);
    expect(wrapper.find('ul').exists()).toBe(true);
    expect(wrapper.find('li').exists()).toBe(true);
    expect(wrapper.find('h5').exists()).toBe(true);
    expect(wrapper.find('a').exists()).toBe(true);
    expect(wrapper.find('i').exists()).toBe(true);
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('li').length).toBe(5);
    expect(wrapper.find('h5').length).toBe(2);
    expect(wrapper.find('a').length).toBe(2);
    expect(wrapper.find('i').length).toBe(2);
  });
});
