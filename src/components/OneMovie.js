import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { SERVER_API } from '../API';

export default function OneMovie() {
	const [ movie, setMovie ] = useState({});
	const [ isLoading, setIsLoading ] = useState(false);
	const { id } = useParams();
	const history = useHistory();

	useEffect(
		() => {
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
					setMovie(json.movie);
					setIsLoading(false);
				})
				.catch((error) => {
					setIsLoading(false);
					history.push('/pagenotfound');
				});
		},
		[ history, id ]
	);

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
		<div>
			<Fragment>
				<h2>
					Movie: {movie.title} ({movie.year})
				</h2>

				<div className="float-start">
					<small>Rating: {movie.mpaa_rating}</small>
				</div>
				{movie.movie_genre && (
					<div className="float-end">
						{movie.movie_genre.map((g) => (
							<span key={g.genre.id} className="badge bg-secondary me-1">
								{g.genre.genre_name}
							</span>
						))}
					</div>
				)}
				<div className="clearfix" />
				<hr />

				<table className="table table-compact table-striped">
					<thead />
					<tbody>
						<tr>
							<td>
								<strong>Title:</strong>
							</td>
							<td>{movie.title}</td>
						</tr>
						<tr>
							<td>
								<strong>Description:</strong>
							</td>
							<td>{movie.description}</td>
						</tr>
						<tr>
							<td>
								<strong>Run Time:</strong>
							</td>
							<td>{movie.run_time}</td>
						</tr>
					</tbody>
				</table>
			</Fragment>
		</div>
	);
}
