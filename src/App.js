import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Movies from './components/Movies';
import Admin from './components/Admin';
import Movie from './components/Movie';
import OneMovie from './components/OneMovie';
import Page404 from './Page404';
import GenresPage from './components/GenresPage';
import Genre from './components/Genre';
import EditMovie from './components/EditMovie';

function App() {
	return (
		<Router>
			<div className="container">
				<div className="row">
					<h1 className="mt-3">Go Watch a Movie!</h1>
					<hr className="mb-3" />
				</div>

				<div className="row">
					<div className="col-md-2">
						<nav>
							<ul className="list-group">
								<li className="list-group-item">
									<Link className="nav-link" to="/">
										Home
									</Link>
								</li>
								<li className="list-group-item">
									<Link className="nav-link" to="/movies">
										Movies
									</Link>
								</li>
								<li className="list-group-item">
									<Link className="nav-link" to="/genres">
										Genres
									</Link>
								</li>
								<li className="list-group-item">
									<Link className="nav-link" to="/admin/movie/0">
										Add Movie
									</Link>
								</li>
								<li className="list-group-item">
									<Link className="nav-link" to="/admin">
										Manage Catalog
									</Link>
								</li>
							</ul>
						</nav>
					</div>
					<div className="col-md-10">
						<Switch>
							<Route path="/" exact>
								<Home />
							</Route>
							<Route path="/movies/:id" component={OneMovie} />
							<Route path="/movies/:id" exact>
								<Movie />
							</Route>
							<Route path="/movies" exact>
								<Movies />
							</Route>
							<Route path="/genres" exact>
								<GenresPage />
							</Route>
							<Route path="/genres/:id" exact>
								<Genre />
							</Route>
							<Route path="/admin/movie/:id" component={EditMovie} />
							<Route path="/admin" exact>
								<Admin />
							</Route>
							<Route path="/*">
								<Page404 />
							</Route>
						</Switch>
					</div>
				</div>
			</div>
		</Router>
	);
}

export default App;
