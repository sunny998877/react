import React from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { serialize } from 'object-to-formdata';
// material
import { Stack, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './style';
import { updatePassword } from '../../../actions/profile/profile';

const ProfilePasswordChange = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const LoginSchema = Yup.object().shape({
    old_password: Yup.string().required('Current Password is required'),
    new_password: Yup.string().required('New Password is required').min(8, 'Minimum 8 characters'),
    confirm_password: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      old_password: '',
      new_password: '',
      confirm_password: ''
    },
    validationSchema: LoginSchema,
    // eslint-disable-next-line camelcase
    onSubmit: ({ old_password, new_password, confirm_password }) => {
      const formData = serialize({
        old_password,
        new_password,
        confirm_password
      });
      dispatch(updatePassword(formData)).then((res) => formik.setSubmitting(false));
    }
  });

  const { errors, touched, dirty, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const form = (
    <div className={classes.formContainer}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="password"
                  label="Current Password"
                  {...getFieldProps('old_password')}
                  error={Boolean(touched.old_password && errors.old_password)}
                  helperText={touched.old_password && errors.old_password}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="password"
                  label="New Password"
                  {...getFieldProps('new_password')}
                  error={Boolean(touched.new_password && errors.new_password)}
                  helperText={touched.new_password && errors.new_password}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  {...getFieldProps('confirm_password')}
                  error={Boolean(touched.confirm_password && errors.confirm_password)}
                  helperText={touched.confirm_password && errors.confirm_password}
                />
              </Grid>
            </Grid>
          </Stack>
          <div className={classes.btnWapper}>
            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ my: 2 }}
              disabled={!dirty}
            >
              Update
            </LoadingButton>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
  return form;
};

export default ProfilePasswordChange;
