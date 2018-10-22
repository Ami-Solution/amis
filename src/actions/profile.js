import fetch from 'isomorphic-fetch';
import * as types from '../constants/profile';
import config from '../config';
import { getHeaders } from '../utils';

const toastr = window.toastr;

export function fetchProfile(accountId, successCallback, errorCallback) {
  return dispatch => {
    let isError = false;
    const returnObj = { type: types.GET_ACCOUNT, payload: {} };
    fetch(`${config.baseUrl}api/v1/accounts/${accountId}/`,
      { method: 'GET',
        headers: getHeaders(),
        credentials: 'include'
      })
      .then(response => {
        if (response.status >= 400) {
          toastr.error('Server Error');
          returnObj.payload.isAuth = false;
          isError = true;
          dispatch(returnObj);
        }
        return response.json();
      })
      .then(json => {
        if (!isError) {
          if (successCallback) successCallback.apply();
          returnObj.payload = json;
          returnObj.payload.isAuth = true;
          dispatch(returnObj);
        } else if (errorCallback) {
          errorCallback.apply();
        }
      });
  };
}

export function login(data, successCallback, errorCallback) {
  return dispatch => {
    let isError = false;
    dispatch({ type: types.LOGIN_START, payload: {} });
    fetch(`${config.baseUrl}api/v1/login/`,
      { method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
        credentials: 'include'
      })
      .then(response => {
        if (response.status >= 400) {
          isError = true;
          dispatch({ type: types.LOGIN_ERROR, payload: {} });
        }
        return response.json();
      })
      .then(json => {
        if (!isError) {
          window.localStorage.setItem('accountId', json.accountid);
          window.localStorage.setItem('isLogin', 'true');
          dispatch(fetchProfile(json.accountid, successCallback, errorCallback));
        } else {
          if (json.non_field_errors[0]) {
            toastr.error(json.non_field_errors[0]);
          } else {
            toastr.error('Server Error');
          }
          if (errorCallback) errorCallback.apply();
        }
      });
  };
}

export function logout() {
  window.localStorage.removeItem('accountId');
  window.localStorage.removeItem('isLogin');
  return {
    type: types.LOGOUT,
    payload: { isAuth: false }
  };
}

export function relogin() {
  return {
    type: types.RELOGIN,
    payload: { isRelogin: true }
  };
}

export function identity(username, successCallback) {
  return dispatch => {
    let isError = false;
    dispatch({ type: types.IDENTITY_START, payload: {} });
    fetch(`https://keybase.io/_/api/1.0/user/lookup.json?username=${username}`,
      { method: 'GET' })
      .then(response => {
        if (response.status >= 400) {
          isError = true;
        }
        return response.json();
      })
      .then(json => {
        if (!isError) {
          if (successCallback) {
            successCallback.apply(null);
          }
          if (json.status.code > 0) toastr.error(json.status.desc);
          dispatch({ type: types.IDENTITY_SUCCESS, payload: json });
        } else {
          dispatch({ type: types.IDENTITY_ERROR, payload: {} });
        }
      });
  };
}

export function clearIdentity() {
  return {
    type: types.IDENTITY_SUCCESS,
    payload: {}
  };
}

export function accountCreate(data, successCallback, errorCallback) {
  return dispatch => {
    let isError = false;
    dispatch({ type: types.ACCOUNT_CREATE_START, payload: {} });
    fetch(`${config.baseUrl}api/v1/accounts/`,
      { method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.status >= 400) {
          isError = true;
        }
        return response.json();
      })
      .then(json => {
        if (!isError) {
          if (successCallback) successCallback.apply();
          dispatch({ type: types.ACCOUNT_CREATE_SUCCESS, payload: {} });
        } else {
          toastr.error(json.email[0]);
          if (errorCallback) errorCallback.apply();
          dispatch({ type: types.ACCOUNT_CREATE_ERROR, payload: {} });
        }
      });
  };
}
