import React, { Component } from 'react';
import { Link } from 'react-router';
/**
 * Group class which extends React.Component
 */
class Group extends Component {
  /**
   * clickHandler() gets called when the groupname anchor tag is clicked on
   */
	clickHandler(event) {
    event.preventDefault();
    this.props.groupClickHandler(event.target.id);
	}

	render() {
		const title = (this.props.isSelected)
       ?  (
            <a style={{color: 'red'}}
              id={ this.props.groupId }
              onClick={ this.clickHandler.bind(this) }
            >
              {this.props.groupPropsObj.groupname}
            </a>
          ) :
          (
            <a onClick={ this.clickHandler.bind(this) }
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