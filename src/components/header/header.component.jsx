import React from 'react';
import { Link } from 'react-router-dom';

import './header.style.scss';
import { ReactComponent as Logo} from '../../assets/crown.svg'
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';

const Header = ({currentUser, hidden}) => (
  <div className='header'>
    <Link className='logo-container' to="/">
      <Logo className='logo'/>
    </Link>
    <div className='options'>
      <Link className='option' to="/shop">
        SHOP
      </Link>
      <Link className='option' to="/contact">
        CONTACT
      </Link>
      {
        currentUser ?
        <div className='option' onClick={()=> auth.signOut()}>SIGN OUT</div>
        :<Link className='option' to='/signin'>Sign in</Link>
      }
      <CartIcon />
    </div>
    { 
      hidden ? null :
      <CartDropdown />
    }
  </div>
)

//destructure with nested value
const mapStateToProps = ({user: { currentUser }, cart: { hidden }}) => ({
  // currentUser: currentUser, same as
  currentUser,
  hidden
})

export default connect(mapStateToProps)(Header);