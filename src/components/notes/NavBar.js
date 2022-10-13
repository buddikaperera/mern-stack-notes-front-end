import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ setIsLoading }) => {
	const logoutSubmit = () => {
		localStorage.clear();
		setIsLoading(false);
	};
	return (
		<header>
			<div className="logo">
				<h1>
					<Link to="/"> Dev Notes</Link>
				</h1>
			</div>
			<ul>
				<li>
					<Link to="/"> Home</Link>
				</li>
				<li>
					<Link to="/create"> Create Note</Link>
					<li>
						{setIsLoading ? (
							<Link onClick={logoutSubmit} to="/">
								{' '}
								Logout
							</Link>
						) : (
							<Link to="/"> Login</Link>
						)}
					</li>
				</li>
			</ul>
		</header>
	);
};

export default NavBar;
