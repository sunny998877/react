import { GET_AGENT_LIST, DELETE_AGENT } from '../../actions/action-type';

const initialState = {
  loading: true,
  data: {}
};

export const agents = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_AGENT_LIST:
      return { ...state, ...payload };
    case DELETE_AGENT:
      return { ...state, data: { ...state.data, ...payload } };

    default:
      return state;
  }
};
