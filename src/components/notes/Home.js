import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'timeago.js';

const Home = () => {
	const [notes, setNotes] = useState([]);
	const [token, setToken] = useState('');

	const getNotes = async (token) => {
		const res = await axios.get('/api/notes', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		setNotes(res.data);
		console.log('======= res ====>', res);
	};

	useEffect(() => {
		const token = localStorage.getItem('tokenStore');
		setToken(token);

		if (token) {
			getNotes(token);
		}
	}, []);

	const deleteNote = async (id) => {
		console.log('------->DELETE ID >>>>> =', id);

		try {
			if (token) {
				const res = await axios.delete(`/api/notes/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				setNotes((prevNotes) =>
					prevNotes.filter((item) => item._id !== id)
				);
				console.log('======= res ====>', res.data.msg);
			}
		} catch (error) {
			window.location.href = '/';

			console.log('error.response.data.msg ');
		}
	};

	return (
		<div className="note-wrapper">
			{notes.map((note, i) => (
				<div className="card" key={i}>
					<h4 title={note.title}>{note.title}</h4>

					<div className="text-wrapper">{note.content}</div>
					<p className="date"> {format(note.date)}</p>
					<div className="card-footer">
						username
						<Link to={`/edit/${note._id}`}>Edit</Link>
					</div>
					<button
						onClick={() => deleteNote(note._id)}
						className="close"
					>
						X
					</button>
				</div>
			))}
		</div>
	);
};

export default Home;
