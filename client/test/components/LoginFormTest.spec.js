import React from 'react';
import { mount, shallow } from 'enzyme';
import LoginForm from '../../src/components/layout/login/LoginForm';
import Message from '../../src/components/presentation/Message';

describe('LoginForm', () => {
  it('renders form and h1', () => {
    const wrapper = shallow(<h1>Hello</h1>);
    expect(wrapper).toMatchSnapshot();
    // const wrapper = setup();
    // expect(wrapper.find('form')).toExist;
    // expect(wrapper.find('Row')).toExist;
    // expect(wrapper.find('h1').text()).toEqual('Login');
    // expect(wrapper.find('div')).toExist;
  });
  it('should render Message', () => {
    const message = {
      content: 'hello man',
      createdAt: '2017-08-03T12:33:32.666Z',
      groupId: 1,
      id: 1,
      messagecreator: 'phemmz',
      priority: 1,
      readcheck: null,
      updatedAt: '2017-08-03T12:33:32.666Z',
      userId: 1,
    }
    const wrapper = shallow(
      <Message currentMessage={message} />
    );
    expect(wrapper.find('strong')).toExist;
  });
});
