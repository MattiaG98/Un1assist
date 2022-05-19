import { Link } from "react-router-dom";
import logo from "../img/logo_ext.png";

const Navbar = ({ userContext, onClickLogout }) => {

  console.log("USERCONTEXT NAVBAR: " + JSON.stringify(userContext));

  let onClickHamburger = (element) => {
    if(element.currentTarget.classList.contains('active')){
      element.currentTarget.classList.remove('active');
    }
    else{
      element.currentTarget.classList.add('active');
    }
  }

  return (
    <>
      <div className="navbar">
        <span className="hamburger_menu">
          <div id="hamburger-menu" className="hamburger-menu" onClick={onClickHamburger}>
              <span></span>
              <span></span>
              <span></span>
          </div>
        </span>
        <span className="logo">
          <Link className="link" to="/">
            <img src={logo} width="150dp" height="50dp"></img>
          </Link>
        </span>
        {userContext.token ? (
          <ul className="list">
            <li className="listItem">
            </li>
            <li className="listItem">{userContext.details?.username || ""}</li>
            <li className="listItem" onClick={onClickLogout}>
              Logout
            </li>
          </ul>
        ) : (
          <Link className="link" to="login" >
            Login
          </Link>
        )}
      </div>
      <div className="navbarBlueBar"></div>
    </>
  );
};

export default Navbar;
