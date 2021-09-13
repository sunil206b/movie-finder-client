import React, { Fragment, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import Input from './form-components/Input';
import { SERVER_API } from '../API';

function EditMovie() {
	const { id } = useParams();
	const history = useHistory();
	const [ movie, setMovie ] = useState({
		id: '' + id,
		title: '',
		release_date: '',
		run_time: '',
		mpaa_rating: '',
		rating: '',
		description: ''
	});
	const [ isLoading, setIsLoading ] = useState(false);
	const [ errors, setErrors ] = useState({});

	useEffect(
		() => {
			if (id > 0) {
				setIsLoading(true);
				fetch(`${SERVER_API}/api/movies/${id}`, {
					method: 'GET'
				})
					.then((res) => {
						if (!res.ok) {
							throw Error('Invalid response status ' + res.status);
						}
						return res.json();
					})
					.then((json) => {
						const date = new Date(json.movie.release_date);
						const releaseDate = date.toISOString().split('T')[0];

						setMovie({
							id: '' + json.movie.id,
							title: json.movie.title,
							release_date: releaseDate,
							run_time: '' + json.movie.run_time,
							mpaa_rating: json.movie.mpaa_rating,
							rating: '' + json.movie.rating,
							description: json.movie.description
						});
						setIsLoading(false);
					})
					.catch((error) => {
						setIsLoading(false);
						history.push('/pagenotfound');
					});
			}
		},
		[ history, id ]
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setMovie({ ...movie, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return false;
		}
		const requestOptions = {
			method: 'POST',
			body: JSON.stringify(movie)
		};

		fetch(`${SERVER_API}/api/admin/editmovie`, requestOptions)
			.then((res) => {
				if (!res.ok) {
					throw Error('Invalid response status ' + res.status);
				}
				res.json();
			})
			.then((json) => {
				toast.success('Movie updated successfully.');
				setMovie({ ...movie, [id]: '' + json.movie.id });
			})
			.catch((error) => {
				toast.error(error.meesage);
			});
	};

	const validateForm = () => {
		let errs = {};
		let formIsValid = true;
		if (movie.title === '') {
			formIsValid = false;
			errs['title'] = 'Please enter a title';
		}
		setErrors(errs);
		return formIsValid;
	};

	const confirmDelete = () => {
		confirmAlert({
			title: 'Delete Movie?',
			message: 'Are you sure?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {}
				},
				{
					label: 'No',
					onClick: () => {}
				}
			]
		});
	};

	if (isLoading) {
		return (
			<div className="d-flex justify-content-center">
				<div className="spinner-border text-info" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		);
	}

	return (
		<Fragment>
			<h2>Add/Edit Movie</h2>
			<ToastContainer />
			<hr />
			<form onSubmit={handleSubmit}>
				<input type="hidden" value={movie.id} name="id" />
				<Input
					type="text"
					name="title"
					placeholder="Movie Title"
					value={movie.title}
					handleChange={handleChange}
					divClass="form-floating mb-3"
					className={errors.title ? 'is-invalid' : ''}
					errorDiv={errors.title ? 'text-danger' : 'd-none'}
					errorMsg={errors.title ? errors.title : ''}
				/>
				<div className="row g-3">
					<Input
						type="date"
						name="release_date"
						placeholder="Release date"
						value={movie.release_date}
						handleChange={handleChange}
						divClass="col form-floating mb-3"
					/>
					<Input
						type="text"
						name="run_time"
						placeholder="Runtime"
						value={movie.run_time}
						handleChange={handleChange}
						divClass="col form-floating mb-3"
					/>

					<div className="col form-floating mb-3">
						<select
							id="mpaa_rating"
							name="mpaa_rating"
							className="form-select form-control"
							value={movie.mpaa_rating}
							onChange={handleChange}
						>
							<option value="">Choose...</option>
							<option value="G">G</option>
							<option value="PG">PG</option>
							<option value="PG13">PG13</option>
							<option value="R">R</option>
							<option value="NC17">NC17</option>
						</select>
						<label htmlFor="mpaa_rating">MPAA Rating</label>
					</div>
					<div className="col form-floating mb-3">
						<input
							type="range"
							className="form-range form-control"
							id="rating"
							name="rating"
							min="0"
							max="10"
							value={movie.rating}
							onChange={handleChange}
						/>
						<label htmlFor="rating">Rating</label>
					</div>
				</div>
				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<textarea
						className="form-control"
						id="description"
						value={movie.description}
						rows="3"
						name="description"
						onChange={handleChange}
					/>
				</div>
				<hr />
				<button className="btn btn-primary" type="submit">
					Save
				</button>
				<Link to="/admin" className="btn btn-warning ms-2">
					Cancel
				</Link>
				{parseInt(movie.id, 10) > 0 && (
					<button type="button" onClick={confirmDelete} className="btn btn-danger ms-2">
						Delete
					</button>
				)}
			</form>
		</Fragment>
	);
}

export default EditMovie;
