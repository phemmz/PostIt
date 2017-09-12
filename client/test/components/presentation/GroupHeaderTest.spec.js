import React from 'react';
import { mount } from 'enzyme';
import GroupHeader from '../../../src/components/presentation/GroupHeader';

describe('Message Component', () => {
  const notifications = ['New message from neene'];
  const noNotification = [];
  const children = (
    <div className="scrbar center">
      <h5>You currently dont belong to any group</h5>
    </div>);
  it('displays the group header with notifications in the group section', () => {
    const wrapper = mount(
    <GroupHeader
      notifications={notifications}
    >{children}</GroupHeader>);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('notifications')).toBe(notifications);
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.find('h5').exists()).toBe(true);
    expect(wrapper.find('i').exists()).toBe(true);
    expect(wrapper.find('hr').exists()).toBe(true);
    expect(wrapper.find('div').length).toBe(8);
    expect(wrapper.find('hr').length).toBe(1);
    expect(wrapper.find('h5').length).toBe(2);
    expect(wrapper.find('i').length).toBe(2);
  });
  it('displays the group header without notifications', () => {
    const wrapper = mount(
    <GroupHeader
      notifications={noNotification}
    >{children}</GroupHeader>);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('notifications')).toBe(noNotification);
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.find('h5').exists()).toBe(true);
    expect(wrapper.find('i').exists()).toBe(true);
    expect(wrapper.find('hr').exists()).toBe(true);
    expect(wrapper.find('div').length).toBe(8);
    expect(wrapper.find('hr').length).toBe(1);
    expect(wrapper.find('h5').length).toBe(2);
    expect(wrapper.find('i').length).toBe(2);
  });
});
