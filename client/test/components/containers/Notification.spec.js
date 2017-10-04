import React from "react";
import { mount } from "enzyme";
import sinon from 'sinon';
import { Notification } from
'../../../src/components/layout/Notification';
import { notifications } from '../../__mockData__/dummyProps';

describe("Notification", () => {
  let props;
  let mountedNotification;
  const notification = () => {
    if (!mountedNotification) {
      mountedNotification = mount(
        <Notification {...props} />
      );
    }
    return mountedNotification;
  }

  beforeEach(() => {
    props = {
      clearNotification: jest.fn(),
      notifications
    };
    global.Materialize = { toast: () => {} };
    mountedNotification = undefined;
  });
  
  it("should always render a div", () => {
    const divs = notification().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });
  it("should contain everything else that gets rendered", () => {
    const divs = notification().find("div");
    const wrappingDiv = divs.first();
    expect(wrappingDiv.children()).toEqual(notification().children());
  });
  it("should only take two props", () => {
    expect(Object.keys(notification().props()).length).toBe(2);
  });
  it('should call clearNotification when clear notification button is clicked',
  () => {
    notification().find('.mark-btn').simulate('click');
    expect(props.clearNotification.mock.calls.length).toBe(1);
  });
});