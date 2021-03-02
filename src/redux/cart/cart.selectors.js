import { createSelector } from 'reselect';

//input selector, get a whole state and just return a slice of the concerned state
const selectCart = state => state.cart;

// const selectUser = state => state.user;

//output selector -i.e. which 
//param1 - our input select, in a array form (for multiple selectors in other cases)
//param2 - a function that returns the value/prop we need from the selector

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) => 
      accumulatedQuantity + cartItem.quantity * cartItem.price
      , 0
    )
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) => 
      accumulatedQuantity + cartItem.quantity
      , 0
    )
);