/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
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
  MenuItem,
  Card,
  Container,
  CardContent,
  InputLabel,
  Typography,
  Button
} from '@material-ui/core';
import { useAutocomplete } from '@mui/core/AutocompleteUnstyled';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField as MuiTextField } from '@mui/material';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { tags } from './tags';
import { useStyles, Label, InputWrapper, Listbox, StyledTag, Android12Switch } from './style';
import { addAgent, getAgentListing } from '../../../actions/agent/agent';
import { fetchTags, fetchTeams } from '../../../actions/config/config';
import { countries } from './phone-code';

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const initialValues = {
  user_name: '',
  name: '',
  email: '',
  phone_country: '',
  phone: '',
  password: '',
  assign_team: '',
  agent_permission: '',
  is_vat: false,
  image: '',
  vat_image: '',
  tags: []
};

const AddAgent = ({ config, handleClose }) => {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl
  } = useAutocomplete({
    id: 'customized-hook-tag',
    // defaultValue: [tags[1]],
    multiple: true,
    options: config.tags.list,
    getOptionLabel: (option) => option.name
  });

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTags);
    dispatch(fetchTeams);
  }, [dispatch]);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    phone: Yup.string()
      .required('Phone Number is required')
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'Invalid phone')
      .max(10, 'Invalid phone'),
    user_name: Yup.string().required('User Name is required'),
    name: Yup.string().required('Name is required'),
    password: Yup.string().required('Password is required'),
    assign_team: Yup.string().required('Assign Team is required'),
    agent_permission: Yup.string().required('Agent Permisison is required'),
    image: Yup.mixed()
      .required('Image is required')
      .test('fileSize', 'File Size is too large', (value) => value && value.size <= 2 * 1024 * 1024)
      .test(
        'fileType',
        'Unsupported File Format',
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
    is_vat: Yup.boolean(),
    vat_image: Yup.mixed().when('is_vat', {
      is: true,
      then: Yup.mixed()
        .required('Vat Image is required')
        .test(
          'fileSize',
          'File Size is too large',
          (value) => value && value.size <= 2 * 1024 * 1024
        )
        .test(
          'fileType',
          'Unsupported File Format',
          (value) => value && SUPPORTED_FORMATS.includes(value.type)
        ),
      other: Yup.mixed()
    })
  });

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    enableReinitialize: true,
    onSubmit: ({
      user_name,
      name,
      email,
      phone_country,
      phone,
      password,
      assign_team,
      agent_permission,
      is_vat,
      vat_image,
      image,
      tags
    }) => {
      const payload = {
        user_name,
        name,
        email,
        phone_country,
        phone,
        password,
        assign_team,
        agent_permission,
        image,
        tags
      };

      if (is_vat) {
        payload.is_vat = 1;

        payload.vat_image = vat_image;
      } else {
        payload.is_vat = 0;
      }

      const formData = serialize(payload);
      return dispatch(addAgent(formData)).then((res) => {
        if (res.status === 1) {
          formik.resetForm();
          handleClose();
          dispatch(getAgentListing(0, 10));
        }
      });
    }
  });

  const handleSelectChange = ({ target: { value } }, name) => {
    formik.setFieldValue(name, value);
  };

  const {
    errors,
    touched,
    dirty,
    setFieldValue,
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps
  } = formik;

  return (
    <div className={classes.formContainer}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Add Agent
        </Typography>
      </Stack>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <div className={classes.imageWrapper}>
                  <label htmlFor="profile-image" className={classes.image}>
                    <AddCircleOutlineIcon className={classes.plusIcon} />
                    <input
                      type="file"
                      name="image"
                      id="profile-image"
                      max={1}
                      onChange={(event) => {
                        setFieldValue('image', event.currentTarget.files[0]);
                      }}
                    />
                  </label>
                  {touched.image && errors.image && (
                    <span className={classes.errorClass}>{errors.image}</span>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                {values.image && (
                  <img
                    src={URL.createObjectURL(values.image)}
                    alt="avatar"
                    className={classes.imagePreview}
                  />
                )}
              </Grid>
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
              </Grid>{' '}
              {/* <Grid container spacing={3}> */}
              <Grid item xs={12} md={6}>
                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <Autocomplete
                  id="country-select-demo"
                  options={countries}
                  autoHighlight
                  value={countries.find((country) => country.phone === values.phone_country)}
                  error={Boolean(touched.phone_country && errors.phone_country)}
                  helperText={touched.phone_country && errors.phone_country}
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=""
                      />
                      {option.label} ({option.code}) +{option.phone}
                    </Box>
                  )}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('phone_country', newValue?.phone);
                  }}
                  renderInput={(params) => (
                    <MuiTextField
                      fullWidth
                      {...params}
                      label="Choose a country"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password' // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </Grid>
              {/* <Grid item xs={12} md={6}> */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Phone Number"
                  {...getFieldProps('phone')}
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={touched.phone && errors.phone}
                />
              </Grid>
              {/* </Grid> */}
              {/* </Grid> */}
              <Grid item xs={12} md={6}>
                {/* <TextField
                  fullWidth
                  type="text"
                  label="Assigned Team"
                  {...getFieldProps('assign_team')}
                  error={Boolean(touched.assign_team && errors.assign_team)}
                  helperText={touched.assign_team && errors.assign_team}
                /> */}
                <InputLabel id="assign_team">Assigned Team</InputLabel>
                <Select
                  labelId="assign_team"
                  id="assign_team"
                  label="Assigned Team"
                  onChange={(e) => handleSelectChange(e, 'assign_team')}
                  placeholder="Assigned Team"
                  // autoWidth
                  className={classes.select}
                >
                  {config.teams.list.map((team) => (
                    <MenuItem value={team.id}>{team.name}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel id="agent_permission">Assigned Team</InputLabel>
                <Select
                  labelId="agent_permission"
                  id="agent_permission"
                  label="Agent Permission"
                  onChange={(e) => handleSelectChange(e, 'agent_permission')}
                  placeholder="Agent Permission"
                  // autoWidth
                  className={classes.select}
                >
                  {config.teams.list.map((team) => (
                    <MenuItem value={team.id}>{team.name}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Android12Switch checked={values.is_vat} />}
                  label="VAT"
                  onChange={({ target }) => {
                    formik.setFieldValue('is_vat', target.checked);
                    if (!target.checked) formik.setFieldValue('vat_image', '');
                  }}
                />
              </Grid>
              {values.is_vat && (
                <>
                  <Grid item xs={12} md={6}>
                    <div className={classes.imageWrapper}>
                      <label htmlFor="vat-image" className={classes.image}>
                        <AddCircleOutlineIcon className={classes.plusIcon} />
                        <input
                          type="file"
                          name="image"
                          id="vat-image"
                          max={1}
                          onChange={(event) => {
                            setFieldValue('vat_image', event.currentTarget.files[0]);
                          }}
                        />
                      </label>
                      {touched.vat_image && errors.vat_image && (
                        <span className={classes.errorClass}>{errors.vat_image}</span>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {values.vat_image && (
                      <img
                        src={URL.createObjectURL(values.vat_image)}
                        alt="avatar"
                        className={classes.imagePreview}
                      />
                    )}
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <div className={classes.tagsWapper}>
                  <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
                    {value.map((option, index) => (
                      <StyledTag label={option.name} {...getTagProps({ index })} />
                    ))}
                    <input {...getInputProps()} />
                  </InputWrapper>
                  {groupedOptions.length > 0 ? (
                    <Listbox {...getListboxProps()}>
                      {groupedOptions.map((option, index) => (
                        <li {...getOptionProps({ option, index })}>
                          <span>{option.name}</span>
                          <CheckIcon fontSize="large" />
                        </li>
                      ))}
                    </Listbox>
                  ) : null}
                </div>
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
              sx={{ mt: 2 }}
              disabled={!dirty}
            >
              Add
            </LoadingButton>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

AddAgent.propTypes = {
  config: PropTypes.object
};

const mapStateToProps = (state) => ({
  config: state.config
});

export default connect(mapStateToProps)(AddAgent);
