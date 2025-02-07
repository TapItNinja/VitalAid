import { UPDATE_CART, CLEAR_CART } from './cart.types';

const initialState = {
  items: [],
  total: 0
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CART:
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total
      };
    case CLEAR_CART:
      return initialState;
    default:
      return state;
  }
};