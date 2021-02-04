import React from 'react';
import { withFormik } from 'formik';
import Yup from 'yup';
import { Avatar, Input, Typography, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { CountryCode } from './CountryCode';

const styles = () => ({
  card: {
    maxWidth: 420,
    marginTop: 50
  },
  container: {
    display: 'Flex',
    justifyContent: 'center'
  },
  actions: {
    float: 'right'
  }
});


const form = props =>
{
  const {
    classes,
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset
  } = props;

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardContent>

            <Typography component="h1" variant="h5">
              Registration        </Typography>
            <TextField
              id='userName'
              label='User Name'
              value={values.userName}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.userName ? errors.userName : ''}
              error={touched.userName && Boolean(errors.userName)}
              margin='dense'
              variant='outlined'
              fullWidth
            />
            <TextField
              id='firstName'
              label='First Name'
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.firstName ? errors.firstName : ''}
              error={touched.firstName && Boolean(errors.firstName)}
              margin='dense'
              variant='outlined'
              fullWidth
            />
            <TextField
              id='lastName'
              label='Last Name'
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.lastName ? errors.lastName : ''}
              error={touched.lastName && Boolean(errors.lastName)}
              margin='dense'
              variant='outlined'
              fullWidth
            />
            <TextField
              id='address1'
              label='Address line 1'
              value={values.address1}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.address1 ? errors.address1 : ''}
              error={touched.address1 && Boolean(errors.address1)}
              margin='dense'
              variant='outlined'
              fullWidth
            />
            <TextField
              id='address2'
              label='Address line2'
              value={values.address2}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.address2 ? errors.address2 : ''}
              error={touched.address2 && Boolean(errors.address2)}
              margin='dense'
              variant='outlined'
              fullWidth
            />

            <TextField
              select
              id='country'
              label='Country'
              value={values.country}
              onChange={handleChange('country')}
              helperText={touched.country ? errors.country : ''}
              error={touched.country && Boolean(errors.country)}
              margin='dense'
              variant='outlined'
              fullWidth
            >
              {console.log(values.country)}
              {CountryCode.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              id='state'
              label='State'
              value={values.state}
              onChange={handleChange('state')}
              helperText={touched.state ? errors.state : ''}
              error={touched.state && Boolean(errors.state)}
              margin='dense'
              variant='outlined'
              fullWidth
            >
              {values.country && values.country !== '' && CountryCode.find((item) => item.value === values.country).state.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id='pincode'
              label='PinCode'
              value={values.pincode}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.pincode ? errors.pincode : ''}
              error={touched.pincode && Boolean(errors.pincode)}
              margin='dense'
              variant='outlined'
              fullWidth
            />

            <TextField
              id='password'
              label='Password'
              type='password'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.password ? errors.password : ''}
              error={touched.password && Boolean(errors.password)}
              margin='dense'
              variant='outlined'
              fullWidth
            />
            <TextField
              id='confirmPassword'
              label='Confirm Password'
              type='password'
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.confirmPassword ? errors.confirmPassword : ''}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              margin='dense'
              variant='outlined'
              fullWidth
            />
            <Typography>Choose a profile picture</Typography>
            <TextField
              id='profileimg'
              type='file'
              InputProps={{ disableUnderline: true, accept: 'image/*' }}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.profileimg ? errors.profileimg : ''}
              error={touched.profileimg && Boolean(errors.profileimg)}
              margin='dense'
              fullWidth
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button type='submit' color='primary' variant="contained" disabled={isSubmitting}>
              SUBMIT
            </Button>
            <Button color='secondary' variant="contained" onClick={handleReset}>
              CLEAR
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

const Form = withFormik({
  mapPropsToValues: ({
    userName,
    firstName,
    lastName,
    address1,
    address2,
    country,
    state,
    pincode,
    password,
    confirmPassword,
    profileimg
  }) =>
  {
    return {
      userName: userName || '',
      firstName: firstName || '',
      lastName: lastName || '',
      address1: address1 || '',
      address2: address2 || '',
      country: country || '',
      state: state || '',
      pincode: pincode || '',
      password: password || '',
      confirmPassword: confirmPassword || '',
      profileimg: profileimg || '',
    };
  },

  validationSchema: Yup.object().shape({
    userName: Yup.string().required('Required'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    address1: Yup.string().required('Required'),
    address2: Yup.string().required('Required'),
    country: Yup.string().required('Select your Country '),
    state: Yup.string().required('Select your State '),
    pincode: Yup.string()
      .min(6, 'Pincode must contain at least 6 characters')
      .required('Enter your Pincode'),
    password: Yup.string()
      .min(8, 'Password must contain at least 8 characters')
      .required('Enter your password'),
    confirmPassword: Yup.string()
      .required('Confirm your password')
      .oneOf([Yup.ref('password')], 'Password does not match'),
    profileimg: Yup.mixed().required()

  }),

  handleSubmit: (values, { setSubmitting }) =>
  {
    setTimeout(() =>
    {
      // submit to the server
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  }
})(form);

export default withStyles(styles)(Form);
