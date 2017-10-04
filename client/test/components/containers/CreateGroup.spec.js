import React from "react";
import { mount } from "enzyme";
import sinon from 'sinon';
import { CreateGroup } from
  '../../../src/components/containers/CreateGroup';
import { initialCreateGroupState } from '../../__mockData__/dummyData';

describe("CreateGroup", () => {
  Object.defineProperty(window.location, 'href', {
    writable: true,
    value: '/dashboard'
  });
  let props;
  let mountedCreateGroup;
  const createGroup = () => {
    if (!mountedCreateGroup) {
      mountedCreateGroup = mount(
        <CreateGroup {...props} />
      );
    }
    return mountedCreateGroup;
  }

  beforeEach(() => {
    props = {
      groupCreate: () => Promise.resolve(),
      submitHandler: jest.fn()
    };
    mountedCreateGroup = undefined;
    global.Materialize = { toast: () => {} };
  });
  
  it("should always render a div", () => {
    const divs = createGroup().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });
  it("should contain everything else that gets rendered", () => {
    const divs = createGroup().find("div");
    const wrappingDiv = divs.first();
    expect(wrappingDiv.children()).toEqual(createGroup().children());
  });
  it("should render a form for creating group", () => {
    expect(createGroup().find("form").length).toBe(1);
  });
  it('should have an initial state', () => {
    expect(createGroup().state()).toEqual(initialCreateGroupState);
  });
  it('should set state on change of create group input field',
  () => {
    createGroup().find('#groupname').simulate('change', {
      target: { name: 'groupname', value: 'Random1' }
    });
    expect(createGroup().state('groupname')).toBe('Random1');
  });
  it("should only take two props", () => {
    expect(Object.keys(createGroup().props()).length).toBe(2);
  });
  it("should always render a creategroup button", () => {
    expect(createGroup().find("button").length).toBe(1);
  });
  it('should call submitHandler when create group button is clicked', () => {
    sinon.spy(CreateGroup.prototype, 'submitHandler');
    const form = createGroup().find('form').first();
    form.simulate('submit', {
      preventDefault: () => {
      },
      target: [
        {
          name: 'groupname',
          value: 'Random1',
        }
      ],
    });
    expect(CreateGroup.prototype.submitHandler.calledOnce).toBe(true);
  });
});