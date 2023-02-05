import { useState } from 'react'
import { postLogin } from '../utils/serviceAPI'
import { useDispatch, useSelector } from 'react-redux'
import { logUser } from '../utils/store'
import { useNavigate } from 'react-router-dom'

function Form() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state) => state.token)
  const user = {}
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [remember, setRemember] = useState(false)
  const login = (e) => {
    e.preventDefault()
	user.email = userName
	user.password = password
	user.remember = remember
    postLogin(user)
    .then((response) => {
		console.log("--- REPONSE : ", response)
      if(response.status === 200) {
		  user.token = response.data.body.token
		  console.log("--- USER : ", user)
		  dispatch(logUser(user))
		  navigate("/user")
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
				{token === '' && <span>erreur ici</span>}
			</form>
		</div>
	)
}

export default Form;