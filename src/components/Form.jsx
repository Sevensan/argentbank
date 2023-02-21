import { useState } from 'react'
import { postLogin, postProfile } from '../utils/serviceAPI'
import { useDispatch } from 'react-redux'
import { logUser } from '../utils/store'
import { useNavigate } from 'react-router-dom'

function Form() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = {}
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [remember, setRemember] = useState(false)
  const request = (token) => {
	return {Authorization: `Bearer ${token}`}
 }

  const login = (e) => {
    e.preventDefault()
	user.email = userName
	user.password = password
	user.remember = remember
    postLogin(user)
    .then((response) => {
      if(response.status === 200) {
		user.token = response.data.body.token
		postProfile(request(user.token)).then((res) => {
		  user.firstName = res.data.body.firstName
		  user.lastName = res.data.body.lastName
		  dispatch(logUser(user))
		  navigate("/profile")
		})
	  }
	})
	.catch((response) => {
      console.error(response)
	})
	}

	return (
		<div>
			<form onSubmit={(e) => login(e)}>
				<div className="input-wrapper">
					<label htmlFor="username">Username</label>
					<input type="emal" id="username" onChange={(e) => setUserName(e.target.value)}/>
				</div>
				<div className="input-wrapper">
					<label htmlFor="password">Password</label>
					<input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
				</div>
				<div className="input-remember">
					<input type="checkbox" id="remember-me" onChange={(e) => setRemember(e.target.value)} />
					<label htmlFor="remember-me">Remember me</label>
				</div>
				<button className="sign-in-button">Sign In</button>
				{user.token === '' && <span>erreur ici</span>}
			</form>
		</div>
	)
}

export default Form;