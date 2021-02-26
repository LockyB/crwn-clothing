import React from 'react';

import './sign-in.style.scss';
import FormInput from '../form-input/form-input.component.jsx';
import CustomButton from '../custom-button/custom-button.component.jsx';

import {auth, signInWithGoogle } from '../../firebase/firebase.utils'

class SignIn extends React.Component{
  constructor() {
    super();

    this.state = {
      email:'',
      password:''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { email ,password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email,password)
      this.setState({email:'',password:''});
    } catch(error) {
      console.error('cannot sign in, invalid email/password',error);
    }
    // this.setState({email:'',password:''})
  }

  handleChange = event => {
    const { value, name } = event.target;
    //dynamically setting the property value depending on whether it is email or password
    this.setState({[name]:value});
  }

  render() {
    return(
      <div className='sign-in'>
        <h2 className='title'>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput 
            name="email" 
            type="email" 
            value={this.state.email}
            handleChange={this.handleChange}
            label="email"
            required
          />
          <FormInput 
            name="password" 
            type="password" 
            value={this.state.password} 
            handleChange={this.handleChange}
            label="password"
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'>SIGN IN</CustomButton>
            <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn>
              {' '}Sign in with Goggle{' '}
            </CustomButton>
          </div>
          
        </form>
      </div>
    )
  }
}

export default SignIn;