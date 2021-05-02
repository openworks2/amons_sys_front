import { combineReducers } from 'redux';
import companies from './companies';
import login from './login';
import monitor from './monitor';

const rootReducer = combineReducers({ companies, login, monitor });

export default rootReducer;