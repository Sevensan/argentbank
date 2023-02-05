import { NavLink } from 'react-router-dom'
import argentBankLogo from '../assets/argentBankLogo.png'
import { useSelector, useDispatch } from 'react-redux'

function Header() {
  const token = useSelector((state) => {
	console.log("TOKEN : ", state.token)
	return state.token
  })
  const dispatch = useDispatch()
  const logOut = (e) => {
	console.log("log out", e)
	dispatch({type: "logOut"})
  }
	return (
		<nav className="main-nav">
			{token ? (
				<div className="main-nav-logo yatoken">
					<img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
					<h1 className="sr-only">Argent Bank</h1>
				</div>
			) : (
				<NavLink to="/" className="main-nav-logo yapatoken">
					<img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
					<h1 className="sr-only">Argent Bank</h1>
				</NavLink>
			)}
			<div>
				{token ? (
					<NavLink to="/"	className="main-nav-item" onClick={(e) => logOut(e)}>
						<i className="fa fa-user-circle"></i>
						Sign out
					</NavLink>
				) : (
					<NavLink to="/login" className="main-nav-item">
						<i className="fa fa-user-circle"></i>
						Sign In
					</NavLink>
				)}
			</div>
		</nav>
	)
}

export default Header