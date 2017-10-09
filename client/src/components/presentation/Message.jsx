import React from 'react';
import PropTypes from 'prop-types';

const Message = ({
  currentMessage, readList
}) => {
  return (
    <div className="email-content-wrap">
      <div className="row">
        <div className="col s12 m10 l10 msg-position">
          <ul className="collection my-collection">
            <li className="collection-item avatar">
              <span
                className="circle green lighten-1 center"
              >{currentMessage.messagecreator[0]}</span>
              <span
                className="email-title msg-creator"
              >{currentMessage.messagecreator}</span>
              <span
                className="grey-text ultra-small right date-msg-position"
              >Priority: {currentMessage.priority}</span>
              <span
                className="grey-text ultra-small right date-pad date-msg-position" // eslint-disable-line
              >{new Date(currentMessage.createdAt).toLocaleString()}</span>
              <div className="flex wordwrap">
                <span
                  className="email-content msg-content"
                >{currentMessage.content}</span>
              </div>
              <div className="right">
                <i
                  className="material-icons read-marker-done tooltipped"
                  data-tooltip={`Read by: ${readList}`}
                >done_all</i>
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
  currentMessage: PropTypes.shape({
    messagecreator: PropTypes.string,
    priority: PropTypes.string,
    createdAt: PropTypes.string,
    content: PropTypes.string
  }).isRequired,
  readList: PropTypes.string.isRequired
};

export default Message;
