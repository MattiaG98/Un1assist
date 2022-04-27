import Navbar from "./components/Navbar";
import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";
import DocumentsUpload from "./pages/DocumentsUpload";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
<<<<<<< Updated upstream
import { useEffect, useState } from "react";
=======
import { useEffect, useState } from 'react';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
      <div>
=======
      {/* <StripeProvider
        publishableKey="pk_test_51Kcw4wEaqE0gID0CFsc7J16ADrHO8qHFw1yu3u4dBYKkzOADF6Jb6JLVkf1L4vs5PYKch5Oe7BuMd5SpuAuJPgNo00qHob3M43"
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        merchantIdentifier="merchant.com.{{Un1Assist}}" // required for Apple Pay
      >
      </StripeProvider> */}
      <div className='entirePage'>
>>>>>>> Stashed changes
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
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
