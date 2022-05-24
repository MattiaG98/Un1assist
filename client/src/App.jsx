import "./app.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DocumentsUpload from "./pages/DocumentsUpload";
import SignUp from "./pages/SignUp";
import Success from "./pages/Success";
import Cart from "./pages/Cart";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import { UserContext } from "./context/UserContext"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, useCallback, useContext } from "react";

const App = () => {
  const [userContext, setUserContext] = useContext(UserContext);

  const verifyUser = useCallback(() => {
    fetch("http://localhost:5001/api/user/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async response => {
      if (response.ok) {
        const data = await response.json()
        setUserContext(oldValues => {
          return { ...oldValues, token: data.token }
        })
      } else {
        setUserContext(oldValues => {
          return { ...oldValues, token: null }
        })
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000)
    })
  }, [setUserContext])

  const logout = () => {
    fetch("http://localhost:5001/api/user/logout", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer ${userContext.token}",
      },
    }).then(async response => {
      setUserContext(oldValues => {
        return { ...oldValues, details: undefined, token: null }
      })
      window.localStorage.setItem("logout", Date.now())
    })
  }

  const fetchUserDetails = useCallback(() => {
    fetch("http://localhost:5001/api/user/me", {
      method: "GET",
      credentials: "include",
      // Pass authentication token as bearer token in header
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async response => {
      if (response.ok) {
        const data = await response.json()
        setUserContext(oldValues => {
          return { ...oldValues, details: data }
        })
      } else {
        if (response.status === 401) {
          // Edge case: when the token has expired.
          // This could happen if the refreshToken calls have failed due to network error or
          // User has had the tab open from previous day and tries to click on the Fetch button
          window.location.reload()
        } else {
          setUserContext(oldValues => {
            return { ...oldValues, details: null }
          })
        }
      }
    })
  }, [setUserContext, userContext.token])

  useEffect(() => {
    verifyUser()
  }, [verifyUser])

  useEffect(() => {console.log(JSON.stringify(userContext));
    // fetch only when user details are not present
    if (userContext.token && !userContext.details) {
      fetchUserDetails();
    }
  }, [userContext.details, fetchUserDetails])

  return (
    <BrowserRouter>
      <div className='entirePage'>
        <Navbar userContext={userContext} onClickLogout = {logout}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login />}
          />
          {/* <Route
            path="/post/:id"
            element={user ? <Post /> : <Navigate to="/login" />}
          /> */}
          <Route
            path="/DocumentsUpload"
            element={<DocumentsUpload />}
          />
          <Route
            path="/SignUp"
            element={<SignUp />}
          />
          <Route 
            path="/ProductList"
            element={<ProductList />}
          />
          <Route 
            path="/Product/:id"
            element={<Product />}
          />
          <Route 
            path="/Cart"
            element={<Cart />}
          />
          <Route 
            path="/Success"
            element={<Success />}
          />
        </Routes>
      </div>
    </BrowserRouter>

  );
};

export default App;
