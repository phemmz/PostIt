import React from "react";
import { mount } from "enzyme";
import Message from '../../../src/components/presentation/Message';
import { currentMessage, readList } from '../../__mockData__/dummyProps';

describe("Message Component", () => {
  let props;
  let mountedMessage;
  const message = () => {
    if (!mountedMessage) {
      mountedMessage = mount(
        <Message {...props} />
      );
    }
    return mountedMessage;
  }

  beforeEach(() => {
    props = {
      currentMessage,
      readList
    };
    mountedMessage = undefined;
  });

  it("should always render a div", () => {
    const divs = message().find("div");
    expect(message()).toMatchSnapshot();
    expect(divs.length).toBeGreaterThan(0);
  });

  it("should contain everything else that gets rendered", () => {
    const divs = message().find("div");
    const wrappingDiv = divs.first();
    expect(wrappingDiv.children()).toEqual(message().children());
  });

  it("should receive props", () => {
    expect(Object.keys(message().props()).length).toBe(2);
  });

  describe("when currentMessage is defined", () => {
    it("should display message creator", () => {
      expect(message().find('.msg-creator').text()).toBe("phemmz");
    });
    it("should display content of message", () => {
      expect(message().find('.msg-content').text()).toBe("nah");
    });
  });
});
