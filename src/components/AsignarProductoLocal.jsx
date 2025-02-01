import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Paper, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const BuscarProductoYLocales = () => {
    const [codigoProducto, setCodigoProducto] = useState('');
    const [nombreProducto, setNombreProducto] = useState('');
    const [idProducto, setIdProducto] = useState(null); 
    const [locales, setLocales] = useState([]);
    const [localSeleccionado, setLocalSeleccionado] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [error, setError] = useState('');

    // Función para obtener el nombre y el ID del producto
    const buscarProducto = async (codigo) => {
        if (!codigo) {
            setNombreProducto('');
            setIdProducto(null); 
            setError('');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/producto/buscarPorCodigo?codigo=${codigo}`);
            if (!response.ok) {
                throw new Error('Producto no encontrado');
            }
            const data = await response.json();
            console.log(data[0]);
            setNombreProducto(data[0].descripcion); 
            setIdProducto(data[0].id); 
            setError('');
        } catch (error) {
            setNombreProducto('');
            setIdProducto(null); 
            setError('Producto no encontrado');
        }
    };

    // Función para obtener la lista de locales
    const obtenerLocales = async () => {
        try {
            const response = await fetch('http://localhost:8080/sucursal');
            if (!response.ok) {
                throw new Error('Error al obtener los locales');
            }
            const data = await response.json();
            setLocales(data); 
        } catch (error) {
            console.error('Error:', error);
            setError('Error al obtener los locales');
        }
    };

    
    const handleGuardar = async () => {
        if (!idProducto || !localSeleccionado || cantidad <= 0) {
            setError('Por favor, complete todos los campos y asegúrese de que la cantidad sea mayor que 0');
            return;
        }

        // Construir el JSON con los datos de la tabla stockSucursal
        const stockSucursalData = {
            productoId: idProducto, 
            sucursalId: parseInt(localSeleccionado),
            cantidad: parseInt(cantidad)
        };

        try {
            const response = await fetch('http://localhost:8080/stockSucursal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(stockSucursalData),
            });

            if (!response.ok) {
                throw new Error('Error al guardar los datos');
            }

            const result = await response.json();
            console.log('Datos guardados:', result);
            setError('');
            alert('Datos guardados exitosamente');
        } catch (error) {
            console.error('Error:', error);
            setError('Error al guardar los datos');
        }
    };

    // Obtener los locales al cargar el componente
    useEffect(() => {
        obtenerLocales();
    }, []);

   
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            buscarProducto(codigoProducto);
        }, 500); // Espera 500 ms después de que el usuario deja de escribir

        return () => clearTimeout(delayDebounceFn);
    }, [codigoProducto]);

    return (
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <Typography variant="h5" gutterBottom>
                Buscar Producto y Asignar Local
            </Typography>
            <Grid container spacing={3}>
                
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Código del Producto"
                        value={codigoProducto}
                        onChange={(e) => setCodigoProducto(e.target.value)}
                        required
                    />
                    {nombreProducto && (
                        <Typography variant="body1" style={{ marginTop: '10px' }}>
                            Nombre del Producto: {nombreProducto}
                        </Typography>
                    )}
                    {error && <Typography color="error">{error}</Typography>}
                </Grid>

                
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Seleccionar Local</InputLabel>
                        <Select
                            value={localSeleccionado}
                            onChange={(e) => setLocalSeleccionado(e.target.value)}
                            label="Seleccionar Local"
                        >
                            {locales.map((local) => (
                                <MenuItem key={local.id} value={local.id}>
                                    {local.descripcion} (Código: {local.codigo})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Cantidad"
                        type="number"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        required
                        inputProps={{ min: 1 }} 
                    />
                </Grid>

            {/* Botón: Guardar */}
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleGuardar}
                    >
                        Guardar
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default BuscarProductoYLocales;