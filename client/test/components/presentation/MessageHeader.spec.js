import React from "react";
import { mount } from "enzyme";
import MessageHeader from '../../../src/components/presentation/MessageHeader';

describe("MessageHeader Component", () => {
  let props;
  let mountedMessageHeader;

  const messageHeader = () => {
    if (!mountedMessageHeader) {
      mountedMessageHeader = mount(
        <MessageHeader {...props} />
      );
    }
    return mountedMessageHeader;
  }

  beforeEach(() => {
    props = {
      groupName: 'random'
    };
    mountedMessageHeader = undefined;
  });

  it("should always render a div", () => {
    const divs = messageHeader().find("div");
    expect(messageHeader()).toMatchSnapshot();
    expect(divs.length).toBeGreaterThan(0);
  });

  describe("the rendered div", () => {
    it("should contain everything else that gets rendered", () => {
      const divs = messageHeader().find("div");
      const wrappingDiv = divs.first();
      expect(wrappingDiv.children()).toEqual(messageHeader().children());
    });
  });

  describe("rendered MessageHeader", () => {
    it("should receive props", () => {
      expect(Object.keys(messageHeader().props()).length).toBe(1);
    });
  });

  describe("when groupname prop is defined", () => {
    it("should display the groupname", () => {
      expect(messageHeader().find('span').text()).toBe("random");
    });
  });
});

