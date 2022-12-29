import { Avatar } from "antd";
import { Link } from "react-router-dom";

import icon from "./../images/cryptocurrency.png";
import "./navbar.css";
const NavBar = () => {
	return (
		<div className="nav-cointainer">
			<nav className="vertical-menu-wrapper">
				<div className="vertical-menu-logo">
					<img src={icon} alt="icon" />
					<h2>Cryptoverse</h2>
				</div>
				<ul className="vertical-menu">
					<li>
						<Link to={"/"}>Home</Link>
					</li>
					<li>
						<Link to={"/cryptocurrences"}>Cryptocurrences</Link>
					</li>
					<li>
						<Link to={"/exchanges"}>Exchanges</Link>
					</li>
					<li>
						<Link to={"/crypto/:coinId"}>News</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};
export default NavBar;
