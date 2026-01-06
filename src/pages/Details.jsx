import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export const Details = () => {
    const { type, uid } = useParams(); // Obtenemos parámetros de la URL
    const [details, setDetails] = useState(null); // Estado local para guardar los detalles
    
    // Lógica para la imagen (igual que en la Card)
    const imgType = type === "people" ? "characters" : type;
    const imgUrl = `https://starwars-visualguide.com/assets/img/${imgType}/${uid}.jpg`;

    // Fetch de datos individuales
    useEffect(() => {
        fetch(`https://www.swapi.tech/api/${type}/${uid}`)
            .then(res => res.json())
            .then(data => {
                // swapi.tech devuelve los datos dentro de result.properties
                setDetails(data.result.properties);
            })
            .catch(err => console.error(err));
    }, [type, uid]);

    return (
        <div className="container mt-5">
            {/* Si aún no cargan los detalles, mostramos spinner */}
            {!details ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    {/* Parte Superior: Foto y Descripción */}
                    <div className="row">
                        <div className="col-md-6 text-center">
                            <img 
                                src={imgUrl} 
                                className="img-fluid rounded" 
                                alt="Detail" 
                                onError={(e) => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"}
                            />
                        </div>
                        <div className="col-md-6 text-center">
                            <h1 className="display-4">{details.name}</h1>
                            <p className="lead mt-4">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                (Texto de relleno estilo Star Wars).
                            </p>
                        </div>
                    </div>

                    <hr className="my-4 text-danger" />

                    {/* Parte Inferior: Propiedades Técnicas en Rojo */}
                    <div className="row text-danger text-center">
                        {/* Mapeamos las propiedades más comunes dinámicamente */}
                        {Object.keys(details).map((key, index) => {
                            // Filtramos claves que no queremos mostrar (como url, created, edited)
                            if (["url", "created", "edited", "homeworld"].includes(key)) return null;
                            
                            return (
                                <div className="col-md-2 col-sm-4 mb-3" key={index}>
                                    <h6 className="text-capitalize">{key.replace("_", " ")}</h6>
                                    <p>{details[key]}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center mt-4 mb-5">
                        <Link to="/" className="btn btn-primary">
                            Back to Home
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};