import {
  EditFieldTypes,
  FieldWrapperProps
} from '@src/components/TypeDefinitions';

import DateField from './DateTimeField';
import ErrorField from '../ErrorField';
import { Field } from 'formik';
import Grid from '@material-ui/core/Grid/Grid';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import React from 'react';
import SelectField from './SelectField/index';
import TextField from './TextField';
import classNames from 'classnames';
import makeStyles from '@material-ui/styles/makeStyles/makeStyles';
import { renderAsComponent } from '../../../commons/renderHelper';

const useStyles = makeStyles({
  label: { paddingRight: 30 },
  alignRight: {
    textAlign: 'right'
  }
});

function getFieldByType(type: EditFieldTypes) {
  switch (type) {
    case 'date':
    case 'datetime':
    case 'time':
      return DateField;
    case 'select':
      return SelectField;
    default:
      return TextField;
  }
}

function FieldWrapper(props: FieldWrapperProps) {
  const asCom = renderAsComponent(props);
  if (asCom) return asCom;

  const {
    label,
    labelAlign,
    type,
    name,
    disabled,
    required,
    variant,
    showError,
    ...rest
  } = props;

  const classes = useStyles();
  const FieldComponent = getFieldByType(type as EditFieldTypes);

  if (variant === 'labeled') {
    return (
      <Grid container alignItems="center" justify="center">
        <Grid
          item
          md={4}
          sm={12}
          className={classNames({
            [classes.label]: true,
            [classes.alignRight]: labelAlign === 'right'
          })}
        >
          {label &&
            (showError ? (
              <ErrorField
                variant="label"
                name={name}
                disabled={disabled}
                required={required}
              >
                {label}
              </ErrorField>
            ) : (
              <InputLabel
                htmlFor={name}
                disabled={disabled}
                required={required}
              >
                {label}
              </InputLabel>
            ))}
        </Grid>
        <Grid item md={8} sm={12}>
          <Field
            fullWidth
            name={name}
            id={name}
            disabled={disabled}
            required={required}
            {...rest}
            type={type as any}
            variant="outlined"
            component={FieldComponent}
          />
        </Grid>
      </Grid>
    );
  } else
    return (
      <>
        <Field
          fullWidth
          name={name}
          id={name}
          disabled={disabled}
          required={required}
          {...rest}
          label={label}
          type={type as any}
          variant={variant as any}
          component={FieldComponent}
        />
        {showError && <ErrorField name={name} />}
      </>
    );
}

FieldWrapper.defaultProps = { labelAlign: 'right', showError: true };

export default FieldWrapper;
