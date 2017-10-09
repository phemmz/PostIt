import React from 'react';
import PropTypes from 'prop-types';
import Chips from 'react-chips';

const AddUserModal = ({
  onClick, users, suggestions,
  onChipsChange, addUserSuccess, addUserFail,
  existingUser, usersAddedSuccessfully
}) => {
  return (
    <div id="addUser" className="modal">
      <div className="modal-content">
        <h4 className="green-text text-darken-4">Add Users to a Group</h4>
        <hr />
        <div className="row">
          {
            (addUserSuccess) ?
            (
              <div
                className="col s5 add-user-success green-text center"
              >
                {usersAddedSuccessfully.join()} Successfully Added to Group
              </div>
            ) :
            null
          }
          {
            (addUserFail) ?
            (
              <div
                className="col s5 add-user-fail red-text center"
              >
                {existingUser.join()} Already Exist In The Group
              </div>
            ) :
            null
          }
        </div>
        <div className="row">
          <div className="input-field col s12">
            <Chips
              id="users"
              value={users}
              onChange={onChipsChange}
              suggestions={suggestions}
              placeholder="Add users to a group"
            />
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          className="modal-action modal-close waves-effect waves-green btn-flat"
        >Cancel</a>
        <a
          onClick={onClick}
          className="modal-action waves-effect waves-green btn-flat add-btn"
          role="link"
          tabIndex={0}
        >Add User</a>
      </div>
    </div>
  );
};

AddUserModal.propTypes = {
  onClick: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChipsChange: PropTypes.func.isRequired,
  addUserSuccess: PropTypes.bool.isRequired,
  addUserFail: PropTypes.bool.isRequired,
  existingUser: PropTypes.arrayOf(PropTypes.string),
  usersAddedSuccessfully: PropTypes.arrayOf(PropTypes.string)
};

AddUserModal.defaultProps = {
  existingUser: [],
  usersAddedSuccessfully: []
};

export default AddUserModal;
