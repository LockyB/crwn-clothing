import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

//note that payload is an optional property, fot toggle, we don't need to as we just use !state.hidden