import AsyncStorage from '@react-native-async-storage/async-storage';
import { UPDATE_CART, CLEAR_CART } from './cart.types';

export const updateCart = (item, action) => async (dispatch, getState) => {
  const currentCart = [...getState().cart.items];
  const existingItemIndex = currentCart.findIndex(cartItem => cartItem.id === item.id);

  if (action === 'add') {
    if (existingItemIndex >= 0) {
      currentCart[existingItemIndex] = {
        ...currentCart[existingItemIndex],
        quantity: currentCart[existingItemIndex].quantity + 1
      };
    } else {
      currentCart.push({ ...item, quantity: 1 });
    }
  } else if (action === 'remove' && existingItemIndex >= 0) {
    if (currentCart[existingItemIndex].quantity > 1) {
      currentCart[existingItemIndex] = {
        ...currentCart[existingItemIndex],
        quantity: currentCart[existingItemIndex].quantity - 1
      };
    } else {
      currentCart.splice(existingItemIndex, 1);
    }
  }

  const total = currentCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  await AsyncStorage.setItem('cart', JSON.stringify(currentCart));
  
  dispatch({
    type: UPDATE_CART,
    payload: {
      items: currentCart,
      total
    }
  });
};

export const clearCart = () => async dispatch => {
  await AsyncStorage.removeItem('cart');
  dispatch({ type: CLEAR_CART });
};