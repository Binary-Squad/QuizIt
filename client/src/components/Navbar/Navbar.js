import React from "react";
import "./Navbar.css";

// const Navbar = props => (
// 	<nav>
// 		<ul className="zero-zero" id="customnavbar">
// 			{props.loggedIn ? <li className="text-white"><a href="/">Game</a></li> : ""}
// 			{props.loggedIn ? "" : <li className="text-white" onClick={()=>{props.registerPageLoad()}}><a href="/register">Register</a></li>}
// 			{props.loggedIn ? "" : <li className="text-white" onClick={()=>{props.loginPageLoad()}}><a href="/login">Login</a></li>}
// 			{props.loggedIn ? <li className="text-white" onClick={()=>{props.logOut()}}><a href="/logout">Logout</a></li> : ""}
// 		</ul>
// 	</nav>
// )

// <li className="text-white" ><a href="/dashboard">Dashboard</a></li>
// <li className="text-white" ><a href="/register">Register</a></li>
// <li className="text-white" ><a href="/login">Login</a></li>
// <li className="text-white" ><a href="/logout">Logout</a></li>

const Navbar = props => (
	<nav>
		<ul id="customnavbar">
			<li className="text-white" ><a href="/">Home</a></li>
			
		</ul>
	</nav>
)

export default Navbar;
