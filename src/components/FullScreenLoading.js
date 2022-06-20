import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

export const FullScreenLoading = () => {
    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            height='calc(100vh - 300px)'
        >
            <Typography sx={{ mb: 3 }} variant="h2" fontWeight={700} fontSize={25}>Cargando...</Typography>
            <CircularProgress thickness={6} />
        </Box>
    )
}
