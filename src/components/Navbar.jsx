import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();

	return (
		<nav className="navbar navbar-light bg-light mb-3 px-5">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">
					<img 
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1200px-Star_Wars_Logo.svg.png" 
						alt="Star Wars" 
						width="80" 
						height="50" 
					/>
				</span>
			</Link>
			<div className="ml-auto">
				<div className="dropdown">
					<button
						className="btn btn-primary dropdown-toggle"
						type="button"
						id="dropdownMenuButton"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Favorites <span className="badge bg-secondary">{store.favorites.length}</span>
					</button>
					<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
						
						{store.favorites.length === 0 ? (
							<li className="dropdown-item text-center">(empty)</li>
						) : (
							store.favorites.map((item, index) => (
								<li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
									<span className="me-2">{item.name}</span>
									<button
										className="btn btn-outline-danger btn-sm border-0"
										onClick={(e) => {
											e.stopPropagation(); // Evita que se cierre el dropdown al borrar
											dispatch({ type: "remove_favorite", payload: item });
										}}
									>
										<i className="fa-solid fa-trash"></i>
									</button>
								</li>
							))
						)}

					</ul>
				</div>
			</div>
		</nav>
	);
};