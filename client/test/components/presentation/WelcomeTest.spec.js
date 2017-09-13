import React from 'react';
import { shallow } from 'enzyme';
import Welcome from '../../../src/components/presentation/Welcome';

describe('Welcome Component', () => {
  it('should render a welcome component on the landing page', () => {
    const wrapper = shallow(<Welcome />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.find('h4').exists()).toBe(true);
    expect(wrapper.find('p').exists()).toBe(true);
    expect(wrapper.find('footer').exists()).toBe(true);
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('footer').length).toBe(1);
  });
});
