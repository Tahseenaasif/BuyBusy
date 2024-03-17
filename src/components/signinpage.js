import React from "react";
import "../Styles/sign.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../authContext";
function Signin() {
  const { signIn } = useAuthValue();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
 
  const handleLogin = (e) => {
    e.preventDefault();
    const loginPromise = new Promise(async (resolve, reject) => {
      try {
        const data = {
          email: emailRef.current.value,
          password: passwordRef.current.value
        };
        const response = await signIn(data);
        if (response) {
          resolve(response);
        } else {
          reject(new Error("Login failed")); 
        }
      } catch (error) {
        reject(error);
      }
    });
    loginPromise.then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };
  
  return (
    <div className="LoginPage_formContainer__heTJ-">
      <form className="LoginPage_form__h3Le9" onSubmit={handleLogin}>
        <h2 className="LoginPage_loginTitle__DtueA">Sign In</h2>
        <input
          type="email"
          name="email"
          className="LoginPage_loginInput__eewYx"
          placeholder="Enter Email"
          ref={emailRef}
        />
        <input
          type="password"
          name="password"
          className="LoginPage_loginInput__eewYx"
          placeholder="Enter Password"
          ref={passwordRef}
        />
        <button type="submit" className="LoginPage_loginBtn__8kGss">Sign In</button>
        <a
          className=""
          href="/signup"
          style={{
            textDecoration: "none",
            color: "rgb(34, 73, 87)",
            fontFamily: "Quicksand"
          }}
        >
          <p style={{ fontWeight: 600, margin: 0 }}>Or SignUp instead</p>
        </a>
      </form>
    </div>
  );
}

export default Signin;
