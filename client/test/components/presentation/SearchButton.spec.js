import React from "react";
import { mount } from "enzyme";
import SearchButton from '../../../src/components/presentation/SearchButton';

describe("SearchButton Component", () => {
  let mountedSearchButton;

  const searchButton = () => {
    if (!mountedSearchButton) {
      mountedSearchButton = mount(
        <SearchButton />
      );
    }
    return mountedSearchButton;
  }

  beforeEach(() => {
    searchButton: undefined;
  });

  it("should always render a div", () => {
    const divs = searchButton().find("div");
    expect(searchButton()).toMatchSnapshot();
    expect(divs.length).toBeGreaterThan(0);
  });

  describe("the rendered div", () => {
    it("should contain everything else that gets rendered", () => {
      const divs = searchButton().find("div");
      const wrappingDiv = divs.first();
      expect(wrappingDiv.children()).toEqual(searchButton().children());
    });
  });
});
