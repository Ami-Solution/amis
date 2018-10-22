import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import profileReducer from './profile';
import historyReducer from './history';
import policyReducer from './policy';

const rootReducer = combineReducers({
  history: historyReducer,
  profile: profileReducer,
  form: formReducer,
  policy: policyReducer
});

export default rootReducer;
