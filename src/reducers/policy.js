import objectAssign from 'object-assign';

import * as types from '../constants/policy';

const initialState = {
  policy: {},
  depositInfo: {},
  poolState: 'init'
};

function policyReducer(state = initialState, action) {
  switch (action.type) {
    case types.POLICY_GET:
      return objectAssign({}, state, { policy: action.payload });
    case types.POLICY_SMARTDEPOSIT_INFO_GET:
      return objectAssign({}, state, { depositInfo: action.payload });
    case types.POOL_STATE_CHANGE:
      return objectAssign({}, state, { poolState: action.payload.values });
    default:
      return state;
  }
}

export default policyReducer;
