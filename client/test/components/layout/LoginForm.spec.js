import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import LoginForm from
  '../../../src/components/layout/login/LoginForm';

jest.mock('react-google-login');
const store = configureMockStore()({});

const setup = () => {
  const props = {
    login: jest.fn(),
    googleAuthentication: jest.fn()
  };
  const enzymeWrapper = mount(
    <Provider store={store}>
      <LoginForm {...props} />
    </Provider>
  );
  return {
    props,
    enzymeWrapper
  };
};

describe('LoginForm Component', () => {
  const { props, enzymeWrapper } = setup();
  it('should render a form for login in', () => {
    expect(enzymeWrapper).toMatchSnapshot();
    expect(enzymeWrapper.exists()).toBe(true);
    expect(enzymeWrapper.find('div').exists()).toBe(true);
    expect(enzymeWrapper.find('form').exists()).toBe(true);
    expect(enzymeWrapper.find('h4').exists()).toBe(true);
    expect(enzymeWrapper.find('TextFieldGroup')).toHaveLength(2);
  });
  it("should only take two props", () => {
    expect(Object.keys(enzymeWrapper.props()).length).toBe(2);
  });
});