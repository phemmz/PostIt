import React, { Component } from 'react';
import { Link } from 'react-router';

class Group extends Component {
	clickHandler(event) {
    event.preventDefault(); 
		console.log('onselectitle: ' + this.props.index);
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
				<h3>
          <span className="z-depth-1">{ title }</span>
        </h3>			
			</div>
		)	
	}
}
export default Group;