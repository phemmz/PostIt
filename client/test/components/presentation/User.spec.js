import React from "react";
import { mount } from "enzyme";
import User from '../../../src/components/presentation/User';
import { user } from '../../__mockData__/dummyData';

describe("User Component", () => {
  let props;
  let mountedUser;

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
      user: user[1]
    };
  });

  it("should always render div", () => {
    const divs = userComponent().find("div");
    expect(userComponent()).toMatchSnapshot();
    expect(divs.length).toBeGreaterThan(0);
  });

  it("should contain everything else that gets rendered", () => {
    const divs = userComponent().find("div");
    const wrappingDiv = divs.first();
    expect(wrappingDiv.children()).toEqual(userComponent().children());
  });

  it("should receive props", () => {
    expect(Object.keys(userComponent().props()).length).toBe(1);
  });

  describe("when user prop is defined", () => {
    it("should display the username", () => {
      expect(userComponent().find('.username').text()).toBe("Username: boy1");
    });
    it("should display the email", () => {
      expect(userComponent().find('.email').text()).toBe("Email: boy1@gmail.com");
    });
    it("should display the phonenumber", () => {
      expect(userComponent().find('.phoneNumber').text()).toBe("Phone Number: 99999999");
    });
  });
});
