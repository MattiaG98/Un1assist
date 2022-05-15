import Google from "../img/google.png";
import Facebook from "../img/facebook.png";
import Github from "../img/github.png";
import SignUpForm from "../components/SignUpForm.jsx";

const SignUp = () => {
  const google = () => {
    window.open("http://localhost:5001/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:5001/auth/github", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:5001/auth/facebook", "_self");
  };

  return (
    <div className="signUp">
      <SignUpForm/>
    </div>
  );
};

export default SignUp;
