import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import './App.css';
import { connect } from 'react-redux';

import HomePage from './pages/homepage/homepage.component.jsx';
import './pages/homepage/homepage.style.scss';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInUpPage from './pages/sign-in-up/sign-in-up.component.jsx';
import Header from './components/header/header.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     currentUser: null
  //   }
  // }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {

      //if there is a userAuth object from google
      //running the createUserProfileDocument function returns the userRef
      //it creates the user in the /user collection if none exists in the database
      //if it exists, it simply returns the userRef
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //calling onSnapshot returns the snapShot of the userRef
        userRef.onSnapshot(snapShot => {
          // console.log(snapShot.data());
          //we don't need setState and currentUser key anymore as we can use the
          //action function setCurrentUser
          //which return an action object for redux to dispatch to reducers used by components

          // this.setState(
          //   {
          //     currentUser: 
          this.props.setCurrentUser(
              {
                id : snapShot.id,
                ...snapShot.data()
              }
          )
            // }
            // , () => {
            // console.log(this.state);
            // }
          // )
          // console.log(this.state);
        });
        
      } else {
        // this.setState({currentUser:userAuth}); //i.e. set to null if it does not exists
        this.props.setCurrentUser(userAuth);
      }
     });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route 
            exact 
            path='/signin' 
            render={() =>
            this.props.currentUser ? (
              <Redirect to ='/' />
            ) : (
              <SignInUpPage/>
            )
            }
          />
        </Switch>
      </div>
    );
  }
}
{/* <Route path='/signin' component={SignInUpPage} /> */}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
