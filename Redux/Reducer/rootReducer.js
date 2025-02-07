// Redux/rootReducer.js
import { combineReducers } from 'redux';
import { authReducer } from './Auth/auth.reducer';
import { menuReducer } from './Menu/menu.reducer';
import { cartReducer } from './cart/cart.reducer';
import qrReducer from './QR/qr.reducer';  // Update this import

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  cart: cartReducer,
  qr: qrReducer,
});

export default rootReducer;