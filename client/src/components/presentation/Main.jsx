import React from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../layout/NavigationBar.jsx';

/**
 * Main
 * @return {*} element
 */
const Main = ({ children }) => {
  return (
    <div className="landing-background">
      <NavigationBar />
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
