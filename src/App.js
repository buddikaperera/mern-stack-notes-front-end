//import logo from './logo.svg';

import axios from 'axios';
import { useEffect, useState } from 'react';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';

import Notes from './components/notes/Notes';

function App() {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const checkLogin = async () => {
			const token = localStorage.getItem('tokenStore');

			if (token) {
				const verified = await axios.get('/users/verify', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				console.log('verified====>', verified);
				setIsLoading(verified.data);

				if (verified.data === false) return localStorage.clear();
			} else {
				setIsLoading(false);
			}
		};

		checkLogin();
	}, []);

	return (
		<div>
			{isLoading ? (
				<Notes setIsLoading={setIsLoading} />
			) : (
				<Login setIsLoading={setIsLoading} />
			)}
		</div>
	);
}

export default App;
