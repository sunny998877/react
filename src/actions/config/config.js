import axios from '../../utils/axios';
import { GET_TAGS, GET_TEAMS } from '../action-type';
import { handleResponseError } from '../../utils/handleResponseError';

export const fetchTags = async (dispatch) => {
  try {
    const { data } = await axios.get(`/tags/list`);
    dispatch({
      type: GET_TAGS,
      payload: {
        loading: false,
        list: data.data
      }
    });
    handleResponseError(data);
    return data;
  } catch (error) {
    return console.log(error);
  }
};

export const fetchTeams = async (dispatch) => {
  try {
    const { data } = await axios.get(`/team/list`);
    dispatch({
      type: GET_TEAMS,
      payload: {
        loading: false,
        list: data.data
      }
    });
    handleResponseError(data);
    return data;
  } catch (error) {
    return console.log(error);
  }
};
