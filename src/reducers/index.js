import { combineReducers } from 'redux';
import classReducer from './classReducer';
import testReducer from './testReducer';
import loginReducer from './loginReducer';
import panelReducer from './panelReducer';

export default combineReducers({
  course: classReducer,
  test: testReducer,
  login: loginReducer,
  panel: panelReducer
});
