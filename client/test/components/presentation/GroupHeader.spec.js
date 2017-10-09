import React from "react";
import { mount } from "enzyme";
import GroupHeader from '../../../src/components/presentation/GroupHeader';
import { notifications } from '../../__mockData__/dummyProps';

describe("GroupHeader Component", () => {
  let props;
  let mountedGroupHeader;
  const groupHeader = () => {
    if (!mountedGroupHeader) {
      mountedGroupHeader = mount(
        <GroupHeader {...props} />
      );
    }
    return mountedGroupHeader;
  }

  beforeEach(() => {
    props = {
      notifications,
      children: <div />
    };
    mountedGroupHeader = undefined;
  });

  it("should alway render a div", () => {
    const divs = groupHeader().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("should contain everything else that gets rendered", () => {
    const divs = groupHeader().find("div");
    const wrappingDiv = divs.first();
    expect(wrappingDiv.children()).toEqual(groupHeader().children());
  });

  it("should receive props", () => {
    expect(Object.keys(groupHeader().props()).length).toBe(2);
  });

  describe("when notifications is defined", () => {
    beforeEach(() => {
      props.notifications = ["New message from neene"];
    });

    it("checks the class of the rendered notification icon", () => {
      expect(groupHeader().find('.on-notification').exists()).toBe(true);
    });
  });

  describe("when notifications is not defined", () => {
    beforeEach(() => {
      props.notifications = "";
    });

    it("checks the class of the rendered notification icon", () => {
      expect(groupHeader().find('.mybell').exists()).toBe(true);
    });
  });
});
