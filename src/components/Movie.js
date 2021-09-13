import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { SERVER_API } from '../API';

export default function Movie() {
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
			<h2>Movie with {movie.name}</h2>
		</div>
	);
}
