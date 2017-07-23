import React, { Component } from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({ id, value, field, label, htmlFor, error, type, onChange, checkUserExists }) => {
    return (
        <div className={classnames("input-field col s12", { 'has-error': error})}>
            <input
            id={id}
            onChange={onChange}
            onBlur={checkUserExists}
            value={value} 
            name={field}
            type={type} 
            className="form-control" />
            <label htmlFor={htmlFor}>{label}</label>
            {error && <span className="help-block">{error}</span>}
        </div>
    );
}

TextFieldGroup.propTypes = {
  id: React.PropTypes.string.isRequired,
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  htmlFor: React.PropTypes.string.isRequired,
  error: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onBlur: React.PropTypes.func
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup;