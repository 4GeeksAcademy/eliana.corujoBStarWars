import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Card } from "../components/Card";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	// Esta función se encarga de cargar los datos
	const loadData = async () => {
		// Evitamos llamar a la API si ya tenemos datos en el store (opcional, pero buena práctica)
		if (store.people.length > 0 && store.planets.length > 0 && store.vehicles.length > 0) return;

		try {
			// Fetch Personajes
			const peopleResponse = await fetch("https://www.swapi.tech/api/people");
			const peopleData = await peopleResponse.json();
			dispatch({ type: "load_people", payload: peopleData.results });

			// Fetch Vehículos
			const vehiclesResponse = await fetch("https://www.swapi.tech/api/vehicles");
			const vehiclesData = await vehiclesResponse.json();
			dispatch({ type: "load_vehicles", payload: vehiclesData.results });

			// Fetch Planetas
			const planetsResponse = await fetch("https://www.swapi.tech/api/planets");
			const planetsData = await planetsResponse.json();
			dispatch({ type: "load_planets", payload: planetsData.results });

		} catch (error) {
			console.error("Error cargando datos:", error);
		}
	};

	useEffect(() => {
		loadData();
	}, []); // El array vacío asegura que esto solo corra una vez al cargar el componente

	return (
		<div className="container mt-5">
			
			{/* Sección Personajes */}
			<h1 className="text-danger mb-4">Characters</h1>
			<div className="d-flex overflow-auto mb-5 pb-3">
				{store.people && store.people.length > 0 ? (
					store.people.map((person) => (
						<Card key={person.uid} item={person} type="people" />
					))
				) : (
					<div className="spinner-border text-danger" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				)}
			</div>

			{/* Sección Vehículos */}
			<h1 className="text-danger mb-4">Vehicles</h1>
			<div className="d-flex overflow-auto mb-5 pb-3">
				{store.vehicles && store.vehicles.length > 0 ? (
					store.vehicles.map((vehicle) => (
						<Card key={vehicle.uid} item={vehicle} type="vehicles" />
					))
				) : (
					<div className="spinner-border text-danger" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				)}
			</div>

			{/* Sección Planetas */}
			<h1 className="text-danger mb-4">Planets</h1>
			<div className="d-flex overflow-auto mb-5 pb-3">
				{store.planets && store.planets.length > 0 ? (
					store.planets.map((planet) => (
						<Card key={planet.uid} item={planet} type="planets" />
					))
				) : (
					<div className="spinner-border text-danger" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				)}
			</div>
			
		</div>
	);
};