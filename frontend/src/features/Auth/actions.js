import { USER_LOGIN, USER_LOGOUT } from './constants';

export function userLogin(user, token) {
  return {
    type: USER_LOGIN,
    user,
    token,
  };
}

export function userLogoout() {
  return {
    type: USER_LOGOUT,
  };
}
