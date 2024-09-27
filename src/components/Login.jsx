// checklist for login component
// 1. make a form and send request to the server -  DONE
// 2. hook up to a user context system

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {user, putUser} = useContext(UserContext)

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
            console.log(res)
            if(res.ok){
                console.log('Login successful')
                console.log("Validating ... ")
                validate()
                navigate('/')
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
    
    const validate = async () => {
        fetch('/api/validate', {
            method: "GET"
        }).then((res) => {
            if (res.ok) {
                console.log("Chillin.")
                return res.json()
            } else {
                console.log("not chillin.")
                throw new Error("Validation Failed.")
            }
        }).then((data) => {
            console.log(data)
            // save user from data.message
            putUser(data.message)
        }).catch( (error) => {
            console.log(error)
        })
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