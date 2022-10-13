import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const ProtectedRoutes = ({ children }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	const token = localStorage.getItem('token');
	const validateToken = async () => {
		//console.log('<===== TOKEN LOCAL ====>', token);

		const config = {
			headers: {
				'Content-type': 'application/json',
			},
		};

		try {
			const response = await axios.post(
				'http://localhost:5000/api/users/get-user',
				{},
				config,
				{
					header: {
						Authorization: `Bearer-${token}`,
						Accept: 'application/json',
					},
				}
			);

			///setLoading(false);

			console.log('<===== RESPONSE STATUS ====>', response.data.status);

			if (response.data.data.success) {
				setLoading(false);
				navigate('/home');
			} else {
				setLoading(false);
			}
		} catch (error) {
			setLoading(false);
			console.log('<===== RESPONSE error ====>', error);
			navigate('/login');
		}
	};

	useEffect(() => {
		if (localStorage.getItem('token')) {
			validateToken();
		} else {
			navigate('/login');
		}
	}, [token]);

	console.log('loading', loading);
	return (
		<div>
			{loading ? (
				<div>Loading..</div>
			) : (
				<React.Fragment>{children}</React.Fragment>
			)}
		</div>
	);
};

export default ProtectedRoutes;
