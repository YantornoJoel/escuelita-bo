import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, TextField, Typography, Chip } from '@mui/material'

import { Close, Search } from '@mui/icons-material';
import { findByParameters, getAll } from '../service/Student';
import { FullScreenLoading } from './FullScreenLoading';


// import ExportExcel from 'react-export-excel';

// const ExcelFile = ExportExcel.ExcelFile;
// const ExcelSheet = ExportExcel.ExcelSheet;
// const ExcelColumn = ExportExcel.ExcelColumn;



export const NoLoginStudentList = () => {

    const [students, setStudents] = useState([])
    const [counter, setCounter] = useState(0)
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getStudents()
    }, [])

    if (!students) return (<></>);

    const getStudents = async () => {
        setLoading(true)
        const { students, counter } = await getAll();
        setStudents(students)
        setCounter(counter)
        setSearch('')
        setLoading(false)
    }

    const findByName = async (find) => {
        setLoading(true)
        const { data } = await findByParameters(find)
        setStudents(data)
        setLoading(false)
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }


    const columns = [
        { field: 'nombre', headerName: 'Nombre', width: 250, headerAlign: 'center', align: 'center' },
        { field: 'apellido', headerName: 'Apellido', width: 250, headerAlign: 'center', align: 'center' },
        { field: 'dni', headerName: 'Dni', width: 150, headerAlign: 'center', align: 'center' },
        { field: 'edad', headerName: 'Edad', width: 100, headerAlign: 'center', align: 'center' },
        { field: 'actividad', headerName: 'Actividad', width: 200, headerAlign: 'center', align: 'center' },
        {
            field: 'telefono',
            headerName: 'Telefono',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            renderCell: ({ row }) => {
                return (
                    <Chip color="secondary" label={row.telefono} variant='outlined' />
                )
            }
        },
        // { field: 'nsocio', headerName: 'N° socio', width: 150, headerAlign: 'center', align: 'center' },
        { field: 'direccion', headerName: 'Dirección', width: 200, headerAlign: 'center', align: 'center' },
        { field: 'antecedentesSalud', headerName: 'Antecedentes de salud', width: 150, headerAlign: 'center', align: 'center' },
        { field: 'categoria', headerName: 'Categoria', width: 125, headerAlign: 'center', align: 'center', },
    ]

    const rows = students.map(student => ({
        id: student._id,
        nombre: student.nombre,
        apellido: student.apellido,
        dni: student.dni,
        edad: student.edad,
        actividad: student.actividad,
        telefono: student.telefono,
        telefono2: student.telefono2,
        // nsocio: student.nsocio,
        direccion: student.direccion,
        categoria: student.fechaNacimiento,
        antecedentesSalud: student.antecedentesSalud
    }))

    return (
        <>
            {
                loading
                    ? (
                        <FullScreenLoading />
                    )
                    : (
                        <>
                            {/* <ExcelFile element={<button>Exportar a excel</button>} filename="Usuarios">
                                <ExcelSheet data={students} name="Usuario">
                                    <ExcelColumn label="Nombre" value="nombre" />
                                    <ExcelColumn label="Apellido" value="apellido" />
                                    <ExcelColumn label="Dni" value="dni" />
                                    <ExcelColumn label="Actividad" value="actividad" />
                                    <ExcelColumn label="Telefono" value="telefono" />
                                    <ExcelColumn label="Nsocio" value="nsocio" />
                                    <ExcelColumn label="AntecedentesSalud" value="antecedentesSalud" />
                                    <ExcelColumn label="Categoria" value="categoria" />
                                </ExcelSheet>
                            </ExcelFile> */}
                            <Typography id="total-alumnos" variant='h6' style={{ marginBottom: '-60px' }}><i>Total de {counter} alumnos</i></Typography>
                            <div className='buscador'>
                                <TextField
                                    id='text-buscador'
                                    label="Búsqueda por nombre, apellido o actividad"
                                    variant="outlined"
                                    value={search}
                                    onChange={handleChange}
                                    style={{ minWidth: window.screen.width < 950 ? '100px' : '500px', maxWidth: window.screen.width < 950 ? '170px' : '700px' }}
                                />
                                <button
                                    id='button-buscador'
                                    className={`btn`}
                                    onClick={() => search ? findByName(search) : getStudents()}
                                >
                                    <Search />
                                </button>
                                <button
                                    id='button-buscador-cancelar'
                                    className={`btn`}
                                    onClick={() => getStudents()}
                                >
                                    <Close />
                                </button>
                            </div>
                            <Grid className="fadeIn">
                                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        pageSize={10}
                                        rowsPerPageOptions={[10]}
                                    />
                                </Grid>
                            </Grid>
                            <Typography id="total-alumnos2" variant='h6' style={{ marginBottom: '-60px' }}><i>Total de {counter} alumnos</i></Typography>
                        </>
                    )
            }

        </>
    )
}
