import React from 'react'
import { useForm } from './useForm'
import { save, updateUser } from '../service/Student'


const actividades = [
    { id: 1, nombre: 'espacio de recreacion don orione' },
    { id: 2, nombre: 'defensa personal' },
    { id: 3, nombre: 'folklore' },
    { id: 4, nombre: 'futbol inf fem' },
    { id: 5, nombre: 'futbol inf masc' },
    { id: 6, nombre: 'futsal fem' },
    { id: 7, nombre: 'futsal masc' },
    { id: 8, nombre: 'patin' },
    { id: 9, nombre: 'volley' },
    { id: 10, nombre: 'zumba' }
]

export const CreateStudent = () => {

    const [formValues, handleInputChange] = useForm({
        nombre: localStorage.getItem('nombre') || '',
        apellido: localStorage.getItem('apellido') || '',
        dni: localStorage.getItem('dni') || '',
        edad: localStorage.getItem('edad') || '',
        fechaNacimiento: localStorage.getItem('categoria') || '',
        nsocio: localStorage.getItem('nsocio') || '',
        telefono: localStorage.getItem('telefono') || '',
        telefono2: localStorage.getItem('telefono2') || '',
        direccion: localStorage.getItem('direccion') || '',
        antecedentesSalud: localStorage.getItem('antecedentesSalud') || '',
        actividad: localStorage.getItem('actividad') || 'espacio de recreacion don orione'
    })

    const { nombre, apellido, dni, actividad, fechaNacimiento, telefono, antecedentesSalud, edad, direccion, telefono2 } = formValues

    const onSubmit = async (e) => {
        e.preventDefault();
        if (localStorage.getItem('id')) {
            updateUser(localStorage.getItem('id'), nombre, apellido, dni, edad, fechaNacimiento, telefono, telefono2, direccion, antecedentesSalud, actividad)
            localStorage.removeItem('nombre')
            localStorage.removeItem('apellido')
            localStorage.removeItem('dni')
            localStorage.removeItem('edad')
            localStorage.removeItem('categoria')
            localStorage.removeItem('nsocio')
            localStorage.removeItem('telefono')
            localStorage.removeItem('telefono2')
            localStorage.removeItem('direccion')
            localStorage.removeItem('antecedentesSalud')
            localStorage.removeItem('actividad')
            setTimeout(() => {
                window.location.replace("/")
            }, 3000);
        } else {
            save(nombre, apellido, dni, edad, fechaNacimiento, telefono, telefono2, direccion, antecedentesSalud, actividad);
        }
    }

    return (
        <>
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4 className='text-center mb-3 card-title'>Subir alumno</h4>
                    <form
                        onSubmit={onSubmit}
                    >

                        <div className="form-group">
                            <input
                                autoComplete="off"
                                className="form-control"
                                name="nombre"
                                placeholder="Nombre"
                                type="text"
                                onChange={handleInputChange}
                                value={nombre}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                autoComplete="off"
                                className="form-control"
                                name="apellido"
                                placeholder="Apellido"
                                type="text"
                                onChange={handleInputChange}
                                value={apellido}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                autoComplete="off"
                                className="form-control"
                                name="dni"
                                placeholder="Dni"
                                type="number"
                                onChange={handleInputChange}
                                value={dni}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                autoComplete="off"
                                className="form-control"
                                name="edad"
                                placeholder="Edad"
                                type="number"
                                onChange={handleInputChange}
                                value={edad}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                autoComplete="off"
                                className="form-control"
                                name="fechaNacimiento"
                                placeholder="Categoria"
                                type="number"
                                onChange={handleInputChange}
                                value={fechaNacimiento}
                            />
                        </div>
                        {/* <div className="form-group">
                            <input
                                autoComplete="off"
                                className="form-control"
                                name="nsocio"
                                placeholder="Número de socio"
                                type="number"
                                onChange={handleInputChange}
                                value={nsocio}
                            />
                        </div> */}
                        <div className="form-group">
                            <input
                                autoComplete="off"
                                className="form-control"
                                name="telefono"
                                placeholder="Telefono"
                                type="number"
                                onChange={handleInputChange}
                                value={telefono}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                autoComplete="off"
                                className="form-control"
                                name="telefono2"
                                placeholder="Telefono 2"
                                type="number"
                                onChange={handleInputChange}
                                value={telefono2}
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                style={{ maxHeight: '250px', minHeight: '40px' }}
                                autoComplete="off"
                                className="form-control"
                                name="direccion"
                                placeholder="Dirección"
                                type="text"
                                onChange={handleInputChange}
                                value={direccion}
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                style={{ maxHeight: '250px', minHeight: '40px' }}
                                autoComplete="off"
                                className="form-control"
                                name="antecedentesSalud"
                                placeholder="Antecedentes de salud"
                                type="text"
                                onChange={handleInputChange}
                                value={antecedentesSalud}
                            />
                        </div>

                        <div className="input-group mb-3">
                            <label className="input-group-text" for="inputGroupSelect01">Actividad</label>
                            <select className="form-control" id="inputGroupSelect01" onChange={handleInputChange} name="actividad">
                                {actividades.map((act) => (
                                    <option key={act.id} value={act.nombre}>
                                        {act.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            // className="btn btn-primary btn-block mt-1 mb-5"
                            className='btn btn-block mt-1 mb-1'
                            id='btn-create'
                            type="submit"
                        >
                            Enviar
                        </button>

                    </form>
                </div>
            </div>
        </>


    )
}
