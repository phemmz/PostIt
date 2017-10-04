import React from 'react';
import { mount } from 'enzyme';
import SignupForm from
  '../../../src/components/layout/signup/SignupForm';
import AuthenticationActions from
  '../../../src/actions/authActions';
import { initialSignupState } from '../../__mockData__/dummyData';

jest.mock('react-google-login');

const setup = () => {
  const props = {
    userSignupRequest: () => Promise.resolve(),
    isUserExists: () => Promise.resolve(),
    googleAuthentication: jest.fn(),
    onSubmit: jest.fn()
  };
  const enzymeWrapper = mount(
    <SignupForm {...props} />
  );
  return {
    props,
    enzymeWrapper
  };
};

describe('SignupForm Component', () => {
  const { props, enzymeWrapper } = setup();
  it('should render a form for signin up', () => {
    expect(enzymeWrapper).toMatchSnapshot();
    expect(enzymeWrapper.exists()).toBe(true);
    expect(enzymeWrapper.find('div').exists()).toBe(true);
    expect(enzymeWrapper.find('form').exists()).toBe(true);
    expect(enzymeWrapper.find('h4').exists()).toBe(true);
    expect(enzymeWrapper.find('TextFieldGroup')).toHaveLength(5);
  });
  it('should have an initial state', () => {
    expect(enzymeWrapper.state()).toEqual(initialSignupState);
  });
  it('should set state on change of input fields', () => {
    enzymeWrapper.find('#username').simulate('change', {
      target: { name: 'username', value: 'user1' }
    });
    expect(enzymeWrapper.state('username')).toBe('user1');
    enzymeWrapper.find('#email').simulate('change', {
      target: { name: 'email', value: 'user1@gmail.com' }
    });
    expect(enzymeWrapper.state('email')).toBe('user1@gmail.com');
    enzymeWrapper.find('#phoneNumber').simulate('change', {
      target: { name: 'phoneNumber', value: '0801234567' }
    });
    expect(enzymeWrapper.state('phoneNumber')).toBe('0801234567');
    enzymeWrapper.find('#password').simulate('change', {
      target: { name: 'password', value: '123456' }
    });
    expect(enzymeWrapper.state('password')).toBe('123456');
    enzymeWrapper.find('#passwordConfirmation').simulate('change', {
      target: { name: 'passwordConfirmation', value: '123456' }
    });
    expect(enzymeWrapper.state('passwordConfirmation')).toBe('123456');
  });
  it('should check if a user exist onBlur', () => {
    const event = { target: { name: 'username', value: 'user1' } };
    enzymeWrapper.find('#username').simulate('blur', event);
    expect(enzymeWrapper.state('invalid')).toBe(false);
  });
  it('should update the state when signup button is clicked', () => {
    const form = enzymeWrapper.find('form').first();
    form.simulate('submit', {
      preventDefault: () => {
      },
      target: [
        {
          name: 'username',
          value: 'user1',
        }
      ],
    });
    expect(enzymeWrapper.state('username')).toBe('user1');
  });
});