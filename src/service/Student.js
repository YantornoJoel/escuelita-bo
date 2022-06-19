import axios from 'axios';

import Swal from 'sweetalert2';


const url = process.env.REACT_APP_HEROKU_URL;


export const getAll = async () => {
    const { data } = await axios.get(url)
    return data;
};


export const findID = async (id) => {
    const resp = await axios.get(`${url}find/${id}`)
    return resp;
}


export const findByParameters = async (find) => {
    const resp = await axios.post(`${url}/find?q=${find}`)
    return resp;
}


export const save = async (nombre, apellido, dni, actividad, fechaNacimiento, nsocio, telefono, antecedentesSalud) => {

    const resp = await axios.post(`${url}`, {

        nombre, apellido, dni, actividad, fechaNacimiento, nsocio, telefono, antecedentesSalud

    })
        .then((resp) => {
            Swal.fire({
                title: 'Enviado',
                text: 'Usuario creado correctamente',
                icon: 'success',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                timer: 3000
            })
            return resp;
        })
        .catch((err) => {
            Swal.fire({
                title: 'Error',
                text: 'Ingrese todos los datos correctamente',
                icon: 'error',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                timer: 4000
            })
            return err
        })
    setTimeout(() => {
        window.location.replace("/")
    }, 3000);
    return resp
}

export const updateUser = async (id, nombre, apellido, dni, actividad, fechaNacimiento, nsocio, telefono, antecedentesSalud) => {

    const { data } = await axios.put(`${url}/${id}`, {
        nombre, apellido, dni, actividad, fechaNacimiento, nsocio, telefono, antecedentesSalud
    })
        .then((resp) => {
            Swal.fire({
                title: 'Enviado',
                text: 'Usuario editado correctamente',
                icon: 'success',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                timer: 3000
            })
            localStorage.removeItem('id');
            return resp;
        })
        .catch((err) => {
            Swal.fire({
                title: 'Error',
                text: 'Ingrese todos los datos correctamente',
                icon: 'error',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                timer: 4000
            })
            return err
        })

    return data

}

export const deleteUser = async (id, nombre, apellido) => {

    const resp = await axios.delete(`${url}/${id}`, { id })
        .then(() => {
            Swal.fire({
                title: 'Alumno eliminado',
                text: `${nombre} ${apellido} ha sido eliminado correctamente`,
                icon: 'success',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                timer: 4000
            })
        })
        .catch((err) => {
            Swal.fire({
                title: 'Error',
                text: 'Error al eliminar el usuario',
                icon: 'error',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                timer: 4000
            })
            return err
        })

    return resp

}