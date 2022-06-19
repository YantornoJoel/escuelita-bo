import React from "react";
import { Link } from "react-router-dom";
import { removeLocalStorage } from "./useForm";


export const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand navegacion" to="/" onClick={() => removeLocalStorage()}>
          EscuelitaApp
        </Link>
        <div className="navbar-nav ml-autos">
          <li className="nav-item navbar-brand ">
            <Link className="nav-link" to="/" onClick={() => removeLocalStorage()}>Listado</Link>
          </li>
          <li className="nav-item navbar-brand ">
            <Link className="nav-link" to="/create">Crear</Link>
          </li>
        </div>
      </div>
    </nav>
  );
}