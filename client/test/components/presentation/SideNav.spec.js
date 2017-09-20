import React from "react";
import { mount } from "enzyme";
import SideNav from '../../../src/components/presentation/SideNav';

describe("SideNav Component", () => {
  let props;
  let mountedSideNav;
  const currentUser = {
    username: 'user1',
    email: 'user1@gmail.com'
  };

  const sideNav = () => {
    if (!mountedSideNav) {
      mountedSideNav = mount(
        <SideNav {...props} />
      );
    }
    return mountedSideNav;
  }

  beforeEach(() => {
    props = {
      currentUser
    };
    mountedSideNav = undefined;
  });

  it("should always render ul", () => {
    const divs = sideNav().find("ul");
    expect(sideNav()).toMatchSnapshot();
    expect(divs.length).toBeGreaterThan(0);
  });

  describe("the rendered div", () => {
    it("should contain everything else that gets rendered", () => {
      const divs = sideNav().find("ul");
      const wrappingDiv = divs.first();
      expect(wrappingDiv.children()).toEqual(sideNav().children());
    });
  });

  describe("rendered SideNav", () => {
    it("should receive props", () => {
      expect(Object.keys(sideNav().props()).length).toBe(1);
    });
  });

  describe("when currentUser prop is defined", () => {
    it("should display the username", () => {
      expect(sideNav().find('.current-username').text()).toBe("user1");
    });
    it("should display the email", () => {
      expect(sideNav().find('.current-email').text()).toBe("user1@gmail.com");
    });
  });
});
