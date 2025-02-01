import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const RegistrarProducto = () => {
    const [formData, setFormData] = useState({
        codigo: '',
        descripcion: '',
        marca: '',
        precio_compra: '',
        pvp: '',
        usuario_creacion: '',
        estado: 1, 
    });

    const [loading, setLoading] = useState(false); 


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "precio_compra" || name === "pvp" || name === "estado" ? Number(value) || '' : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const producto = {
            codigo: Number(formData.codigo), 
            descripcion: formData.descripcion,
            marca: formData.marca,
            precioCompra: Number(formData.precio_compra), 
            pvp: Number(formData.pvp), 
            usuarioCreacion: formData.usuario_creacion,
            estado: Number(formData.estado),
            fechaCreacion: new Date().toISOString(),
            fechaModificacion: new Date().toISOString()
        };

        try {
            const response = await fetch('http://localhost:8080/producto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(producto),
            });

            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status}`);
            }

            console.log(producto)
            alert('Producto registrado con éxito');
        } catch (error) {
            alert('Error al registrar el producto:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <Typography variant="h5" gutterBottom>
                Registrar Producto
            </Typography>

            

            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Código"
                            name="codigo"
                            type="number"
                            value={formData.codigo}
                            onChange={handleChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Descripción"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Marca"
                            name="marca"
                            value={formData.marca}
                            onChange={handleChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Precio de Compra"
                            name="precio_compra"
                            type="number"
                            value={formData.precio_compra}
                            onChange={handleChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="PVP"
                            name="pvp"
                            type="number"
                            value={formData.pvp}
                            onChange={handleChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Usuario de Creación"
                            name="usuario_creacion"
                            value={formData.usuario_creacion}
                            onChange={handleChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Estado</InputLabel>
                            <Select
                                name="estado"
                                value={formData.estado}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value={1}>Activo</MenuItem>
                                <MenuItem value={0}>Inactivo</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" disabled={loading}>
                            {loading ? 'Registrando...' : 'Registrar'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default RegistrarProducto;
