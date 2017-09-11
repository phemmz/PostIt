import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * Group class which extends React.Component
 */
class Group extends Component {
  /**
   * constructor
   * @return {*} void
   */
  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this);
  }
  /**
   * clickHandler() gets called when the groupname is clicked on
   * @param {*} event
   * @return {*} void
   */
  clickHandler(event) {
    event.preventDefault();
    /**
     * Calls the groupClickHandler props and pass the groupId along
     */
    this.props.groupClickHandler(event.target.id);
  }
  /**
   * render
   * @return {*} void
   */
  render() {
    /**
     * Checks if the group is selected or not
     * and changes its color accordingly
     */
    const title = (this.props.isSelected)
       ? (
         <i className="fa fa-hashtag" aria-hidden="true">
           <a
             href=""
             className="groupname-anchor"
             style={{ color: 'red' }}
             id={this.props.groupId}
             onClick={this.clickHandler}
           >
             {this.props.groupPropsObj.groupname}
           </a>
         </i>
          ) :
          (
            <i className="fa fa-hashtag" aria-hidden="true">
              <a
                href=""
                className="groupname-anchor"
                style={{ color: 'black' }}
                onClick={this.clickHandler}
                id={this.props.groupId}
              >
                {this.props.groupPropsObj.groupname}
              </a>
            </i>
          );
    return (
      <div>
        <p>
          <span>{ title }</span>
        </p>
      </div>
    );
  }
}

Group.propTypes = {
  groupClickHandler: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  groupId: PropTypes.number,
  groupPropsObj: PropTypes.shape({
    id: PropTypes.number,
    groupname: PropTypes.string
  }).isRequired
};

Group.defaultProps = {
  groupId: null
};

export default Group;
