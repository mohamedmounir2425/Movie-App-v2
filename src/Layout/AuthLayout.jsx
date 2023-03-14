import React, { Component } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Home from "../components/Home/Home";
export default class AuthLayout extends Component {
	render() {
		return (
			<>
				<Navbar auth={true} />

				<div className="w-50 mx-auto">
					<Outlet />
				</div>
			</>
		);
	}
}
