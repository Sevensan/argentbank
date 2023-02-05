//components
import AccountList from "../components/AccountList"

import { useSelector } from "react-redux"

import { putProfile, postProfile } from "../utils/serviceAPI"

import { useState } from "react"
import { Navigate } from "react-router-dom"

function UserPage() {

  const [newFirstName, setFirstName] = useState('')
  const [newLastName, setLastName] = useState('')
  const userToken = useSelector((state) => state.token)
  const request = { Authorization: `Bearer ${userToken}` }

  if (userToken) {
    console.log("bon déjà la bonne nouvelle c'est qu'on a un token t'as capté : ")
    postProfile(request)
    .then((res) => {
      console.log("___POSTPROFILE : ", res)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  const editProfile = (e) => {
    e.preventDefault()
    console.log("firstname : ", newFirstName)
    console.log("lastname : ", newLastName)
    const user = {
      firstName: newFirstName,
      lastName: newLastName
    }
    putProfile(user, request)
    .then((response) => {
      console.log(response)
    })
  }

  return (
    <div>
      {!userToken && <Navigate to="/" />}
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome backzzz</h1>
          <form onSubmit={(e) => editProfile(e)}>
            <input type="text" placeholder="Tony" onChange={(e) => setFirstName(e.target.value)}/>
            <input type="text" placeholder="Jarvis" onChange={(e) => setLastName(e.target.value)}/>
            <button className="edit-button" type="submit">Edit Name</button>
          </form>
        </div>
        <AccountList />
      </main>
    </div>
  )
}

export default UserPage