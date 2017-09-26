import React from "react";
import { mount } from "enzyme";
import NotFoundPage from '../../../src/components/presentation/NotFoundPage';

describe("NotFoundPage Component", () => {
  let mountedNotFoundPage;

  const notFoundPage = () => {
    if (!mountedNotFoundPage) {
      mountedNotFoundPage = mount(
        <NotFoundPage />
      );
    }
    return mountedNotFoundPage;
  }

  beforeEach(() => {
    mountedNotFoundPage: undefined;
  });

  it("should always render a div", () => {
    const divs = notFoundPage().find("div");
    expect(notFoundPage()).toMatchSnapshot();
    expect(divs.length).toBeGreaterThan(0);
  });

  it("should contain everything else that gets rendered", () => {
    const divs = notFoundPage().find("div");
    const wrappingDiv = divs.first();
    expect(wrappingDiv.children()).toEqual(notFoundPage().children());
  });
});

