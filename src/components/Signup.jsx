// checklist for singup component
// 1. make a form and send request to the server
// 2. hook up to a user context system

import { useState } from "react";
import { Link } from "react-router-dom";



const Signup = () => {

    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Registering")
    }

    return ( 
        <div className="login-page">
            <form className="login-form"  onSubmit={handleSubmit}>
                <h1 className="title"> Signup Page</h1>

                <div className="label-group">
                    <label htmlFor="email"> Email: </label>
                    <input 
                        type="email" 
                        name="email" 
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="label-group">
                    <label htmlFor="email"> Confirm Email: </label>
                    <input 
                        type="email" 
                        name="email" 
                        value = {confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                    />
                </div>

                <div className="label-group">
                    <label htmlFor="password"> Password: </label>
                    <input 
                        type="password" 
                        name="password" 
                        value = {password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="label-group">
                    <label htmlFor="password"> Confirm Password: </label>
                    <input 
                        type="password" 
                        name="password" 
                        value = {confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div className="btn-group">
                    <Link to='/login'> Login </Link>
                    <button type="submit"> Sign Up </button>
                </div>
            </form>
        </div>
     );
}
 
export default Signup;