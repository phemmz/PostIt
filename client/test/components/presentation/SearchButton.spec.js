import React from 'react';
import { shallow } from 'enzyme';
import SearchButton from '../../../src/components/presentation/SearchButton';

describe('SearchButton Component', () => {
  it('should render a Link button for searching users', () => {
    const wrapper = shallow(<SearchButton />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.find('Link').exists()).toBe(true);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('Link').length).toBe(1);
  });
});
