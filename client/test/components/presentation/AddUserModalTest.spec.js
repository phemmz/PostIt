import React from 'react';
import { mount } from 'enzyme';
import AddUserModal from '../../../src/components/presentation/AddUserModal';

describe('AddUserModal Component', () => {
  let value = 'phemmz';
  const updateUser = () => {
    value = 'new phemmz';
  };
  const appUsers = ['phemmz', 'nawtuaw'];
  const addUser = () => {
    appUsers.push('Nanda');
  };
  it('displays modal for adding user to a group', () => {
    const wrapper = mount(
      <AddUserModal
        value={value}
        onChange={updateUser}
        appUsers={appUsers}
        onClick={addUser}
      />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('value')).toBe(value);
    expect(wrapper.prop('appUsers')).toBe(appUsers);
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.find('h4').exists()).toBe(true);
    expect(wrapper.find('a').exists()).toBe(true);
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('a').length).toBe(2);
  });
});
