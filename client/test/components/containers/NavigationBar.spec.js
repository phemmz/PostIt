import React from "react";
import { mount } from "enzyme";
import { NavigationBar } from
'../../../src/components/layout/NavigationBar';
import { auth } from '../../__mockData__/dummyProps';

describe("NavigationBar", () => {
  let props;
  let mountedNavigationBar;
  const navigationBar = () => {
    if (!mountedNavigationBar) {
      mountedNavigationBar = mount(
        <NavigationBar {...props} />
      );
    }
    return mountedNavigationBar;
  }

  beforeEach(() => {
    props = {
      logout: jest.fn(),
      auth
    };
    mountedNavigationBar = undefined;
  });
  
  it("should always render a div", () => {
    const divs = navigationBar().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });
  it("should contain everything else that gets rendered", () => {
    const divs = navigationBar().find("div");
    const wrappingDiv = divs.first();
    expect(wrappingDiv.children()).toEqual(navigationBar().children());
  });
  it("should only take two props", () => {
    expect(Object.keys(navigationBar().props()).length).toBe(2);
  });
  it('should call logout when logout button is clicked', () => {
    navigationBar().find('.test-logout').simulate('click');
    expect(props.logout.mock.calls.length).toBe(1);
  });
});