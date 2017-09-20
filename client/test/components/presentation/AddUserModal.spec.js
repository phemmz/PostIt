import React from 'react';
import { mount } from 'enzyme';
import AddUserModal from '../../../src/components/presentation/AddUserModal';

const setup = () => {
  const props = {
    onClick: jest.fn(),
    updateUser: jest.fn()
  };
  const enzymeWrapper = mount(<SignUp {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

describe('AddUserModal Component', () => {
  let value = 'phemmz';
  const updateUser = () => {
    value = 'new phemmz';
  };
  const appUsers = ['phemmz', 'nawtuaw'];
  const addUser = () => {
    appUsers.push('Nanda');
  };
  const onClick = jest.fn();
  it('always renders a div', () => {
    const wrapper = mount(
      <AddUserModal
        value={value}
        onChange={updateUser}
        appUsers={appUsers}
        onClick={onClick}
      />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div').exists()).toBe(true);
  });
  
  it('should call onClick function when the Add User link is clicked',
  () => {
    const wrapper = mount(
      <AddUserModal
        value={value}
        onChange={updateUser}
        appUsers={appUsers}
        onClick={onClick}
      />);
    wrapper.find('.add-btn').simulate('click');
    expect(onClick.mock.calls.length).toBe(1);
  });
});
