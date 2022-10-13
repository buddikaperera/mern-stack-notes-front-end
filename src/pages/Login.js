import axios from 'axios';
import React, { useState } from 'react';

const Login = ({ setIsLoading }) => {
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [error, setError] = useState('');
	const [onLogin, setOnLogin] = useState(false);

	const style = {
		visibility: onLogin ? 'visible' : 'hidden',
		opacity: onLogin ? 1 : 0,
	};

	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
		setError('');
	};

	const registerSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post('/users/register', {
				username: user.name,
				email: user.email,
				password: user.password,
			});

			setUser({ name: '', email: '', password: '' });
			setError(res.data.msg);
		} catch (error) {
			error.response.data.msg && setError(error.response.data.msg);
		}
	};

	const loginSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post('/users/login', {
				email: user.email,
				password: user.password,
			});

			setUser({ email: '', password: '' });
			//setError(res.data.msg);
			localStorage.setItem('tokenStore', res.data.token);
			setIsLoading(true);
		} catch (error) {
			error.response.data.msg && setError(error.response.data.msg);
		}
	};

	return (
		<section className="login-page">
			<div className="login create-note">
				<h2>Login</h2>
				<form onSubmit={loginSubmit}>
					<input
						type="text"
						name="email"
						className="form-control"
						id="login-email"
						placeholder="E-mail"
						required
						valu={user.email}
						onChange={onChangeHandler}
					/>
					<input
						type="password"
						className="form-control"
						name="password"
						id="login-password"
						required
						valu={user.password}
						autoComplete="true"
						onChange={onChangeHandler}
					/>
					<button className="btn btn-primary mr-2" type="submit">
						Login
					</button>
					<p>
						you don't have an acoount{' '}
						<span onClick={() => setOnLogin(true)}>
							Register Now
						</span>
						?
					</p>
					<h3>{error}</h3>
				</form>
			</div>

			<div className="register create-note" style={style}>
				<h2>Register</h2>
				<form onSubmit={registerSubmit}>
					<input
						type="text"
						className="form-control"
						name="name"
						id="register-name"
						placeholder="E-mail"
						required
						valu={user.name}
						onChange={onChangeHandler}
					/>
					<input
						type="text"
						className="form-control"
						name="email"
						id="register-email"
						placeholder="E-mail"
						required
						valu={user.email}
						onChange={onChangeHandler}
					/>
					<input
						type="password"
						className="form-control"
						name="password"
						id="register-password"
						required
						valu={user.password}
						autoComplete="true"
						onChange={onChangeHandler}
					/>
					<button className="btn btn-primary mr-2" type="submit">
						Register
					</button>
					<p>
						you don't have an account{' '}
						<span onClick={() => setOnLogin(false)}>Login Now</span>
						?
					</p>
					<h3>{error}</h3>
				</form>
			</div>
		</section>
	);
};

export default Login;
