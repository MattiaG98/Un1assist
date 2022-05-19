import React from 'react';
import { useState, useContext } from 'react';

import {posts} from "../data"
import { Link } from "react-router-dom";

import Card from "../components/Card"
import Footer from '../components/Footer'
import Products from "../components/Products";
import Slider from "../components/Slider";


const Home = () => {

    const { searchedText, setSearchedText } = useState('');

    const updateSearchedText = (value) => {
        setSearchedText(value);
    }

    return (
        <>
        <div className="background-blurred"></div>
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
                        <Link className="bookmark" to="SignUp">
                            <button className="bookmark">REGISTRAZIONE</button>
                        </Link>
                        <br></br>
                        <br></br>
                        <button className="bookmark">AUTOMAZIONE</button>
                        <br></br>
                        <br></br>
                        <button className="bookmark">CAZZEGGIO</button>
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
