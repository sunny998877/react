import React from 'react';
import { connect, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { serialize } from 'object-to-formdata';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';

import { useStyles } from './style';
import { countryCode } from '../../UserProfile/ProfileForm/contryCode';

const AddUser = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'Invalid phone')
      .max(10, 'Invalid phone'),
    user_name: Yup.string().required('User Name is required'),
    name: Yup.string().required('Name is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      user_name: '',
      name: '',
      email: '',
      phone_country_id: '',
      phone: '',
      password: ''
    },
    validationSchema: LoginSchema,
    // eslint-disable-next-line camelcase
    onSubmit: ({ name, email, phone_country_id, phone }) => {
      //   const changesProperties = {};
      //   if (name !== user.name) changesProperties.name = name;
      //   if (email !== user.email) changesProperties.email = email;
      //   // eslint-disable-next-line camelcase
      //   if (phone_country_id !== user.phone_country_id)
      //     // eslint-disable-next-line camelcase
      //     changesProperties.phone_country_id = phone_country_id;
      //   if (phone !== user.phone) changesProperties.phone = phone;
      //   const formData = serialize(changesProperties);
      //   dispatch(updateUserProfile(formData));
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <div className={classes.formContainer}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="User Name"
                  {...getFieldProps('user_name')}
                  error={Boolean(touched.user_name && errors.user_name)}
                  helperText={touched.user_name && errors.user_name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Name"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  {...getFieldProps('password')}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email Address"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={4} md={3}>
                    {/* <TextField
                      fullWidth
                      type="phone_country_id"
                      label="Country Code"
                      {...getFieldProps('phone_country_id')}
                      error={Boolean(touched.phone_country_id && errors.phone_country_id)}
                      helperText={touched.phone_country_id && errors.phone_country_id}
                    /> */}
                    <Select
                      labelId="demo-simple-select-label"
                      id="phone_country_id"
                      // value={countryCode.find((country) => country.name === 'India')?.code}
                      value={
                        // values.phone_country_id ||
                        countryCode.find((country) => country.name === 'India')?.code
                      }
                      label="Country Code"
                      // onChange={handleChange}
                    >
                      {countryCode.map((country) => (
                        <MenuItem key={country.code} value={country.code}>
                          {country.code}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={8} md={9}>
                    <TextField
                      fullWidth
                      type="text"
                      label="Phone Number"
                      {...getFieldProps('phone')}
                      error={Boolean(touched.phone && errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
          <div className={classes.btnWapper}>
            <LoadingButton
              // fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ my: 2 }}
            >
              Add
            </LoadingButton>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default AddUser;
