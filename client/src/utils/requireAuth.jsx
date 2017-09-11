import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

/**
 * requireAuth function
 * @param {*} ComposedComponent
 * @return {*} void
 */
export default function (ComposedComponent) {
  /**
   * Authenticate
   */
  class Authenticate extends Component {
    /**
     * componentWillMount
     * @return {*} void
     */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        Materialize.toast('You need to login to access this page', 4000, 'red');
        browserHistory.push('/login');
      }
    }
    /**
     * componentWillUpdate
     * @param {*} nextProps
     * @return {*} void
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        browserHistory.push('/');
      }
    }
    /**
     * render
     * @return {*} void
     */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  /**
   * mapStateToProps(state)
   * @param {*} state
   * @return {*} void
   */
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }

  return connect(mapStateToProps)(Authenticate);
}
