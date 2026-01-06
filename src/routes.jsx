// Importamos las dependencias necesarias
import { Route, createRoutesFromElements, createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Details } from "./pages/Details"; // Importamos el componente que acabamos de crear

export const router = createBrowserRouter(
  createRoutesFromElements(
    // El Layout envuelve todas las rutas (aquí estará el Navbar)
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Ruta principal */}
      <Route path= "/" element={<Home />} />

      {/* Ruta dinámica para detalles */}
      <Route path="/details/:type/:uid" element={<Details />} />

    </Route>
  )
);