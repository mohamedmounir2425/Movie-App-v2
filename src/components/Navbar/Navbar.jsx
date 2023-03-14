/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import { NavLink, useNavigate } from 'react-router-dom'
import { fireLogin } from '../../Store/slices/loginSlice';
import jwtDecode from "jwt-decode";
// import style from './Navbar.module.css'
import './Navbar.css'


export default function Navbar(props) {

  	let dispatch = useDispatch();
    let [userName, setUserName] = useState("");
    const { isLogin } = useSelector((state) => state.loginSlice);
    const navigate = useNavigate()

  	let logOut = () => {
      dispatch(fireLogin(false));
      localStorage.removeItem("token");
      navigate("/login");
    };
useEffect(() => {
		
		if (localStorage.getItem('token')) {
			
			let userData = jwtDecode(localStorage.getItem('token'))
			console.log(userData)
		
		setUserName(userData.first_name)
			console.log(userName)
			
	}
	})
  return (
    <>
      <nav className="navbar navbar-expand-lg  navbar-dark shadow">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to={"/"}>
            {!isLogin ?     <h2>Noxe</h2>:<p className=" m-0 ms-2 text-white fw-semibold">Hello {userName}</p> }
					
        
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto m-2 mb-lg-0">
              {!props.auth ? (
                <>
                  {" "}
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/"}>
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"movies"}>
                      Movies
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"tv"}>
                      Tv Show
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"people"}>
                      People
                    </NavLink>
                  </li>
                  {/* <li className="nav-item">
                    <NavLink className="nav-link" to={"about"}>
                      About
                    </NavLink>
                  </li>
                  */}
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav ms-auto m-2 mb-lg-0">
              {props.auth ? (
                <>
                  {" "}
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/login"}>
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/register"}>
                      Sign Up
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink onClick={logOut} className="nav-link text-danger fw-semibold" to={"/login"}>
                    Logout
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

