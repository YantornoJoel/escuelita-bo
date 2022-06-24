import { Logout } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../escuelita.png'

export const Footer = () => {

    const onLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('emailUser')
        window.location.reload();
    }

    return (
        <div className="footer" style={{ textAlign: 'center', marginBottom: '25px' }}>
            <img src={logo} height={150} width={300} alt="cavc" />

            {
                window.screen.width < 400 && localStorage.getItem('token') &&
                (
                    <>
                        <li className="nav-item navbar-brand mt-4" >
                            <Link
                                className="nav-link"
                                id='btn-login'
                                to="/"
                                onClick={() => onLogout()}>Cerrar sesión <Logout style={{ color: '#6f42c1' }} />
                            </Link>
                        </li>
                        <p>{localStorage.getItem('emailUser')}</p>
                    </>
                )
            }
        </div>
    )
}
