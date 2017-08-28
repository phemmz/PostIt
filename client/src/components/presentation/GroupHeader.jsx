import React from 'react';
import { Link } from 'react-router';

/**
 * Home
 * @return {*} div
 */
const GroupHeader = ({ notifications }) => {
  return (
    <div className="row">
      <div className="col s12">
        <h5 className="white-text text-darken-4">Your Group List
          <Link to="/group">
            <i
              className="fa fa-plus-square add-group tooltipped"
              data-tooltip="Create New Group"
              aria-hidden="true"
            />
          </Link>
          { (notifications.length !== 0) ?
            (
              <Link to="/notification" className="mybell on-notification">
                <i
                  className="fa fa-bell-o tooltipped"
                  data-tooltip="You have new Notification(s)"
                  aria-hidden="true"
                />
              </Link>
            ) :
            (
              <Link to="/notification" className="mybell">
                <i
                  className="fa fa-bell-o tooltipped"
                  data-tooltip="No new Notification"
                  aria-hidden="true"
                />
              </Link>
            )
          }
        </h5>
      </div>
    </div>
  );
};

export default GroupHeader;
