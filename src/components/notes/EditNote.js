import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import moment from 'moment';
import { useNavigate } from 'react-router';
var newDateOptions = {
	year: '4-digit',
	month: '2-digit',
	day: '2-digit',
};

const EditNote = () => {
	const [note, setNote] = useState({
		title: '',
		content: '',
		date: '',
		id: '',
	});

	const [message, setMessage] = useState('');
	const [submitting, setSubmitting] = useState(false);

	const parameter = useParams();
	let navigate = useNavigate();

	const { id } = parameter;

	console.log('parameter', id);

	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		setNote({ ...note, [name]: value });
	};

	useEffect(() => {
		const getPost = async () => {
			try {
				const token = localStorage.getItem('tokenStore');

				setSubmitting(true);

				if (token && id) {
					const res = await axios.get(
						`/api/notes/${id}`,

						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);

					console.log('getPost---> RESPONSE >>>>>', res.data.msg);
					const { title, content } = res.data;
					setNote({
						title,
						content,
						date: moment(res.data.date).format('YYYY-MM-DD'),
					});
					setSubmitting(false);
				}
			} catch (error) {
				//window.location.href = '/';

				console.log('error.response.data.msg', error);
				setSubmitting(false);
			}
		};

		getPost();
	}, []);

	const onSubmitHandler = async (e) => {
		e.preventDefault();

		try {
			const token = localStorage.getItem('tokenStore');

			if (token) {
				const { title, content, date, id } = note;

				const newNote = { title, content, date };
				setSubmitting(true);
				const res = await axios.put(`/api/notes/${id}`, newNote, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				console.log(' UPDATE RESPONSE >>>>>', res.data.msg);
				setMessage(res.data.msg);
				setSubmitting(false);

				setTimeout(() => {
					navigate('/');
				}, 460);
			}
		} catch (error) {
			window.location.href = '/';

			console.log('error.response.data.msg ', error.response.data.msg);
			setMessage(error.response.data.msg);
			setSubmitting(false);
		}
	};

	return (
		<div className="create-note">
			<h2>Edit Note</h2>
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
				{message}
				<button type="submit" className="btn btn-primary mr-2">
					Save{' '}
					{submitting && (
						<span className="spinner-border spinner-border-sm mr-1"></span>
					)}
				</button>
			</form>
		</div>
	);
};

export default EditNote;
