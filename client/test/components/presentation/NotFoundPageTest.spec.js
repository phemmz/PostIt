import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../../../src/components/presentation/NotFoundPage';

describe('NotFoundPage Component', () => {
  it('should render a notfoundpage component', () => {
    const wrapper = shallow(<NotFoundPage />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.find('h4').exists()).toBe(true);
    expect(wrapper.find('i').exists()).toBe(true);
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('h4').length).toBe(2);
    expect(wrapper.find('i').length).toBe(1);
  });
});
