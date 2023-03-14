import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux";
import { fireLogin } from "../../Store/slices/loginSlice";

export default function Login(props) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errorDetails, setError] = useState([]);
  const [msg, setMsg] = useState("");
 const { isLogin } = useSelector((state) => state.loginSlice);
const [loading, setLoading] = useState(false);

 	let dispatch = useDispatch();
  

  function validateUser() {
    let rules = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });
    let validationResult = rules.validate(user, { abortEarly: false });

    if (validationResult.error !== undefined) {
      setError(validationResult.error.details);
      return false;
    } else {
      setError([]);
      return true;
    }
  }
  let navigateTo = useNavigate();

  async function Login() {
    if (validateUser()) {
       setLoading(true);
      let { data } = await axios.post(
        "https://route-movies-api.vercel.app/signin",
        user
      );

      // setMsg(data.errors.email.message)

      if (data.message === "success") {
         
        console.log(data);
        dispatch(fireLogin(true));
        localStorage.setItem("token", data.token);
        setMsg(data.message);
        navigateTo("/home");
      } else {
          setLoading(false);
        setMsg(data.message);
      }
    } else {
      console.log("there is error");
    }
  }

  function showError(errName) {
    let x = errorDetails.filter((err) => {
      return err.message.includes(errName);
    });
    if (x[0] !== undefined) {
      return <p className="text-danger">{x[0].message}</p>;
    } else {
      return "";
    }
  }

  return (
    <>
      <div className="container">
        <h1>Login Form</h1>
        <form
          className="myForm"
          onSubmit={(e) => {
            e.preventDefault();
            Login();
          }}
        >
          <label htmlFor="email">E-mail</label>
          <input
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            id="email"
            type="email"
            className="form-control mb-2"
          />

          {errorDetails.length != 0 ? showError("email") : ""}

          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            id="password"
            type="password"
            className="form-control mb-2"
          />

          {errorDetails.length != 0 ? showError("password") : ""}

          <button className="btn btn-primary float-end">
            {!loading ? "LogIn" : <i className="fas fa-spinner fa-spin"></i>}
          </button>
          {msg === "success" ? (
            <p className="fw-bold fs-5 text-success">{msg}</p>
          ) : (
            <p className="fw-bold fs-5 text-danger">{msg}</p>
          )}
        </form>
      </div>
    </>
  );
}
