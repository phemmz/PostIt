import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import MessageActions from '../../actions/messageActions';
import TextFieldGroup from '../common/TextFieldGroup.jsx';
import User from '../presentation/User.jsx';

/**
 * @class SearchPage
 */
class SearchPage extends Component {
  /**
   * constructor
   * @param {*} props
   * @return {*} void
   */
  constructor(props) {
    super(props);
    this.state = {
      searchKey: '',
      offset: 0,
      perPage: 5,
      data: [],
      pageCount: 0
    };
    this.searchHandler = this.searchHandler.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  /**
   * searchHandler
   * @param {*} event
   * @return {*} void
   */
  searchHandler(event) {
    event.preventDefault();
    if (event.target.value !== '') {
      this.setState({
        [event.target.name]: event.target.value
      }, () => {
        this.props.searchUser(this.state.searchKey, this.state.offset, this.state.perPage)
        .then((data) => {
          this.setState({
            data: data.comments,
            pageCount: Math.ceil(data.meta.total_count / data.meta.limit)
          });
        });
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  }
  /**
   * handlePageClick
   * @param {*} data
   * @return {*} void
   */
  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * 5);
    this.props.searchUser(this.state.searchKey, offset, this.state.perPage)
    .then((response) => {
      this.setState({
        data: response.comments,
        pageCount: Math.ceil(response.meta.total_count / response.meta.limit)
      });
    });
  }
    /**
   *
   * @returns {component} - renders a React component
   */
  render() {
    const searched = this.props.searchedUsers.map((user) => {
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
              <h5 className="green-text text-darken-4">Search For Users</h5>
              <TextFieldGroup
                id="search"
                field="searchKey"
                value={this.state.searchKey}
                htmlFor="search"
                label="Search For Users"
                onChange={this.searchHandler}
              />
            </div>
            {
              (this.props.searchedUsers) ?
              (searched) :
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
                onPageChange={this.handlePageClick}
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

SearchPage.propTypes = {
  searchUser: PropTypes.func.isRequired,
  searchedUsers: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string
  })),
};

SearchPage.defaultProps = {
  searchedUsers: []
};

const stateToProps = (state) => {
  return {
    notifications: state.messageReducer.notifications,
    searchedUsers: state.messageReducer.searchedUsers
  };
};

const dispatchToProps = (dispatch) => {
  return {
    searchUser: (searchKey, offset, perPage) => {
      return dispatch(MessageActions.searchUser(searchKey, offset, perPage));
    }
  };
};

export default connect(stateToProps, dispatchToProps)(SearchPage);
