import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * LoggedIn function
 * @param {*} ComposedComponent
 * @return {*} void
 */
export default function (ComposedComponent) {
  /**
   * Authenticate
   */
  class LoggedIn extends Component {
    /**
     * componentWillMount
     * @return {*} void
     */
    componentWillMount() {
      if (this.props.isAuthenticated) {
        this.context.router.push('/dashboard');
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

  LoggedIn.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  LoggedIn.contextTypes = {
    router: PropTypes.object.isRequired
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

  return connect(mapStateToProps)(LoggedIn);
}
