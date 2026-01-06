import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Card = ({ item, type }) => {
    const { store, dispatch } = useGlobalReducer();

    // 1. Verificamos si este item ya está en favoritos para pintar el corazón
    const isFavorite = store.favorites.some(fav => fav.uid === item.uid);

    // 2. Lógica para las imágenes
    // La API visualguide usa "characters" en lugar de "people"
    const imgType = type === "people" ? "characters" : type;
    const imageUrl = `https://starwars-visualguide.com/assets/img/${imgType}/${item.uid}.jpg`;

    // Función auxiliar por si la imagen falla (algunos planetas no tienen foto)
    const handleImgError = (e) => {
        e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
    };

    return (
        <div className="card mx-2" style={{ minWidth: "18rem" }}>
            <img 
                src={imageUrl} 
                className="card-img-top" 
                alt={item.name} 
                onError={handleImgError} // Si falla la carga, pone un placeholder
            />
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                
                <div className="d-flex justify-content-between mt-3">
                    {/* Botón que nos lleva a la vista de detalles */}
                    <Link to={`/details/${type}/${item.uid}`} className="btn btn-outline-primary">
                        Learn more!
                    </Link>

                    {/* Botón de Favorito */}
                    <button
                        className="btn btn-outline-warning"
                        onClick={() => {
                            if (isFavorite) {
                                dispatch({ type: "remove_favorite", payload: item });
                            } else {
                                dispatch({ type: "add_favorite", payload: item });
                            }
                        }}
                    >
                        {/* Icono lleno si es favorito, vacío si no */}
                        <i className={`${isFavorite ? "fa-solid" : "fa-regular"} fa-heart`}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};