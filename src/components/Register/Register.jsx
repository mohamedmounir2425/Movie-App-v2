import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [errDetails, setErrDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [User, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: "",
  });

  let validation = () => {
    let rules = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(15).required(),
      last_name: Joi.string().alphanum().min(3).max(15).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      age: Joi.number().min(15).max(50).required(),
    });

    let validationResult = rules.validate(User, { abortEarly: false });
    console.log(validationResult)
    if (validationResult.error !== undefined) {
      setErrDetails(validationResult.error.details);
      return false;
    } else {
      setErrDetails([]);
      return true;
    }
  };

  function getForm({ target }) {
    setUser({
      ...User,
      [target.name]: target.value,
    });
  }

  let sendData = async (e) => {
    e.preventDefault();
    if (validation()) {
      setLoading(true);
      let { data } = await axios.post(
        "https://route-movies-api.vercel.app/signup",
        User
      );

      if (data.errors !== undefined) {
        setErrorMsg(data.errors.email.message);
        setLoading(false);
      } else {
        setLoading(false);
        setErrorMsg(data.message);
        navigate("/login");
      }
    } else {
      console.log("there is error");
    }
  };

 

   let showError = (errName) => {
     let error = errDetails.filter((err) => {
       return err.message.includes(errName);
     });

     if (error[0] !== undefined) {
       let msg = error[0].message;
       if (msg.includes("pattern")) {
         msg = "please enter right words";
       }
       return <p className="text-danger fw-semibold">{msg}</p>;
     } else {
       return "";
     }
   };


  return (
    <>
      <form className="myForm" onSubmit={sendData}>
        {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}
        <h1>Registeration Form </h1>
        <label htmlFor="first_name">First Name </label>
        <input
          onChange={getForm}
          type="text"
          className="form-control my-3"
          id="first_name"
          name="first_name"
        />
        {errDetails.length !== 0 ? showError("first_name") : ""}
        <label htmlFor="last_name">Last Name </label>
        <input
          onChange={getForm}
          type="text"
          className="form-control my-3"
          id="last_name"
          name="last_name"
        />
        {errDetails.length !== 0 ? showError("last_name") : ""}
        <label htmlFor="email">E Mail </label>
        <input
          onChange={getForm}
          type="text"
          className="form-control my-3"
          id="email"
          name="email"
        />
        {errDetails.length !== 0 ? showError("email") : ""}
        <label htmlFor="password">Passsword </label>
        <input
          onChange={getForm}
          type="password"
          className="form-control my-3"
          id="password"
          name="password"
        />
        {errDetails.length !== 0 ? showError("password") : ""}
        <label htmlFor="age">Age </label>
        <input
          onChange={getForm}
          type="text"
          className="form-control my-3"
          id="age"
          name="age"
        />
        {errDetails.length !== 0 ? showError("age") : ""}
        <button className="btn btn-primary float-end">
          {!loading ? "sign up" : <i className="fas fa-spinner fa-spin"></i>}
        </button>
      </form>
    </>
  );
}
