import { ActionsUnion, ActionTypes } from './actions';

class InitialState implements AuthState {
  authenticated: boolean;
  name: string;
  email: string;
  access_token: string;
}

export function AuthReducer(state = InitialState, action: ActionsUnion) {
  switch (action.type) {
    case ActionTypes.USER_PROFILE_LOADED:
      return {
        ...state,
        authenticated: true,
        name: action.name,
        email: action.email,
        access_token: action.accessToken,
      };

    case ActionTypes.DO_LOGIN_FAIL:
      return {
        ...state,
        authenticated: false,
        name: undefined,
        email: undefined,
        access_token: undefined,
      };

    case ActionTypes.DO_LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
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
