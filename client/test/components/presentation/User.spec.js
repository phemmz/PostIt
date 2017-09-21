import React from "react";
import { mount } from "enzyme";
import User from '../../../src/components/presentation/User';

describe("User Component", () => {
  let props;
  let mountedUser;
  const user = {
    username: 'user1',
    email: 'user1@gmail.com',
    phoneNumber: '08055123456'
  };

  const userComponent = () => {
    if (!mountedUser) {
      mountedUser = mount(
        <User {...props} />
      );
    }
    return mountedUser;
  }

  beforeEach(() => {
    props = {
      user
    };
  });

  it("should always render div", () => {
    const divs = userComponent().find("div");
    expect(userComponent()).toMatchSnapshot();
    expect(divs.length).toBeGreaterThan(0);
  });

  describe("the rendered div", () => {
    it("should contain everything else that gets rendered", () => {
      const divs = userComponent().find("div");
      const wrappingDiv = divs.first();
      expect(wrappingDiv.children()).toEqual(userComponent().children());
    });
  });

  describe("rendered user", () => {
    it("should receive props", () => {
      expect(Object.keys(userComponent().props()).length).toBe(1);
    });
  });

  describe("when user prop is defined", () => {
    it("should display the username", () => {
      expect(userComponent().find('.username').text()).toBe("Username: user1");
    });
    it("should display the email", () => {
      expect(userComponent().find('.email').text()).toBe("Email: user1@gmail.com");
    });
    it("should display the phonenumber", () => {
      expect(userComponent().find('.phoneNumber').text()).toBe("Phone Number: 08055123456");
    });
  });
});
