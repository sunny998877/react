/* eslint-disable camelcase */
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import {
  Card,
  Link,
  Container,
  Typography,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@material-ui/core';
import formurlencoded from 'form-urlencoded';
// layouts
import PropTypes from 'prop-types';
import { useFormik, Form, FormikProvider } from 'formik';
import { serialize } from 'object-to-formdata';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@material-ui/lab';
import { forgotPasswordReset } from '../../actions/auth/auth';
import AuthLayout from '../../layouts/AuthLayout';

// components
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import { LoginForm } from '../../components/authentication/login';
import AuthSocial from '../../components/authentication/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

const ResetPassword = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { key } = useParams();

  const LoginSchema = Yup.object().shape({
    new_password: Yup.string().required('New Password is required').min(8, 'Minimum 8 characters'),
    confirm_password: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      new_password: '',
      confirm_password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: ({ confirm_password }) => {
      const formData = serialize({
        password: confirm_password
      });
      dispatch(forgotPasswordReset(key, formData)).then((res) => formik.setSubmitting(false));
    }
  });

  const { errors, touched, dirty, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <RootStyle title="Login | Minimal-UI">
      <AuthLayout />
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome To AntDel
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Reset Password
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
          </Stack>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack sx={{ my: 2 }}>
                <TextField
                  fullWidth
                  type="password"
                  label="New Password"
                  {...getFieldProps('new_password')}
                  error={Boolean(touched.new_password && errors.new_password)}
                  helperText={touched.new_password && errors.new_password}
                />
              </Stack>
              <Stack sx={{ my: 2 }}>
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  {...getFieldProps('confirm_password')}
                  error={Boolean(touched.confirm_password && errors.confirm_password)}
                  helperText={touched.confirm_password && errors.confirm_password}
                />
              </Stack>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                disabled={!dirty}
              >
                Reset Password
              </LoadingButton>
            </Form>
          </FormikProvider>
          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="register">
                Get started
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

ResetPassword.propTypes = {};

export default ResetPassword;
