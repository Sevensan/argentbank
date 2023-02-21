//components
import AccountList from "../components/AccountList"

import { useSelector } from "react-redux"

import { putProfile } from "../utils/serviceAPI"

import { useState } from "react"
import { Navigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import { editProfile } from "../utils/store"

function UserPage() {
  const dispatch = useDispatch()
  const [newFirstName, setFirstName] = useState('')
  const [newLastName, setLastName] = useState('')
  const userToken = useSelector((state) => state.token)
  const request = { Authorization: `Bearer ${userToken}` }
  const firstName = useSelector((state) => state.firstName)
  const lastName = useSelector((state) => state.lastName)
  const [isEditing, setEditing] = useState(false)

  const submitProfile = (e) => {
    const user = {
      firstName: newFirstName,
      lastName: newLastName
    }
    e.preventDefault()
    putProfile(user, request)
    .then((response) => {
      if(response.status === 200){
        dispatch(editProfile(user))
      }
      setEditing(false)
    })
  }

  return (
    <div>
      {!userToken && <Navigate to="/" />}
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{`${firstName} ${lastName}`}</h1>
          <button className="edit-button" onClick={() => {setEditing(true)}}>Edit Name</button>
          { isEditing &&
            <form id="formUserPage" onSubmit={(e) => submitProfile(e)}>
              <div className="input-wrapper">
                <label htmlFor="firstname">Firstname</label>
                <input type="text" id="firstname" placeholder={firstName} onChange={(e) => setFirstName(e.target.value)}/>
              </div>
              <div className="input-wrapper">
                <label htmlFor="lastname">Lastname</label>
                <input type="text" id="lastname" placeholder={lastName} onChange={(e) => setLastName(e.target.value)}/>
              </div>
              <div className="input-wrapper flex-row">
                <button className="edit-button" type="submit">SAVE</button>
                <button className="edit-button" onClick={() => {setEditing(false)}}>CANCEL</button>
              </div>
            </form>
          }
        </div>
        <AccountList />
      </main>
    </div>
  )
}

export default UserPage