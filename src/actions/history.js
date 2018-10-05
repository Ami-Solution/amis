import fetch from 'isomorphic-fetch';
import * as types from '../constants/history';
import config from '../config';
import { getHeaders } from '../utils';

const toastr = window.toastr;

export function initialPosition(values) {
  return {
    type: types.POSITION_INITIAL,
    payload: { values }
  };
}

export function addPosition(values) {
  return {
    type: types.ADD_POSITION,
    payload: { values }
  };
}

export function deletePosition(id) {
  return {
    type: types.DELETE_POSITION,
    payload: { id }
  };
}

export function updatePolicy(policyid, data) {
  return dispatch => {
    let isError = false;
    fetch(`${config.baseUrl}api/v1/policies/${policyid}/`,
      { method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
        credentials: 'include'
      })
      .then(response => {
        if (response.status >= 400) {
          isError = true;
        }
        return response.json();
      })
      .then(json => {
        if (!isError) {
          dispatch({ type: types.POLICY_UPDATE, payload: json });
        }
      });
  };
}

export function createPolicy() {
  return dispatch => {
    let isError = false;
    fetch(`${config.baseUrl}api/v1/policies/`,
      { method: 'POST',
        headers: getHeaders(),
        credentials: 'include'
      })
      .then(response => {
        if (response.status >= 400) {
          isError = true;
        }
        return response.json();
      })
      .then(json => {
        if (!isError) {
          dispatch({ type: types.CREATE_POLICY, payload: json });
        }
      });
  };
}

export function signPolicy(policyid, data, successCallback) {
  return dispatch => {
    let isError = false;
    dispatch({ type: types.POLICY_SIGN_START });
    fetch(`${config.baseUrl}api/v1/policies/${policyid}/signature`,
      { method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
        credentials: 'include'
      })
      .then(response => {
        if (response.status >= 400) {
          isError = true;
        } else {
          if (successCallback) successCallback.apply();
          dispatch({ type: types.POLICY_SIGN_SUCCESS });
        }
        return response.json();
      })
      .then(json => {
        if (isError) {
          toastr.error(json.non_field_errors[0]);
          dispatch({ type: types.POLICY_SIGN_ERROR, payload: json });
        }
      });
  };
}

export function uploadHistoryFile(policyid, data, successCallback) {
  return dispatch => {
    let isError = false;
    fetch(`${config.baseUrl}api/v1/policies/${policyid}/file`,
      { method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
        credentials: 'include'
      })
      .then(response => {
        if (response.status >= 400) {
          toastr.error('File loaded error');
          isError = true;
        }
        return response.json();
      })
      .then(json => {
        if (!isError) {
          if (successCallback) successCallback.apply();
          toastr.success('File loaded');
          dispatch({ type: types.HISTORY_FILE_UPLOAD, payload: json });
        } else {
          toastr.error(json.mimetype[0]);
        }
      });
  };
}
