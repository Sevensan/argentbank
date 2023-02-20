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
  const [firstName, setActualFirstName] = useState('')
  const [lastName, setActualLastName] = useState('')

  if (userToken) {
    console.log("bon déjà la bonne nouvelle c'est qu'on a un token t'as capté : ")
    postProfile(request)
    .then((res) => {
      console.log("___POSTPROFILE : ", res)
      if(!newFirstName || !newLastName){
        setActualFirstName(res.data.body.firstName)
        setActualLastName(res.data.body.lastName)
        console.log(firstName)
        console.log(lastName)
      }
    })
    .catch((err) => {
      console.error(err)
    })
  }

  const editProfile = (e) => {
    e.preventDefault()
    const user = {
      firstName: newFirstName,
      lastName: newLastName
    }
    console.log("user : ", user)
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
          <form id="formUserPage" onSubmit={(e) => editProfile(e)}>
            <div className="input-wrapper">
					    <label htmlFor="firstname">Firstname</label>
              <input type="text" id="firstname" placeholder={firstName} onChange={(e) => setFirstName(e.target.value)}/>
				    </div>
            <div className="input-wrapper">
					    <label htmlFor="lastname">Lastname</label>
              <input type="text" id="lastname" placeholder={lastName} onChange={(e) => setLastName(e.target.value)}/>
				    </div>
            <button className="edit-button" type="submit">SAVE</button>
          </form>
        </div>
        <AccountList />
      </main>
    </div>
  )
}

export default UserPage