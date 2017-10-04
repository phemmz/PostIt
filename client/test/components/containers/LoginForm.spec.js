import React from 'react';
import { mount } from 'enzyme';
import { LoginForm } from
  '../../../src/components/layout/login/LoginForm';
import { initialLoginState } from '../../__mockData__/dummyData';

jest.mock('react-google-login');

const setup = () => {
  const props = {
    login: () => Promise.resolve(),
    googleAuthentication: jest.fn()
  };
  const enzymeWrapper = mount(
    <LoginForm {...props} />
  );
  return {
    props,
    enzymeWrapper
  };
};

describe('LoginForm Component', () => {
  const { props, enzymeWrapper } = setup();
  it('should always render a div', () => {
    expect(enzymeWrapper).toMatchSnapshot();
    expect(enzymeWrapper.exists()).toBe(true);
    expect(enzymeWrapper.find('div').exists()).toBe(true);
  });
  it("should contain everything else that gets rendered", () => {
    const divs = enzymeWrapper.find("div");
    const wrappingDiv = divs.first();
    expect(wrappingDiv.children()).toEqual(enzymeWrapper.children());
  });
  it('should have an initial state', () => {
    expect(enzymeWrapper.state()).toEqual(initialLoginState);
  });
  it('should set state on change of username and password input fields',
  () => {
    enzymeWrapper.find('#username').simulate('change', {
      target: { name: 'username', value: 'user1' }
    });
    expect(enzymeWrapper.state('username')).toBe('user1');
    enzymeWrapper.find('#password').simulate('change', {
      target: { name: 'password', value: '123456' }
    });
    expect(enzymeWrapper.state('password')).toBe('123456');
  });
  it('should update the state when login button is clicked', () => {
    const form = enzymeWrapper.find('form').first();
    form.simulate('submit', {
      preventDefault: () => {
      },
      target: [
        {
          name: 'username',
          value: 'user1',
        },
        {
          name: 'password',
          value: '123456',
        }
      ],
    });
    expect(enzymeWrapper.state('username')).toBe('user1');
  });
  it("should only take two props", () => {
    expect(Object.keys(enzymeWrapper.props()).length).toBe(2);
  });
});