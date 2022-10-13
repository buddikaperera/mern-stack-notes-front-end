import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import CreateNote from './CreateNote';
import EditNote from './EditNote';

function Notes({ setIsLoading }) {
	return (
		<Router>
			<div className="notes-page">
				<NavBar setIsLoading={setIsLoading} />
				<section>
					<Routes>
						<Route path="/" element={<Home />} exact />
						<Route path="/create" element={<CreateNote />} exact />
						<Route path="/edit/:id" element={<EditNote />} exact />
					</Routes>
				</section>
			</div>
		</Router>
	);
}

export default Notes;
