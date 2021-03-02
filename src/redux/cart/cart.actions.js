import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addCartItem = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});

export const clearCartItem = (item) => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item
});

export const removeCartItem = (item) => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item
});

//note that payload is an optional property, fot toggle, we don't need to as we just use !state.hidden