import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
/**
 * TextFieldGroup renders the input field
 * @returns {*} div
 */
const TextFieldGroup = (
    { id, value, field, label, htmlFor, error, type, onChange, checkUserExists }
) => {
  return (
    <div className={classnames('input-field col s12', { 'has-error': error })}>
      <input
        id={id}
        onChange={onChange}
        onBlur={checkUserExists}
        value={value}
        name={field}
        type={type}
        className="form-control"
        required
      />
      <label htmlFor={htmlFor}>{label}</label>
      {error && <span className="error">{error}</span>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  id: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checkUserExists: PropTypes.func
};

TextFieldGroup.defaultProps = {
  type: 'text',
  error: '',
  checkUserExists: () => {}
};

export default TextFieldGroup;
