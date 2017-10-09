import React from "react";
import { mount } from "enzyme";
import SideNav from '../../../src/components/presentation/SideNav';
import { user } from '../../__mockData__/dummyData';

describe("SideNav Component", () => {
  let props;
  let mountedSideNav;
  const currentUser = user[0];

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

  it("should contain everything else that gets rendered in the ul", () => {
    const divs = sideNav().find("ul");
    const wrappingDiv = divs.first();
    expect(wrappingDiv.children()).toEqual(sideNav().children());
  });

  it("should receive a prop", () => {
    expect(Object.keys(sideNav().props()).length).toBe(1);
  });

  describe("when currentUser prop is defined", () => {
    it("should display the username", () => {
      expect(sideNav().find('.current-username').text()).toBe("femz");
    });
    it("should display the email", () => {
      expect(sideNav().find('.current-email').text()).toBe("femz@gmail.com");
    });
  });
});
