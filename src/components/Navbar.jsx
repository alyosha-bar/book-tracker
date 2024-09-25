import { Link } from "react-router-dom";

const Navbar = () => {

    const user = null;

    return ( 
        <nav className='navbar'>
            <h2 className="logo"> Book Tracker </h2>

            {user ? 
                <div className='links'> 
                    <Link to='/'> Home </Link>
                    <Link to='/dashboard'> Dashboard </Link>
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