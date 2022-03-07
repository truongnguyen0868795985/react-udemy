import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

function InputField(props) {
  const { form, name, label, disabled } = props;
  const { errors, formState } = form;
  const hasError = formState.touched[name] && errors[name];

  return (
    <Controller
      name={name}
      control={form.control}
      as={TextField}
      label={label}
      disabled={disabled}
      error={hasError}
      helperText={errors[name]?.message}
    />
  );
}

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default InputField;
