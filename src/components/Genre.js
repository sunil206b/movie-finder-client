import React, { Fragment, useEffect, useState } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { SERVER_API } from '../API';

function Genre() {
	const [ movies, setMovies ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(false);
	const { id } = useParams();
	const history = useHistory();
	const location = useLocation();
	const { genreName } = location.state;

	useEffect(
		() => {
			setIsLoading(true);
			fetch(`${SERVER_API}/api/genres/${id}`, {
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
		<Fragment>
			<h2>Genre: {genreName}</h2>
			{movies && (
				<div className="list-group">
					{movies.map((m) => (
						<Link
							key={m.id}
							to={`/movies/${m.id}`}
							className="list-group-item list-group-item-action"
						>
							{m.title}
						</Link>
					))}
				</div>
			)}
		</Fragment>
	);
}

export default Genre;
