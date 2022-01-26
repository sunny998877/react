import {
  SIGN_IN,
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAIL,
  LOG_OUT,
  UPDATE_USER_PROFILE,
  RESET_PASS_VALID_KEY
} from '../../actions/action-type';

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: {},
  resetPassword: {
    loading: true,
    valid: false
  }
};

export const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_IN:
      return { ...state, ...payload };
    case LOG_OUT:
      return { ...state, loading: false, isAuthenticated: false, user: {} };
    case GET_USER_PROFILE:
      return { ...state, ...payload };
    case GET_USER_PROFILE_FAIL:
      return { ...state, ...payload };
    case UPDATE_USER_PROFILE:
      return { ...state, ...payload };
    case RESET_PASS_VALID_KEY:
      return { ...state, resetPassword: { ...state.resetPassword, ...payload } };
    default:
      return state;
  }
};
