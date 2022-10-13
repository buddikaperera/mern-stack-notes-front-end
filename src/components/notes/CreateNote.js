import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
const CreateNote = () => {
	const [note, setNote] = useState({
		title: '',
		content: '',
		date: '',
	});
	const [createMessage, setCreateMessage] = useState('');
	const [submitting, setSubmitting] = useState(false);

	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		setNote({ ...note, [name]: value });
		//	setError('');
	};

	let navigate = useNavigate();

	const onSubmitHandler = async (e) => {
		e.preventDefault();

		try {
			const token = localStorage.getItem('tokenStore');

			if (token) {
				const { title, content, date } = note;

				const newNote = { title, content, date };
				setSubmitting(true);

				const res = await axios.post(`/api/notes/`, newNote, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				console.log('RESPONSE >>>>>', res.data.msg);
				setCreateMessage(res.data.msg);
				setNote({
					title: '',
					content: '',
					date: '',
				});
				setSubmitting(false);
				setTimeout(() => {
					navigate('/');
				}, 460);
			}
		} catch (error) {
			window.location.href = '/';

			console.log('error.response.data.msg', error.response.data.msg);
			setSubmitting(false);
		}
	};

	return (
		<div className="create-note">
			<h2>Create Note</h2>
			<form onSubmit={onSubmitHandler} autoComplete="off">
				<div className="row">
					<label htmlFor="title">Title</label>
					<input
						type="text"
						name="title"
						id="title"
						value={note.title}
						onChange={onChangeHandler}
						className="form-control"
						required
					/>
				</div>

				<div className="row">
					<label htmlFor="content">Content</label>
					<textarea
						type="text"
						name="content"
						id="content"
						rows="5"
						value={note.content}
						onChange={onChangeHandler}
						className="form-control"
						required
					/>
				</div>

				<div className="row">
					<label htmlFor="date">Date</label>
					<input
						type="date"
						className="form-control"
						name="date"
						id="date"
						value={note.date}
						onChange={onChangeHandler}
						required
					/>
				</div>
				{createMessage}
				<button type="submit" className="btn btn-primary mr-2">
					{submitting && (
						<span className="spinner-border spinner-border-sm mr-1"></span>
					)}
					{''}
					Save
				</button>
			</form>
		</div>
	);
};

export default CreateNote;
