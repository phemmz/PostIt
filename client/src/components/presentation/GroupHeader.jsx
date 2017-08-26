import React from 'react';
import { Link } from 'react-router';

/**
 * Home
 * @return {*} div
 */
const GroupHeader = () => {
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
        </h5>
      </div>
    </div>
  );
};

export default GroupHeader;
