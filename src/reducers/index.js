import { combineReducers } from 'redux';
import { auth } from './auth/auth';
import { config } from './config/config';
import { agents } from './agents/agents';

export default combineReducers({ agents, config, auth });
