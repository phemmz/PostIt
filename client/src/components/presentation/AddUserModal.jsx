import React from 'react';
import PropTypes from 'prop-types';

const AddUserModal = ({
  value, onChange, appUsers, onClick
}) => {
  return (
    <div id="addUser" className="modal">
      <div className="modal-content">
        <h4 className="green-text text-darken-4">Add User to a Group</h4>
        <div className="row">
          <div className="input-field col s12">
            <select id="username" value={value} onChange={onChange} style={{ display: 'block' }}>
              <option value="" disabled>Add User</option>
              {appUsers}
            </select>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
        <a
          onClick={onClick}
          className="modal-action modal-close waves-effect waves-green btn-flat add-btn"
          role="link"
          tabIndex={0}
        >Add User</a>
      </div>
    </div>
  );
};

AddUserModal.propTypes = {
  value: PropTypes.string.isRequired,
  appUsers: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default AddUserModal;
