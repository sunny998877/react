import { toast } from 'react-toastify';
import { notification } from '../../utils/notification';
import axios from '../../utils/axios';
import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAIL,
  GET_AGENT_LIST,
  UPDATE_USER_PROFILE,
  DELETE_AGENT
} from '../action-type';
import { handleResponseError } from '../../utils/handleResponseError';

export const addAgent = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/user/agent_register`, payload);
    handleResponseError(data);

    return data;
  } catch (error) {
    return console.log(`error`, error);
  }
};

export const getAgentListing = (currentPage, perPage) => async (dispatch) => {
  try {
    dispatch({
      type: GET_AGENT_LIST,
      payload: {
        loading: true
      }
    });
    const { data } = await axios.get(`user/agent_listing?page=${currentPage}&per_page=${perPage}`);

    const callBack = () =>
      dispatch({
        type: GET_AGENT_LIST,
        payload: {
          loading: false,
          data: { ...data.data, total_page: data.total_page }
        }
      });

    handleResponseError(data, callBack);

    return data;
  } catch (error) {
    return console.log(`error`, error);
  }
};

export const deleteAgent = (agentId, updatedList) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`user/agent_delete`, { data: { id: agentId } });

    const callBack = () =>
      dispatch({
        type: DELETE_AGENT,
        payload: { rows: updatedList }
      });

    handleResponseError(data, callBack);

    return data;
  } catch (error) {
    return console.log(`error`, error);
  }
};
