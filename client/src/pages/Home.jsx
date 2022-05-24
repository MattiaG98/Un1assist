import React, { useEffect } from 'react';
import { useState, useContext } from 'react';

import {posts} from "../data"
import { Link } from "react-router-dom";

import Card from "../components/Card"
import Footer from '../components/Footer'
import Products from "../components/Products";
import Slider from "../components/Slider";


const Home = () => {

    const { searchedText, setSearchedText } = useState('');
    const { productsList, setProductsList } = useState([]);

    const updateSearchedText = (value) => {
        setSearchedText(value);
    }

    useEffect(() => {
        fetchProducts();
    })

    const fetchProducts = () =>{
        fetch("http://localhost:5001/api/documents/getAllDocuments", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then(async response => {
            if (response.ok) {
                console.log("arrivati: " + JSON.stringify(response));
              } else {
                if (response.status === 401) {
                  // Edge case: when the token has expired.
                  // This could happen if the refreshToken calls have failed due to network error or
                  // User has had the tab open from previous day and tries to click on the Fetch button
                  console.log("porcodio");
                } else {
                  /*setUserContext(oldValues => {
                    return { ...oldValues, details: null }
                  })*/
                  console.log("porcodio2");
                }
            }
        });
    }

    return (
        <>
            <div className="home">
                {/* {posts.map(post=>(
                    <Card key={post.id} post={post}/>
                ))} */}
                <div className="central-section">
                    <div className="central-top-section">
                        <div className= "homepage_searchbar_container">
                            <input placeholder="Cerca tra documenti, video, quiz e altre risorse" className="homepage_searchbar" value="" onChange={updateSearchedText}></input>
                        </div>
                        <div className="bookmarks_container">
                            <Link className="link" to="DocumentsUpload">
                                <button className="bookmark">CARICA DOCUMENTO</button>
                            </Link>
                            <br></br>
                            <br></br>
                            <Link className="link" to="SignUp">
                                <button className="bookmark">REGISTRAZIONE</button>
                            </Link>
                            <br></br>
                            <br></br>
                            <button className="bookmark">LA MIA LIBRERIA</button>
                        </div>
                        {/*<Slider />*/}
                    </div>
                    {/*<Products/>*/}
                    <Footer/>
                </div>
            </div>
        </>
    );
};

export default Home;
