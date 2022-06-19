import React from 'react'
import logo from '../escuelita.png'

export const Footer = () => {
    return (
        <div className="footer" style={{ textAlign: 'center', marginBottom: '25px' }}>
            <img src={logo} height={150} width={300} alt="cavc" />
        </div>
    )
}
