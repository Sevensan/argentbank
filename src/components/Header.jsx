import { NavLink } from 'react-router-dom'
import argentBankLogo from '../assets/argentBankLogo.png'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core"
import { faUser, faCircle } from "@fortawesome/free-solid-svg-icons"

// add fontawesome icons
library.add(faUser)
library.add(faCircle)

function Header() {
  const token = useSelector((state) => state.token)
  const firstName = useSelector((state) => state.firstName)
  const dispatch = useDispatch()
  const logOut = (e) => {
	dispatch({type: "logOut"})
  }
	return (
		<nav className="main-nav">
			<NavLink to="/" className="main-nav-logo yapatoken">
				<img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
				<h1 className="sr-only">Argent Bank</h1>
			</NavLink>
			<div>
			{token && (
				<NavLink to="/profile" className="main-nav-item nav-userName">
					<FontAwesomeIcon icon="user" />
					{firstName}
				</NavLink>
			)}
				{token ? (
					<NavLink to="/"	className="main-nav-item nav-sign-btn" onClick={(e) => logOut(e)}>
						<FontAwesomeIcon icon="circle" color="red" />
						Sign out
					</NavLink>
				) : (
					<NavLink to="/login" className="main-nav-item nav-sign-btn">
					  <FontAwesomeIcon icon="circle" color="green" />
						Sign In
					</NavLink>
				)}
			</div>
		</nav>
	)
}

export default Header