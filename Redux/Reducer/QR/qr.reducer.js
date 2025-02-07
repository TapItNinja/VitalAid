// Redux/Reducer/QR/qr.reducer.js
import { QRActionTypes } from './qr.types';

const INITIAL_STATE = {
  menu: null,
  loading: false,
  error: null,
};

const qrReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QRActionTypes.FETCH_MENU_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case QRActionTypes.FETCH_MENU_SUCCESS:
      return {
        ...state,
        loading: false,
        menu: action.payload,
        error: null,
      };
    case QRActionTypes.FETCH_MENU_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default qrReducer;  // Change to default export