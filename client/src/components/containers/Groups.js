import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router';
import { Group  } from '../presentation';
import TextFieldGroup from '../common/TextFieldGroup';
import GroupActions from '../../actions/groupActions';
/**
 * Groups class which inherits the React.Component class
 */
class Groups extends Component {
	constructor() {
		super();
		this.state = {
			users: {},
			list: [],
			userList: [],
      selected: 0
		}
	}
/**
 * componentDidMount() is called at the instance where the Groups component is being created
 * and inserted into the DOM
 * It fires the action that gets all the groups a user belongs to
 */
	componentDidMount() {
/**
 * Fires the action for fetching all groups
 * a user belongs to on componentDidMount
 */
    this.props.fetchGroups();
		window.$('.modal-trigger').click((e) => {
			e.preventDefault();
			window.$('#createGroup').modal();
		});
	}
/**
 * groupClickHandler gets called from Group component when a groupname is clicked on
 * It fires the groupSelected action
 */
  groupClickHandler(groupId) {
/**
 * calls the groupSelected action and passes the groupId of the group selected to it
 * This action saves the id to the reducer
 */
		this.props.groupSelected(groupId);
  }

	render() {
		$('.tooltipped').tooltip({delay: 30});
		const listItems = this.props.groupList.map((group, i) => {
      let selected = (group.id == this.props.selectedGroup);
			return (
				<li key={i}>
          <Group groupPropsObj={ group }
                 groupClickHandler={ this.groupClickHandler.bind(this) } 
                 isSelected={ selected } 
                 groupId={ group.id }
          />
        </li>
			)
		});	

    let content = null;
    if (this.props.appStatus == 'loading') {
      content =
			<div className="container-fluid">
				<div className="row" style={{marginBottom: 0}}>
					<div className="col s12 m12" style={{paddingLeft: 0}}>
						<div className="container-fluid">
							<div className="row">
								<div className="col s12">
									<h5 className="white-text text-darken-4">Your Group List</h5>
								</div>		
							</div>
							<hr />
							<div className="container">
								<div className="col s3 offset-s4 my-preloader">
									<div className="valign-wrapper preloader-wrapper active">
										<div className="spinner-layer spinner-red-only">
											<div className="circle-clipper left">
												<div className="circle"></div>
											</div>
											<div className="gap-patch">
												<div className="circle"></div>
											</div>
											<div className="circle-clipper right">
												<div className="circle"></div>
											</div>
										</div>
										<h5>LOADING...</h5>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
    } else if (this.props.appStatus == 'no groups') {
      content = 
			<div className="container-fluid">
				<div className="row" style={{marginBottom: 0}}>
					<div className="col s12 m12" style={{paddingLeft: 0}}>
						<div className="container-fluid">
							<div className="row">
								<div className="col s12">
									<h5 className="white-text text-darken-4">Your Group List
										<Link to='/group'>
											<i className="small material-icons add-group tooltipped" data-tooltip="Create Group">add_to_photos</i>
										</Link>	
									</h5>
								</div>		
							</div>
							<hr />
							<div className="scrbar center">
								<h4>You currently don't belong to any group</h4>
							</div>
							<div>
							</div>
						</div>
						<div className="center">
							<Link to="" className="searchbtn waves-effect waves-light btn center">Search for users</Link>
						</div>
					</div>
				</div>
			</div>
		} else if (this.props.appStatus == 'ready') {
      content = 
      <div className="container-fluid">
				<div className="row">
					<div className="col s12 m12">
						<div className="container-fluid">
							<div className="row">
								<div className="col s12">
									<h5 className="white-text text-darken-4">Your Group List
										<Link to='/group'>
											<i className="small material-icons add-group tooltipped" data-tooltip="Create Group">add_to_photos</i>
										</Link>	
									</h5>
								</div>		
							</div>
							<hr />
							<div className="scrbar center">
								<ol>
									{listItems}
								</ol>
							</div>
						</div>
						<div className="center">
							<Link to="" className="searchbtn waves-effect waves-light btn center">Search for users</Link>
						</div>
					</div>
				</div>
			</div>
    }
		return content;
	}
}

const stateToProps = (state) => {
  return {
    groupList: state.groupReducer.groupList,
    selectedGroup: state.groupReducer.selectedGroup,
    appStatus: state.groupReducer.appStatus
  }
}

const dispatchToProps = (dispatch) => {
  return {
    fetchGroups: () => dispatch(GroupActions.fetchGroups()),
    groupCreate: (group) => dispatch(GroupActions.groupCreate(group)),
    groupSelected: (groupIndex) => dispatch(GroupActions.groupSelected(groupIndex))
  }
}
export default connect(stateToProps, dispatchToProps)(Groups);