import React from "react";
import "../Styles/signup.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../authContext";
function SignUp() {
  const {createUser}=useAuthValue();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const handleSignUp = (e) => {
    e.preventDefault();

    // storing user's data
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    // creating user
    createUser(data);
    // if user created redirect to corresponding page
    navigate("/signin");
  }
  return (
    <div className="RegisterPage_formContainer__pZjkV">
      <form className="RegisterPage_form__9iStY"
        onSubmit={handleSignUp}
      >
        <h2 className="RegisterPage_loginTitle__yDSMN">Sign Up</h2>
        <input type="text" name="name" placeholder="Enter Name" className="RegisterPage_loginInput__g4P8X" ref={nameRef} />
        <input type="email" name="email" className="RegisterPage_loginInput__g4P8X" placeholder="Enter Email" ref={emailRef} />
        <input type="password" name="password" className="RegisterPage_loginInput__g4P8X" placeholder="Enter Password" ref={passwordRef} />
        <button className="RegisterPage_loginBtn__nZ4vp" >Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
