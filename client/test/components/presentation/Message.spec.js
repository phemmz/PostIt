import React from "react";
import { mount } from "enzyme";
import Message from '../../../src/components/presentation/Message';

describe("Message Component", () => {
  let props;
  let mountedMessage;
  const currentMessage = {
    messagecreator: 'phemmz',
    priority: 'Normal',
    createdAt: '2017-09-06T14:53:09.414Z',
    content: 'nah'
  };
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
      readList: 'phemmz'
    };
    mountedMessage = undefined;
  });

  it("always renders a div", () => {
    const divs = message().find("div");
    expect(message()).toMatchSnapshot();
    expect(divs.length).toBeGreaterThan(0);
  });

  describe("the rendered div", () => {
    it("contains everything else that gets rendered", () => {
      const divs = message().find("div");
      const wrappingDiv = divs.first();
      expect(wrappingDiv.children()).toEqual(message().children());
    });
  });

  describe("rendered Message", () => {
    it("receives props", () => {
      expect(Object.keys(message().props()).length).toBe(2);
    });
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
