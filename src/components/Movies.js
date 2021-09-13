import React, { Fragment, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SERVER_API } from '../API';

export default function Movies() {
	const [ movies, setMovies ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(false);
	const history = useHistory();

	useEffect(
		() => {
			setIsLoading(true);
			fetch(`${SERVER_API}/api/movies`, {
				method: 'GET'
			})
				.then((res) => {
					if (!res.ok) {
						throw Error('Invalid response status ' + res.status);
					}
					return res.json();
				})
				.then((json) => {
					setMovies(json.movies);
					setIsLoading(false);
				})
				.catch((error) => {
					setIsLoading(false);
					history.push('/pagenotfound');
				});
		},
		[ history ]
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
		<Fragment>
			<h2>Chose a Movie</h2>

			{movies && (
				<div className="list-group">
					{movies.map((movie) => (
						<Link
							key={movie.id}
							to={`/movies/${movie.id}`}
							className="list-group-item list-group-item-action"
						>
							{movie.title}
						</Link>
					))}
				</div>
			)}
		</Fragment>
	);
}
