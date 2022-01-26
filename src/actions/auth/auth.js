import axios from '../../utils/axios';
import { handleResponseError } from '../../utils/handleResponseError';
import { SIGN_IN, LOG_OUT } from '../action-type';

export const logIn = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/user/login`, payload);
    const callback = () => {
      if (data) {
        localStorage.setItem('token', data?.token);
        dispatch({ type: SIGN_IN, payload: { loading: false, isAuthenticated: true } });
      } else {
        dispatch({ type: SIGN_IN, payload: { loading: false, isAuthenticated: false } });
      }
    };
    handleResponseError(data, callback);
    return data;
  } catch (error) {
    console.log(error);
    return dispatch({ type: SIGN_IN, payload: { loading: false, isAuthenticated: false } });
  }
};

export const logOut = (dispatch) => {
  dispatch({ type: LOG_OUT });
  localStorage.clear();
};

export const forgotPassword = async (payload) => {
  try {
    const { data } = await axios.put(`/user/forget_password`, payload);
    handleResponseError(data);

    return data;
  } catch (error) {
    return console.log(error);
  }
};

export const forgotPasswordReset = (key, payload) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/user/resetpassword/${key}`, payload);
    const callback = () => {
      dispatch({
        loading: false,
        valid: true
      });
    };
    handleResponseError(data, callback);
    return data;
  } catch (error) {
    console.log(error);
  }
};
