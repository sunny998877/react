import { GET_TAGS, GET_TEAMS } from '../../actions/action-type';

const initialState = {
  tags: {
    loading: true,
    list: []
  },
  teams: {
    loading: true,
    list: []
  }
};

export const config = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TAGS:
      return { ...state, tags: { ...state.tags, ...payload } };
    case GET_TEAMS:
      return { ...state, teams: { ...state.teams, ...payload } };
    default:
      return state;
  }
};
