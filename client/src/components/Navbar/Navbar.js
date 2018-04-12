import React from "react";
import Logout from "../Logout";
import "./Navbar.css";

const Navbar = props => (
	
	<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
		<a className="navbar-brand" href="/">
			QuizIt!
		</a>
		
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>

		<div className="collapse navbar-collapse pull-right" id="navbarSupportedContent">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item active text-right">
					<a className="nav-link" href="/register">Register </a>
				</li>
				<Logout loggedIn={props.loggedIn}> </Logout>
			</ul>
		</div>
	</nav>

)

export default Navbar;
