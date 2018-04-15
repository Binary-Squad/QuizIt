import React from "react";
import Logout from "../Logout";
import Logo from "../Logo";
import "./Navbar.css";

const Navbar = props => (
	
	<nav id="customNavbar" className="navbar navbar-expand-lg navbar-dark bg-dark">
		{Logo}
		
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>

		<div className="collapse navbar-collapse pull-right" id="navbarSupportedContent">
			<ul className="navbar-nav mr-auto">
				<Logout loggedIn={props.loggedIn}> </Logout>
			</ul>
		</div> 
	</nav>

)

export default Navbar;
