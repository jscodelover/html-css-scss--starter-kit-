import actionCreator from 'utils/actionCreator';

export const actions = actionCreator('user', [
  'LOGIN_REQUEST',
  'LOGIN_SUCCESS',
  'LOGOUT_REQUEST',
  'LOGOUT_SUCCESS',
  'CHECK_AUTH',
]);

export function userLoginRequest(callback) {
  return {
    type: actions.LOGIN_REQUEST,
    callback,
  };
}

export function userLoginSuccess(payload) {
  console.log('login successgul');
  return {
    type: actions.LOGIN_SUCCESS,
    payload,
  };
}

export function userLogoutRequest() {
  return {
    type: actions.LOGOUT_REQUEST,
  };
}

export function userLogoutSuccess() {
  return {
    type: actions.LOGOUT_SUCCESS,
  };
}

export function userCheckAuth(callback) {
  return {
    type: actions.CHECK_AUTH,
    callback,
  };
}
