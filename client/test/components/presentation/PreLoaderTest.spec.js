import React from 'react';
import { shallow } from 'enzyme';
import PreLoader from '../../../src/components/presentation/PreLoader';

describe('PreLoader Component', () => {
  it('should render a materialize preloader', () => {
    const wrapper = shallow(<PreLoader />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.find('div').length).toBe(10);
  });
});
