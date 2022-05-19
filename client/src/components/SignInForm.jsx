import axios from 'axios';
import { useState, useContext } from 'react';
import Alert from '@mui/material/Alert';
import { Navigate } from 'react-router-dom';
import { UserContext } from "../context/UserContext";

 
export default function SignInForm() {
 
  // States for registration
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 
  // States for checking the errors
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  // Redirect state
  const [redirect, setRedirect] = useState(null);
  const [userContext, setUserContext] = useContext(UserContext)
  // Handling the username change
  const handleUsername = (e) => {
    setUsername(e.target.value);
    setSubmitting(false);
  };
 
  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitting(false);
  };
 
  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const genericErrorMessage = "Something went wrong! Please try again later."

    let body = {
        username: username,
        password: password
    }
    axios.post("http://localhost:5001/api/user/login", body, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
            "Content-Type": "application/json",
        },
    }).then(async res => {
        setSubmitting(false)
        if (!res.status === 200) {
          if (res.status === 400) {
            setError("Please fill all the fields correctly!")
          } else if (res.status === 401) {
            setError("Invalid username and password combination.")
          } else {
            setError(genericErrorMessage)
          }
        } else {
          const data = await res.data;
          setUserContext(oldValues => {
            return { ...oldValues, token: data.token }
          })
          setRedirect(true);
        }
      })
      .catch(error => {
        setSubmitting(false);
        setError(genericErrorMessage);
      })
    };
 
 /*  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitting ? '' : 'none',
        }}>
        <h1>User {username} successfully registered!!</h1>
      </div>
    );
  };
 
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div 
        className='alert'
        style={{
        display: error ? '' : 'none',
      }}>
        <Alert severity="error">Please check if username and password are correct and retry</Alert>
      </div>
    );
  }; */

  return (
    <div className="form">
      <div>
        <h1>User Login</h1>
      </div>
 
      {/* Calling to the methods */}
      {/* <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div> */}

      {
        redirect ? <Navigate to={"/"}/> : <></>
      }
 
      <form>
        {/* Labels and inputs for form data */}
 
        <label className="label">Username</label>
        <input onChange={handleUsername} id="username" placeholder="Username" className="input"
          value={username} type="username" />
 
        <label className="label">Password</label>
        <input onChange={handlePassword} id="password" placeholder="Password" className="input"
          value={password} type="password" />
 
        <button onClick={handleSubmit} disabled={submitting} text={`${submitting ? "Signing In" : "Sign In"}`} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}