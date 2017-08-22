import React, { Component } from 'react';
import { Link } from 'react-router';
/**
 * Group class which extends React.Component
 */
class Group extends Component {
  /**
   * clickHandler() gets called when the groupname is clicked on
   */
	clickHandler(event) {
    event.preventDefault();
    /**
     * Calls the groupClickHandler props and pass the groupId along
     */
    this.props.groupClickHandler(event.target.id);
	}

	render() {
    /**
     * Checks if the group is selected or not
     * and changes its color accordingly
     */
		const title = (this.props.isSelected)
       ?  (
            <a href="" style={{color: 'red'}}
              id={ this.props.groupId }
              onClick={ this.clickHandler.bind(this) }
            >
              {this.props.groupPropsObj.groupname}
            </a>
          ) :
          (
            <a href="" onClick={ this.clickHandler.bind(this) }
               id = { this.props.groupId }
            >
               {this.props.groupPropsObj.groupname}
            </a>
          );
		return(
			<div>	
				<p>
          <span className="z-depth-1">{ title }</span>
        </p>			
			</div>
		)	
	}
}
export default Group;