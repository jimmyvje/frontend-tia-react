import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@mui/material';

const ListarStockSucursal = () => {
    const [stockSucursal, setStockSucursal] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Función para obtener los datos del API
    const obtenerStockSucursal = async () => {
        try {
            const response = await fetch('http://localhost:8080/stockSucursal/listar');
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            const data = await response.json();
            setStockSucursal(data);
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setError('Error al obtener los datos');
            setLoading(false);
        }
    };

    
    useEffect(() => {
        obtenerStockSucursal();
    }, []);

    
    if (loading) {
        return (
            <Paper elevation={3} style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                <CircularProgress />
                <Typography variant="body1" style={{ marginTop: '10px' }}>Cargando datos...</Typography>
            </Paper>
        );
    }

    
    if (error) {
        return (
            <Paper elevation={3} style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                <Typography color="error">{error}</Typography>
            </Paper>
        );
    }

    // Mostrar la tabla
    return (
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <Typography variant="h5" gutterBottom>
                Stock de Productos por Sucursal
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Código del Producto</TableCell>
                            <TableCell>Descripción del Producto</TableCell>
                            <TableCell>Descripción de la Sucursal</TableCell>
                            <TableCell>Dirección de la Sucursal</TableCell>
                            <TableCell>Cantidad</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stockSucursal.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.codigoProducto}</TableCell>
                                <TableCell>{item.descripcionProducto}</TableCell>
                                <TableCell>{item.descripcionSucursal}</TableCell>
                                <TableCell>{item.direccionSucursal}</TableCell>
                                <TableCell>{item.cantidad}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ListarStockSucursal;