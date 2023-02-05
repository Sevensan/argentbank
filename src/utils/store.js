import produce from "immer"
import { configureStore } from "@reduxjs/toolkit"

const initialState = {
  email: '',
  password: '',
  token: '',
  remember: false
}

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

function reducer(state = initialState, action) {
  if (action.type === "logUser") {
    console.log("ACTION : ", action)

    return produce(state, (draft) => {
      draft.email = action.payload.email
      draft.password = action.payload.password
      draft.token = action.payload.token
      draft.remember = action.payload.remember
    })
  }

  if (action.type === "getUser") {
    console.log("GET USER")
  }

  if (action.type === "logOut") {
    return produce(state, (draft) => {
      draft.email = ''
      draft.password = ''
      draft.token = ''
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