// checklist for login component
// 1. make a form and send request to the server -  DONE
// 2. hook up to a user context system

import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logging in...')


        fetch('api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "Email": email, "Password": password })
        }).then((res) => {
            if (res.ok) {
                console.log('Login successful');
                return res.json(); // Parse response as JSON
            } else {
                res.json().then((data) => {
                    console.log('Login failed:', data.message); // Log the error message
                });
            }
        }).catch((err) => {
            console.error('Error:', err); // Log network or server errors
        });

        setEmail('')
        setPassword('')
    }


    return ( 
        <div className="login-page">
            <form className="login-form"  onSubmit={handleSubmit}>
                <h1 className="title">Login Page</h1>

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
                    <label htmlFor="password"> Password: </label>
                    <input 
                        type="password" 
                        name="password" 
                        value = {password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="btn-group">
                    <Link to='/signup'> Create a new account </Link>
                    <button type="submit"> Login </button>
                </div>
            </form>
        </div>
     );
}
 
export default Login;