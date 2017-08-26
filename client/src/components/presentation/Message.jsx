import React from 'react';
import PropTypes from 'prop-types';

const Message = ({
  currentMessage
}) => {
  return (
    <div className="email-content-wrap">
      <div className="row">
        <div className="col s12 m10 l10 msg-position">
          <ul className="collection">
            <li className="collection-item avatar">
              <span
                className="circle green lighten-1 center"
              >{currentMessage.messagecreator[0]}</span>
              <span
                className="email-title"
                id="msg-creator"
              >{currentMessage.messagecreator}</span>
              <span
                className="grey-text ultra-small right date-msg-position"
              >Priority: {currentMessage.priority}</span>
              <span
                className="grey-text ultra-small right date-pad date-msg-position"
              >{new Date(currentMessage.createdAt).toLocaleString()}</span>
              <div className="flex wordwrap">
                <span
                  className="email-content msg-content"
                >{currentMessage.content}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <hr />
    </div>
  );
};

Message.propTypes = {
  currentMessage: PropTypes.object.isRequired,
};

export default Message;
