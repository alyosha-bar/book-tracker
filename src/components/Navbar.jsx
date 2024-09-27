import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import Cookies from 'universal-cookie'

const Navbar = () => {

    const cookies = new Cookies()

    const {user, logout} = useContext(UserContext)
    
    const navigate = useNavigate()

    const logOut = () => {
        logout()
        // delete cookie
        cookies.remove('Authorization')
        navigate('/login')
    }

    return ( 
        <nav className='navbar'>
            <h2 className="logo"> Book Tracker </h2>

            {user ? 
                <div className='links'> 
                    <Link to='/'> Home </Link>
                    <Link to='/dashboard'> Dashboard </Link>
                    <button className="logout" onClick={logOut}> Log Out </button>
                </div>
             : <div className="links">
                    <Link to='/login'> Login </Link>
                    <Link to='/signup'> Signup </Link>
                </div>
            }
        </nav>
    );
}
 
export default Navbar;