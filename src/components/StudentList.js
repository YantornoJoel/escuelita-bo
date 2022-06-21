import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, TextField, Typography, Chip } from '@mui/material'

import Swal from 'sweetalert2';
import { Close, Delete, Edit, Search } from '@mui/icons-material';
import { deleteUser, findByParameters, getAll } from '../service/Student';
import { FullScreenLoading } from './FullScreenLoading';


// import ExportExcel from 'react-export-excel';

// const ExcelFile = ExportExcel.ExcelFile;
// const ExcelSheet = ExportExcel.ExcelSheet;
// const ExcelColumn = ExportExcel.ExcelColumn;



export const StudentList = () => {

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

    const onClickEdit = ({ nombre, apellido, dni, categoria, nsocio, telefono, antecedentesSalud, actividad, id }) => {
        localStorage.setItem('id', id)
        localStorage.setItem('nombre', nombre);
        localStorage.setItem('apellido', apellido);
        localStorage.setItem('dni', dni);
        localStorage.setItem('categoria', categoria);
        localStorage.setItem('nsocio', nsocio);
        localStorage.setItem('telefono', telefono);
        localStorage.setItem('antecedentesSalud', antecedentesSalud);
        localStorage.setItem('actividad', actividad);
    }

    const onClickDelete = ({ id, nombre, apellido }) => {
        // e.preventDefault();
        Swal.fire({
            title: 'Eliminar alumno',
            icon: 'warning',
            html: `<span style='color:black; min-width: 200px'> ¿Seguro que desea borrar a ${nombre} ${apellido}? </span>`,
            showCancelButton: true,
            confirmButtonColor: '#219c97',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar',
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    await deleteUser(id, nombre, apellido)
                    getStudents();
                }
            })
    }

    const columns = [
        { field: 'nombre', headerName: 'Nombre', width: 250, headerAlign: 'center', align: 'center' },
        { field: 'apellido', headerName: 'Apellido', width: 250, headerAlign: 'center', align: 'center' },
        { field: 'dni', headerName: 'Dni', width: 200, headerAlign: 'center', align: 'center' },
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
        { field: 'antecedentesSalud', headerName: 'Antecedentes de salud', width: 200, headerAlign: 'center', align: 'center' },
        { field: 'categoria', headerName: 'Categoria', width: 150, headerAlign: 'center', align: 'center', },
        {
            field: 'check',
            headerName: 'Editar',
            width: 100,
            headerAlign: 'center',
            align: 'center',
            renderCell: ({ row }) => {
                return (
                    <a href={`/create`} style={{ color: '#27929F' }} onClick={() => onClickEdit(row)}><Edit /></a>
                )
            }
        },
        {
            field: 'delete',
            headerName: 'Eliminar',
            width: 100,
            headerAlign: 'center',
            align: 'center',
            renderCell: ({ row }) => {
                return (
                    <button style={{ color: 'red', border: 'none', backgroundColor: 'white' }} onClick={(e) => onClickDelete(row)}><Delete /></button>
                )
            }
        },
    ]

    const rows = students.map(student => ({
        id: student._id,
        nombre: student.nombre,
        apellido: student.apellido,
        dni: student.dni,
        actividad: student.actividad,
        telefono: student.telefono,
        // nsocio: student.nsocio,
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
