import axios from 'axios';

import Swal from 'sweetalert2';


const url = process.env.REACT_APP_HEROKU_URL;


export const getAll = async () => {
    const { data } = await axios.get(`${url}/students`)
    return data;
};


export const findID = async (id) => {
    const resp = await axios.get(`${url}/students/find/${id}`)
    return resp;
}


export const findByParameters = async (find) => {
    const { data } = await axios.post(`${url}/students/find?q=${find}`)
    return data;
}


export const save = async (nombre, apellido, dni, edad, fechaNacimiento, telefono, telefono2, direccion, antecedentesSalud, actividad) => {

    const resp = await axios.post(`${url}/students`, {

        nombre, apellido, dni, edad, fechaNacimiento, telefono, telefono2, direccion, antecedentesSalud, actividad

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
                timer: 3500
            })
            setTimeout(() => {
                window.location.replace("/")
            }, 3000);
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
    return resp
}

export const updateUser = async (id, nombre, apellido, dni, edad, fechaNacimiento, telefono, telefono2, direccion, antecedentesSalud, actividad) => {

    const { data } = await axios.put(`${url}/students/${id}`, {
        nombre, apellido, dni, edad, fechaNacimiento, telefono, telefono2, direccion, antecedentesSalud, actividad
    })
        .then((resp) => {
            Swal.fire({
                title: `<span style='color:black'><i>Enviado</i></span>`,
                text: `${nombre} ${apellido} ha sido editado correctamente`,
                icon: 'success',
                iconColor: '#54E117',
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3500,
                timerProgressBar: true,
                background: ['#DEE9E9']
            });

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

    const resp = await axios.delete(`${url}/students/${id}`, { id })
        .then(() => {
            Swal.fire({
                title: `<span style='color:black'><i>Alumno eliminado</i></span>`,
                text: `${nombre} ${apellido} ha sido borrado correctamente`,
                icon: 'success',
                iconColor: '#54E117',
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                background: ['#DEE9E9']
            });
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


export const login = async (email, password) => {

    const { data } = await axios.post(`${url}/users/login`, {

        email, password

    })
        .then(({ data }) => {
            localStorage.setItem('token', data.token);
            window.location.replace("/")
            return data;
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