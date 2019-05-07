import { combineReducers } from 'redux';
import {mainReducer} from './main/reducer';

const rootReducer = combineReducers({
  main: mainReducer,
});

export default (state, action) => {
  return rootReducer(state, action);
};