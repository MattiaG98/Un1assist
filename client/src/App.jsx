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

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5001/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <div className='entirePage'>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/post/:id"
            element={user ? <Post /> : <Navigate to="/login" />}
          />
          <Route
            path="/DocumentsUpload"
            element={user ? <Navigate to="/DocumentsUpload"/> : <DocumentsUpload />}
          />
          <Route
            path="/SignUp"
            element={user ? <Navigate to="/SignUp"/> : <SignUp />}
          />
          <Route 
            path="/ProductList"
            element={user ? <Navigate to="/ProductList"/> : <ProductList />}
          />
          <Route 
            path="/Product/:id"
            element={user ? <Navigate to="/Product"/> : <Product />}
          />
          <Route 
            path="/Cart"
            element={user ? <Navigate to="/Cart"/> : <Cart />}
          />
          <Route 
            path="/Success"
            element={user ? <Navigate to="/Success"/> : <Success />}
          />
        </Routes>
      </div>
    </BrowserRouter>

  );
};

export default App;
