import React from 'react';
import PropTypes from 'prop-types';
import NavigationBarTop from '../layout/NavigationBar.jsx';

/**
 * @description Main component
 * @return {*} element
 */
const Main = ({ children }) => {
  return (
    <div className="landing-background">
      <NavigationBarTop />
      <div className="container-fluid">
        {children}
      </div>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired
};

export default Main;
