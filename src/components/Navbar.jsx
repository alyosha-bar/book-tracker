import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const Navbar = () => {

    const {user, putUser} = useContext(UserContext)
    

    const logout = () => {
        console.log("Loggin out.")
    }

    return ( 
        <nav className='navbar'>
            <h2 className="logo"> Book Tracker </h2>

            {user ? 
                <div className='links'> 
                    <Link to='/'> Home </Link>
                    <Link to='/dashboard'> Dashboard </Link>
                    <button onClick={logout}> Log Out </button>
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