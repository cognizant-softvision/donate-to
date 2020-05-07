import { Actions, ActionTypes } from './actions';

class InitialState implements AuthState {
  authenticated: boolean;
  name: string;
  email: string;
  access_token: string;
}

export function AuthReducer(state = InitialState, action: Actions) {
  switch (action.type) {
    case ActionTypes.DO_LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
      };

    case ActionTypes.DO_LOGIN_FAIL:
      return {
        ...state,
        authenticated: false,
      };

    case ActionTypes.DO_LOGOUT:
      return {
        ...state,
        authenticated: false,
      };

    default:
      return state;
  }
}

export interface AuthState {
  authenticated: boolean;
  name: string;
  email: string;
  access_token: string;
}
