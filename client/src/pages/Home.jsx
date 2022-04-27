import Card from "../components/Card"
import {posts} from "../data"
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home">
            {/* {posts.map(post=>(
                <Card key={post.id} post={post}/>
            ))} */}
            <div className="central-section">
                <div className="central-top-section">
                    <div className= "homepage_searchbar_container">
                        <input placeholder="Cerca tra documenti, video, quiz e altre risorse" className="homepage_searchbar" value=""></input>
                    </div>
                    <div className="bookmarks_container">
                        <Link className="link" to="DocumentsUpload">
                            <button className="bookmark">CARICA DOCUMENTO</button>
                        </Link>
                        <br></br>
                        <br></br>
                        <button className="bookmark">GEOGRAFIA</button>
                        <br></br>
                        <br></br>
                        <button className="bookmark">AUTOMAZIONE</button>
                        <br></br>
                        <br></br>
                        <button className="bookmark">CAZZEGGIO</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
