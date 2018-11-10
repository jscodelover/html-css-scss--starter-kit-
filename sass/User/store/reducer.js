import { actions } from './actions';

const INITIAL_STATE = {
  loading: false,
  user: {},
  isAuthenticated: false,
};

export default function userReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case actions.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };
    case actions.LOGOUT_REQUEST:
    case actions.LOGIN_REQUEST:
    case actions.CHECK_AUTH:
      return {
        ...state,
        loading: true,
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload,
      };
    default:
      return state;
  }
}
