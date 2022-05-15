import axios from 'axios';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import { Navigate } from 'react-router-dom';
 
export default function Form() {
 
  // States for registration
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Redirect state
  const [redirect, setRedirect] = useState(null);

  // Handling the name change
  const handleUsername = (e) => {
    setUsername(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === '' || email === '' || password === '') {
        setError(true);
    } else {
        let body = {
          username: username,
          email: email,
          password: password
        }
        axios.post("http://localhost:5001/api/auth/signup", body, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
                "Content-Type": "application/json",
            },
        }).then((res)=>{
          if (res.data === "OK") {
            setError(false);
            setSubmitted(true);
          } else if (res.data === "ALREADYEXISTS") {
            setError(true);
          } else {
            setError(true)
          }
        });
        setSubmitted(true);
        setError(false);
    }
  };
 
  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
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
  };
 
  return (
    <div className="form">
      <div>
        <h1>User Registration</h1>
      </div>
 
      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      {
        redirect ? <Navigate to={redirect}/> : <></>
      }
 
      <form>
        {/* Labels and inputs for form data */}
        <label className="label">Username</label>
        <input onChange={handleUsername} className="input"
          value={username} type="text" />
 
        <label className="label">Email</label>
        <input onChange={handleEmail} className="input"
          value={email} type="email" />
 
        <label className="label">Password</label>
        <input onChange={handlePassword} className="input"
          value={password} type="password" />
 
        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}