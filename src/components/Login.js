import { Box, Grid, TextField, Typography } from '@mui/material';
import React from 'react'
import { login } from '../service/Student'
import { useForm } from './useForm';

export const Login = () => {

    const [formValues, handleInputChange] = useForm({
        email: '',
        password: ''
    })

    const { email, password } = formValues

    const onSubmit = async () => {
        await login(email, password);
    }

    return (
        <>
            <Box sx={{ marginTop: '20px', marginBottom: '20px' }}>
                <Grid container spacing={2} textAlign="center   ">
                    <Grid item xs={12}>
                        <Typography variant='h5' component="h5" >INICIAR SESIÓN</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name='email'
                            type='email'
                            label="Correo"
                            variant="filled"
                            onChange={handleInputChange}
                            value={email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name='password'
                            autoComplete='false'
                            label="Contraseña"
                            type='password'
                            variant="filled"
                            onChange={handleInputChange}
                            value={password}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <button
                            onClick={() => onSubmit()}
                            id='btn-login'
                            className='btn btn-lg'
                        >
                            Ingresar
                        </button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
