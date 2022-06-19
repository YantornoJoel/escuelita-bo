import { useState } from "react"


export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    }


    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [target.name]: target.value
        });

    }

    return [values, handleInputChange, reset];

}

export const removeLocalStorage = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('nombre')
    localStorage.removeItem('apellido')
    localStorage.removeItem('dni')
    localStorage.removeItem('categoria')
    localStorage.removeItem('nsocio')
    localStorage.removeItem('telefono')
    localStorage.removeItem('antecedentesSalud')
    localStorage.removeItem('actividad')
}