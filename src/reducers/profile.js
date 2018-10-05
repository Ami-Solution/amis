import objectAssign from 'object-assign';

import * as types from '../constants/profile';

const initialState = {
  isAuth: false,
  user: {},
  identityUser: {},
  policyId: undefined,
  isFetched: false,
  isRelogin: false
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_START:
      return objectAssign({}, state, { isFetched: true });
    case types.LOGIN_SUCCESS:
      return objectAssign({}, state, { isFetched: false });
    case types.LOGIN_ERROR:
      return objectAssign({}, state, { isFetched: false });
    case types.GET_ACCOUNT: {
      return objectAssign({}, state, { user: action.payload }, { isAuth: true }, { isFetched: false });
    }
    case types.IDENTITY_START:
      return objectAssign({}, state, { isFetched: true });
    case types.IDENTITY_SUCCESS: {
      const identityUser = {};
      if (action.payload.them) {
        identityUser.username = action.payload.them.basics.username;
        if (action.payload.them.pictures) {
          if (action.payload.them.pictures.primary.url) {
            identityUser.avatarPath = action.payload.them.pictures.primary.url;
          }
        } else {
          identityUser.avatarPath = 'https://keybase.io/images/no-photo/placeholder-avatar-180-x-180.png';
        }
      }
      return objectAssign({}, state, { identityUser }, { isFetched: false });
    }
    case types.IDENTITY_ERROR:
      return objectAssign({}, state, { isFetched: false });
    case types.LOGOUT: {
      window.localStorage.removeItem('accountId');
      return objectAssign({}, state, action.payload);
    }
    case types.RELOGIN: {
      return objectAssign({}, state, action.payload);
    }
    case types.ACCOUNT_CREATE_START:
      return objectAssign({}, state, { isFetched: true });
    case types.ACCOUNT_CREATE_SUCCESS:
      return objectAssign({}, state, { isFetched: false });
    case types.ACCOUNT_CREATE_ERROR:
      return objectAssign({}, state, { isFetched: false });
    case types.CREATE_POLICY: {
      const user = state.user;
      user.policies.push({ id: action.payload.id });
      return objectAssign({}, state, { policyId: action.payload.id }, user);
    }
    default:
      return state;
  }
}

export default profileReducer;
