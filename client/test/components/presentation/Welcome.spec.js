import React from "react";
import { mount } from "enzyme";
import Welcome from '../../../src/components/presentation/Welcome';

describe("Welcome Component", () => {
  let mountedWelcome;

  const welcome = () => {
    if (!mountedWelcome) {
      mountedWelcome = mount(
        <Welcome />
      );
    }
    return mountedWelcome;
  }

  beforeEach(() => {
    mountedWelcome: undefined;
  });

  it("should always render a div", () => {
    const divs = welcome().find("div");
    expect(welcome()).toMatchSnapshot();
    expect(divs.length).toBeGreaterThan(0);
  });

  describe("the rendered div", () => {
    it("should contain everything else that gets rendered", () => {
      const divs = welcome().find("div");
      const wrappingDiv = divs.first();
      expect(wrappingDiv.children()).toEqual(welcome().children());
    });
  });
});
