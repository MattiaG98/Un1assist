import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const logout = () => {
    window.open("http://localhost:5001/auth/logout", "_self");
  };

  let onClickHamburger = (element) => {
    if(element.currentTarget.classList.contains('active')){
      element.currentTarget.classList.remove('active');
    }
    else{
      element.currentTarget.classList.add('active');
    }
  }

  return (
<<<<<<< Updated upstream
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          Lama App
        </Link>
      </span>
      {user ? (
        <ul className="list">
          <li className="listItem">
            <img
              src={user.photos[0].value}
              alt=""
              className="avatar"
            />
          </li>
          <li className="listItem">{user.displayName}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <Link className="link" to="login">
          Login
        </Link>
      )}
    </div>
=======
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
        {user ? (
          <ul className="list">
            <li className="listItem">
              <img
                src={user.photos[0].value}
                alt=""
                className="avatar"
              />
            </li>
            <li className="listItem">{user.displayName}</li>
            <li className="listItem" onClick={logout}>
              Logout
            </li>
          </ul>
        ) : (
          <Link className="link" to="login">
            Login
          </Link>
        )}
      </div>
      <div className="navbarBlueBar"></div>
    </>
>>>>>>> Stashed changes
  );
};

export default Navbar;
