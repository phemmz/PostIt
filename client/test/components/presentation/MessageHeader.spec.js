import React from 'react';
import { mount } from 'enzyme';
import MessageHeader from '../../../src/components/presentation/MessageHeader';

describe('MessageHeader Component', () => {
  it('should render groupname of the group selected', () => {
    const wrapper = mount(<MessageHeader groupName="Random" />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('groupName')).toBe('Random');
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.find('span').exists()).toBe(true);
    expect(wrapper.find('h5').exists()).toBe(true);
    expect(wrapper.find('strong').exists()).toBe(true);
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('h5').length).toBe(1);
    expect(wrapper.find('strong').length).toBe(1);
  });
});
