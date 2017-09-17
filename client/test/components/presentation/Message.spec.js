import React from 'react';
import { mount } from 'enzyme';
import Message from '../../../src/components/presentation/Message';

describe('Message Component', () => {
  const currentMessage = {
    messagecreator: 'phemmz',
    priority: 'Normal',
    createdAt: '2017-09-06T14:53:09.414Z',
    content: 'nah'
  };

  const readList = 'phemmz';
  it('displays each message in a group', () => {
    const wrapper = mount(<Message
      currentMessage={currentMessage}
      readList={readList}
    />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('currentMessage')).toBe(currentMessage);
    expect(wrapper.prop('readList')).toBe(readList);
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.find('span').exists()).toBe(true);
    expect(wrapper.find('ul').exists()).toBe(true);
    expect(wrapper.find('li').exists()).toBe(true);
    expect(wrapper.find('i').exists()).toBe(true);
    expect(wrapper.find('hr').exists()).toBe(true);
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('span').length).toBe(5);
    expect(wrapper.find('hr').length).toBe(1);
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('li').length).toBe(1);
    expect(wrapper.find('i').length).toBe(1);
  });
});
