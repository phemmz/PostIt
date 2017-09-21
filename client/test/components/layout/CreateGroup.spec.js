import React from "react";
import { mount } from "enzyme";
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import CreateGroup from
  '../../../src/components/containers/CreateGroup';

const store = configureMockStore()({});

describe("CreateGroup", () => {
  let props;
  let mountedCreateGroup;
  const createGroup = () => {
    if (!mountedCreateGroup) {
      mountedCreateGroup = mount(
        <Provider store={store}>
          <CreateGroup {...props} />
        </Provider>
      );
    }
    return mountedCreateGroup;
  }

  beforeEach(() => {
    props = {
      groupCreate: jest.fn()
    };
    mountedCreateGroup = undefined;
  });
  
  it("should always render a div", () => {
    const divs = createGroup().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });
  it("should contain everything else that gets rendered", () => {
    const divs = createGroup().find("div");
    const wrappingDiv = divs.first();
    expect(wrappingDiv.children()).toEqual(createGroup().children());
  });
  it("should render a form for creating group", () => {
    expect(createGroup().find("form").length).toBe(1);
  });
  it("should only take two props", () => {
    expect(Object.keys(createGroup().props()).length).toBe(2);
  });
  it("should always render a creatgroup button", () => {
    expect(createGroup().find("button").length).toBe(1);
  });
});