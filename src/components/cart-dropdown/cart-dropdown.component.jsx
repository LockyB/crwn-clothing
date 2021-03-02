import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import { withRouter } from 'react-router-dom';

import './cart-dropdown.style.scss';

const CartDropdown = ({cartItems, history, dispatch}) => (
  <div className='cart-dropdown'>

    {cartItems.length ? (
      <div className='scroll-container'>
        <div className='cart-items'>
          {
            cartItems.map(cartItem => 
              <CartItem key={cartItem.id} item={cartItem}/>
            )
          }
        </div>
      </div>
    ) : (
        <span className ='empty-message'>Your cart is empty</span>
        )
    }
      <CustomButton onClick={() => 
        {
          history.push('/checkout');
          dispatch(toggleCartHidden());
        }
      }>
      GO TO CHECK OUT
      </CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems : selectCartItems
});

//our withRouter can do this because connect returns a component
//the order matters because it eval from inside out
//i.e. the connect component modifies the component with access to store
//and then this component will then be used to route 
export default withRouter(connect(mapStateToProps)(CartDropdown));