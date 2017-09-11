import React from 'react';
import PropTypes from 'prop-types';

/**
 * Home
 * @return {*} div
 */
const MessageHeader = ({ groupName }) => {
  return (
    <div className="row">
      <div className="col s12">
        <span><h5 id="welcome-header" className="green-text text-darken-4 card">
          <strong>
            { groupName }
          </strong></h5>
        </span>
      </div>
    </div>
  );
};

MessageHeader.propTypes = {
  groupName: PropTypes.string.isRequired
};

export default MessageHeader;
