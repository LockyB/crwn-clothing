import React from 'react';

import './sign-in-up.style.scss'
import SignIn from '../../components/sign-in/sign-in.component.jsx';
import SignUp from '../../components/sign-up/sign-up.component.jsx';

const SignInUpPage = () => (
  <div className='sign-in-up'>
    <SignIn />
    <SignUp />
  </div>
)

export default SignInUpPage;