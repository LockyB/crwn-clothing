import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';

import './cart-icon.style.scss';

//toggleCartHidden is initialised as a this.props.toggleCartHidden
//through the mapDispatchToProps function via connect
//i.e. the CartIcon actually access to a modified toggleCartHidden property
//although it has the same name, it is not the same function as defined in cart.actions;

const CartIcon = ({ toggleCartHidden , itemCount }) => {
  console.log('itemCount has changed'); //this will rerender only if itemCount changes
  return (
  <div className='cart-icon' onClick={toggleCartHidden}>
    <ShoppingIcon className='shopping-icon'/>
    <span className='item-count'>{itemCount}</span>
  </div>)
};

//toggle show or hide of dropdown
const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

//getting the number of items
//it works but it gets called everytime when the WHOLE state is changed e.g. signin etc
//as it is a new computed value, immutable, thus all the mapStateToProps in the App
//that will get changed, and hence all the associated components will need to be rerender!
//we can use memoization, such as caching to check if the value is "same", then it won't pass those into 
//our props and react will notice there is no change to props therefore not rerender
//we can use a package called Reselect
//so instead of this
// const mapStateToProps = ({ cart: { cartItems }}) => ({
//   itemCount: cartItems.reduce(
//     (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
// })

//we use this, i.e. we pass the whole state in
// const mapStateToProps = state => {
//     console.log('mapStateToProps will always be called'); //this will still get rerender
//     return (
//       {
//         itemCount: selectCartItemsCount(state)
//       }
//     )
// };

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon);