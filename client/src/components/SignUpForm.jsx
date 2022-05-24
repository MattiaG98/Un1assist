import axios from 'axios';
import { useState, useContext } from 'react';
import Alert from '@mui/material/Alert';
import { Navigate } from 'react-router-dom';
import { UserContext } from "../context/UserContext"
 
export default function Form() {
 
  // States for registration
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
 
  // States for checking the errors
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  // Redirect state
  const [redirect, setRedirect] = useState(null);
  const [userContext, setUserContext] = useContext(UserContext)
  // Handling the name change
  const handleUsername = (e) => {
    if (!containsSpecialChars(e.target.value)){
      setUsername(e.target.value);
      setSubmitting(false);
    } else{
      setTimeout(()=> alert("Special characters not allowed"), 200);
    }
    
  };
 
  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitting(false);
  };

  // Handling the email change
  const handleFirstname = (e) => {
    if (!containsSpecialChars(e.target.value)){
      setFirstname(e.target.value);
      setSubmitting(false);
    } else{
      setTimeout(()=> alert("Special characters not allowed"), 200);
    }
  };

  // Handling the email change
  const handleLastname = (e) => {
    if (!containsSpecialChars(e.target.value)){
      setLastname(e.target.value);
      setSubmitting(false);
    } else{
      setTimeout(()=> alert("Special characters not allowed"), 200);
    }
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
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password
    }
    axios.post("http://localhost:5001/api/user/signup", body, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
            "Content-Type": "application/json",
        },
    }).then(async response => {
      setSubmitting(false)
      if (!response.status === 200) {
        if (response.status === 400) {
          setError("Please fill all the fields correctly!")
        } else if (response.status === 401) {
          setError("Invalid email and password combination.")
        } else if (response.status === 500) {
          console.log(response)
          const data = await response.json()
          if (data.message) setError(data.message || genericErrorMessage)
        } else {
          setError(genericErrorMessage)
        }
      } else {
        const data = await response.data;
        setUserContext(oldValues => {
          return { ...oldValues, token: data.token }
        })
        setRedirect(true);
      }
    })
    .catch(error => {
      setSubmitting(false)
      setError(genericErrorMessage)
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

  function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }
 
  return (
    <div className="form">
      <div>
        <h1>User Registration</h1>
      </div>

 
      {/* Calling to the methods */}
      {/* <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div> */}

      {
        redirect ? <Navigate to={"/"}/> : <></>
      }
 
      <form className="formSignUp">
        {/* Labels and inputs for form data */}
        <label className="label">Username</label>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input onChange={handleUsername} id="username" placeholder="Username" className="inputText"
          value={username} type="text" />
        <br>
        </br>
        <br>
        </br>
        <label className="label">Email</label>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input onChange={handleEmail} id="email" placeholder="Email" className="inputText"
          value={email} type="email" />
        <br>
        </br>
        <br>
        </br>
        <label className="label">First Name</label>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input onChange={handleFirstname} id="firstname" placeholder="First Name" className="inputText"
          value={firstname} type="text" />
        <br>
        </br>
        <br>
        </br>
        <label className="label">Last Name</label>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input onChange={handleLastname} id="lastname" placeholder="Last Name" className="inputText"
          value={lastname} type="text" />
 <br>
        </br>
        <br>
        </br>
        <label className="label">Password</label>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input onChange={handlePassword} id="password" placeholder="Password" className="inputText"
          value={password} type="password" />
 <br>
        </br>
        <br>
        </br>
        <button onClick={handleSubmit} disabled={isSubmitting} text={`${isSubmitting ? "Signing Up" : "Sign Up"}`} className="btnSignUp" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}