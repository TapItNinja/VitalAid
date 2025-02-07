import { AUTH_ERROR, AUTH_LOADING, AUTH_LOGOUT, AUTH_SUCCESS, CLEAR_ERROR, SIGNUP_SUCCESS } from "./auth.types";

const initialState = {
  token: null,
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
        error: null,
        isAuthenticated: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false
      };
    case AUTH_LOGOUT:
      return initialState;
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};