//we set actions as a function that returns an object so our reducers can read it
export const setCurrentUser = user => ({
  type: 'SET_CURRENT_USER',
  payload: user
})