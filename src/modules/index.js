import { combineReducers } from 'redux';
import companies from './companies';
import login from './login';

const rootReducer = combineReducers({ companies, login });

export default rootReducer;