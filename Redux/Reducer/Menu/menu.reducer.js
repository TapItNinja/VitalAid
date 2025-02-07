import { MENU_LOADING, MENU_SUCCESS, MENU_ERROR } from './menu.types';

const initialState = {
  menu: null,
  loading: false,
  error: null
};

export const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case MENU_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case MENU_SUCCESS:
      return {
        ...state,
        menu: action.payload,
        loading: false,
        error: null
      };
    case MENU_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
