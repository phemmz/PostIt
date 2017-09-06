import React from 'react';

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

export default MessageHeader;
