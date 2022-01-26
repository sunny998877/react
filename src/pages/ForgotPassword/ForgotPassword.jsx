import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import { forgotPassword } from '../../actions/auth/auth';
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

const ForgotPassword = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
  });

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: LoginSchema,
    onSubmit: ({ email }) => {
      const formData = formurlencoded({ email });

      forgotPassword(formData).then((res) => {
        console.log(`res`, res);
        formik.setSubmitting(false);
        if (!res.status !== 0) {
          navigate('/', { replace: true });
        }
      });
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
              Send Reset Email
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
          </Stack>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack sx={{ my: 2 }}>
                <TextField
                  fullWidth
                  autoComplete="email"
                  type="email"
                  label="Email address"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Stack>
              <Stack
                direction="row"
                alignItems="flex-end"
                justifyContent="space-between"
                sx={{ my: 2 }}
              >
                <Link component={RouterLink} variant="subtitle2" to="/">
                  Sign In
                </Link>
              </Stack>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                // disabled={!dirty}
              >
                Send Link
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

ForgotPassword.propTypes = {};

export default ForgotPassword;
