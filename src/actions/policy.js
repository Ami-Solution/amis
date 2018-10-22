import fetch from 'isomorphic-fetch';
import * as types from '../constants/policy';
import config from '../config';
import { getHeaders } from '../utils';

const toastr = window.toastr;

export function getPolicy(policyid, successCallback) {
  return dispatch => {
    let isError = false;
    fetch(`${config.baseUrl}api/v1/policies/${policyid}/`,
      { method: 'GET' })
      .then(response => {
        if (response.status >= 400) {
          isError = true;
        }
        return response.json();
      })
      .then(json => {
        if (!isError) {
          if (successCallback) successCallback.apply(null);
          dispatch({ type: types.POLICY_GET, payload: json });
        }
      });
  };
}

export function getDepositInfo(policyid) {
  return dispatch => {
    let isError = false;
    fetch(`${config.baseUrl}api/v1/policies/${policyid}/smart_deposit`,
      { method: 'GET',
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
          dispatch({ type: types.POLICY_SMARTDEPOSIT_INFO_GET, payload: json });
        }
      });
  };
}

export function changePoolState(values) {
  return {
    type: types.POOL_STATE_CHANGE,
    payload: { values }
  };
}
