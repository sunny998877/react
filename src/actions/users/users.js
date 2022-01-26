import { toast } from 'react-toastify';
import axios from '../../utils/axios';
import { GET_USER_PROFILE, GET_USER_PROFILE_FAIL, UPDATE_USER_PROFILE } from '../action-type';

export const addUsers = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/user/user_register`, payload);

    return data;
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_FAIL,
      payload: { loading: false, isAuthenticated: true, user: {} }
    });
  }
};
