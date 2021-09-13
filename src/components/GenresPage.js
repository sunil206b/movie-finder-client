import React, { Fragment, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SERVER_API } from '../API';

function GenresPage() {
	const [ genres, setGenres ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(false);
	const history = useHistory();

	useEffect(
		() => {
			setIsLoading(true);
			fetch(`${SERVER_API}/api/genres`, {
				method: 'GET'
			})
				.then((res) => {
					if (!res.ok) {
						throw Error('Invalid response status ' + res.status);
					}
					return res.json();
				})
				.then((json) => {
					setGenres(json.genres);
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
			<h2>Genres</h2>
			{genres && (
				<div className="list-group">
					{genres.map((genre) => (
						<Link
							to={{
								pathname: `/genres/${genre.id}`,
								state: {
									genreName: genre.genre_name
								}
							}}
							key={genre.id}
							className="list-group-item list-group-item-action"
						>
							{genre.genre_name}
						</Link>
					))}
				</div>
			)}
		</Fragment>
	);
}

export default GenresPage;
