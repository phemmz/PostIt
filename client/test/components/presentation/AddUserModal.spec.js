import React from 'react';
import { mount } from 'enzyme';
import AddUserModal from '../../../src/components/presentation/AddUserModal';
import { suggestions,
   updateUser, groupDetails } from '../../__mockData__/dummyProps';

describe('AddUserModal Component', () => {
  let users = ['phemmz'];
  const onClick = jest.fn();
  const onChipsChange = jest.fn();
  const addUserSuccess = false;
  const addUserFail = false;
  const wrapper = mount(
    <AddUserModal
      users={users}
      onChange={updateUser}
      suggestions={suggestions}
      onClick={onClick}
      onChipsChange={onChipsChange}
      addUserSuccess={addUserSuccess}
      addUserFail={addUserFail}
    />);
  it('should always render a div', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div').exists()).toBe(true);
  });
  
  it('should call onClick function when the Add User link is clicked',
  () => {
    wrapper.find('.add-btn').simulate('click');
    expect(onClick.mock.calls.length).toBe(1);
  });

  it('should receive props', () => {
    expect(Object.keys(wrapper.props()).length).toBe(9);
  });
});
