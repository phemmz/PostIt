import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        Materialize.toast('You need to login to access this page', 4000, 'red')
        this.context.router.push('/login');
      }
    }
    /**
     * componentWillUpdate
     * @param {*} nextProps
     * @return {*} void
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/');
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
    isAuthenticated: React.PropTypes.bool.isRequired,
  };

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
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
