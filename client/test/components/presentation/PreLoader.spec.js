import React from "react";
import { mount } from "enzyme";
import PreLoader from '../../../src/components/presentation/PreLoader';

describe("PreLoader Component", () => {
  let mountedPreLoader;

  const preLoader = () => {
    if (!mountedPreLoader) {
      mountedPreLoader = mount(
        <PreLoader />
      );
    }
    return mountedPreLoader;
  }

  beforeEach(() => {
    preLoader: undefined;
  });

  it("should always render a div", () => {
    const divs = preLoader().find("div");
    expect(preLoader()).toMatchSnapshot();
    expect(divs.length).toBeGreaterThan(0);
  });

  describe("the rendered div", () => {
    it("should contain everything else that gets rendered", () => {
      const divs = preLoader().find("div");
      const wrappingDiv = divs.first();
      expect(wrappingDiv.children()).toEqual(preLoader().children());
    });
  });
});
