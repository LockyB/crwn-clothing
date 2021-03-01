import UserActionTypes from './user.types';

//we set actions as a function that returns an object so our reducers can read it
export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
})