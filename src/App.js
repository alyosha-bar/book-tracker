import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { useContext, useEffect } from 'react';
import { UserContext } from './contexts/userContext';


// check for authorisation token and set user

function App() {

  const {user, putUser} = useContext(UserContext)

  useEffect( () => {
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

    validate()
  }, [])


  return (
    <div className="App">
      <Router>

        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
