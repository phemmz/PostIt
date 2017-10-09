import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import User from '../presentation/User.jsx';
import GroupActions from '../../actions/groupActions';

/**
 * @class SearchPage
 */
class GroupMembersPage extends Component {
  /**
   * constructor
   * @param {*} props
   * @return {*} void
   */
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      perPage: 5,
      data: [],
      pageCount: 0
    };
    this.paginationHandler = this.paginationHandler.bind(this);
  }
  /**
   * componentWillMount
   * @return {*} void
   */
  componentWillMount() {
    (this.props.selectedGroup) ?
    (
      this.props.getGroupMembers(
        this.props.selectedGroup, this.state.offset, this.state.perPage)
      .then((data) => {
        this.setState({
          data: data.paginatedMembers,
          pageCount: Math.ceil(data.metaData.total_count / data.metaData.limit)
        });
      })
    ) :
    (
      browserHistory.push('/dashboard')
    );
  }
  /**
   * @description paginationHandler
   * @param {*} pageDetails
   * @return {*} void
   */
  paginationHandler(pageDetails) {
    const selected = pageDetails.selected;
    const offset = Math.ceil(selected * 5);
    this.props.getGroupMembers(
      this.props.selectedGroup, offset, this.state.perPage)
    .then((response) => {
      this.setState({
        data: response.paginatedMembers,
        pageCount: Math.ceil(
          response.metaData.total_count / response.metaData.limit)
      });
    });
  }
  /**
   * @returns {component} - renders a React component
   */
  render() {
    const members = this.props.groupMembers.map((user) => {
      return (
        <User
          key={user.id}
          user={user}
        />
      );
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6 offset-m3 card custom">
            <div className="row">
              <h5 className="green-text text-darken-4">Group Members</h5>
            </div>
            <hr />
            {
              (this.props.groupMembers) ?
              (members) :
              (<div />)
            }
            <div className="center">
              <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={<a href="">...</a>}
                breakClassName={'break-me'}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.paginationHandler}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
            </div>
            <div className="row group-form">
              <div className="center">
                <Link
                  to="/dashboard"
                  className="waves-effect waves-light btn center"
                >Go Back To Dashboard</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GroupMembersPage.propTypes = {
  selectedGroup: PropTypes.string,
  getGroupMembers: PropTypes.func.isRequired,
  groupMembers: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string
  })).isRequired
};

GroupMembersPage.defaultProps = {
  selectedGroup: ''
};

const stateToProps = (state) => {
  return {
    groupMembers: state.groupReducer.groupMembers,
    selectedGroup: state.groupReducer.selectedGroup
  };
};

const dispatchToProps = (dispatch) => {
  return {
    getGroupMembers: (groupId, offset, perPage) => {
      return dispatch(GroupActions.getGroupMembers(groupId, offset, perPage));
    }
  };
};

export default connect(stateToProps, dispatchToProps)(GroupMembersPage);
