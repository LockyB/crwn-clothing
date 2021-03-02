
//we take the current cartItems, and if it exits, we group them under the same group
export const addItemToCart = (cartItems, cartItemToAdd) => {
  
  //we first check if an item already existed in the whole cart
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  //if it does exists in it, we create a *new* array
  //by mapping through the original cartItems
  //if the item to add is the same as the one that is "scanned"
  //we return the cartItem and add to the quantity
  //if it doesn't match, i.e. it exists elsewhere in the cart,
  //it just returns that item as is
  if (existingCartItem) {
    return cartItems.map(cartItem => 
      cartItem.id === cartItemToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + 1}
      : cartItem
      );
  }

  //if it doesn't exists, we return the current cart plus the new cart item
  //and initialise the quantity to 1
  return [...cartItems, { ...cartItemToAdd, quantity: 1}];
};

//removing the item from cart
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  
  //we first check if an item already existed in the whole cart
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  );

  //if the quantity is at 1, we return the cartItems
  //WITHOUT the item that should be removed
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  }

  //otherwise, i.e. the quantity is more than 1
  //it will return the cartItems, but with the matched item quantity reduced by 1
  return cartItems.map(cartItem => 
    cartItem.id === cartItemToRemove.id? 
    { ...cartItem, quantity: cartItem.quantity - 1}
    : cartItem
    );
};