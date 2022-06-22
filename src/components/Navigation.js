import { Logout } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import { removeLocalStorage } from "./useForm";


export const Navigation = () => {

  const onLogout = () => {
    localStorage.removeItem('token')
    window.location.reload();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand navegacion" to="/" onClick={() => removeLocalStorage()}>
          EscuelitaApp
        </Link>
        <div className="navbar-nav ml-auto" >
          <li className="nav-item navbar-brand ">
            <Link className="nav-link" to="/" onClick={() => removeLocalStorage()}>Listado</Link>
          </li>
          <li className="nav-item navbar-brand">
            <Link className="nav-link" to="/create">Crear</Link>
          </li>
          {
            window.screen.width > 400 && localStorage.getItem('token') &&
            (
              <li className="nav-item navbar-brand ">
                <Link className="nav-link" id='btn-login' to="/" onClick={() => onLogout()}>Cerrar sesión < Logout /></Link>
              </li>
            )
          }
        </div>
      </div>
    </nav >
  );
}