import produce from "immer"
import { configureStore } from "@reduxjs/toolkit"

//state
const initialState = {
  email: '',
  password: '',
  token: '',
  remember: false,
  firstName: '',
  lastName: '',
}

// action
export const logUser = (token) => ({
  type: "logUser",
  payload: token
})

export const getUser = (token) => ({
  type: "getUser",
  payload: token
})

export const logOut = () => ({
  type: "logOut"
})

export const editProfile = (user) => ({
  type: "editProfile",
  payload: user
})

// reducer
function reducer(state = initialState, action) {
  if (action.type === "logUser") {
    return produce(state, (draft) => {
      draft.email = action.payload.email
      draft.password = action.payload.password
      draft.token = action.payload.token
      draft.remember = action.payload.remember
      draft.firstName = action.payload.firstName
      draft.lastName = action.payload.lastName
    })
  }

  if (action.type === "getUser") {
    console.log("GET USER")
  }

  if (action.type === "editProfile") {
    return produce(state, (draft) => {
      draft.firstName = action.payload.firstName
      draft.lastName = action.payload.lastName
    })
  }

  if (action.type === "logOut") {
    return produce(state, (draft) => {
      draft.email = ''
      draft.password = ''
      draft.token = ''
      draft.remember = false
      draft.firstName = ''
      draft.lastName = ''
    })
  }
    return state
}


const store = configureStore({ reducer })
export {store}

store.subscribe(() => {
  console.log("nouveau state")
  console.log(store.getState())
})