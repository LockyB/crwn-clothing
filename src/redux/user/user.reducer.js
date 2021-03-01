//our reducer needs to know two things from action
//one is the type of the action
//another is the payload that should be associated with the action

const INITIAL_STATE = {
  currentUser : null
}

//we set initial state, as when it is first fired, there is no user triggered action
//we use switch to check which type of action it is and what state needs to be changed with the payload
//we can also use 'if' but switch is likely easier to read and used
const userReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case 'SET_CURRENT_USER':
      return {
        ... state,
        currentUser: action.payload
      }
    default:
      return state;
  }
}

export default userReducer;
