import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const RegistrarLocal = () => {
    const [formData, setFormData] = useState({
        codigo: '',
        descripcion: '',
        direccion: '',
        usuarioCreacion: '',
        estado: 1, 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

    
        const local = {
            ...formData,
            fecha_creacion: new Date().toISOString(), 
            fecha_modificacion: new Date().toISOString(), 
        };

        try {
            // Enviar los datos a la API
            const response = await fetch('http://localhost:8080/sucursal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(local), 
            });

            if (!response.ok) {
                throw new Error('Error al enviar los datos');
            }

            const data = await response.json(); 
            console.log('Respuesta del servidor:', data);

            
            setFormData({
                codigo: '',
                descripcion: '',
                direccion: '',
                usuarioCreacion: '',
                estado: 1,
            });

            alert('Local registrado exitosamente');
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al registrar el local');
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <Typography variant="h5" gutterBottom>
                Registrar Local
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Código"
                            name="codigo"
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

                   
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Dirección"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            required
                        />
                    </Grid>

                    
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Usuario de Creación"
                            name="usuarioCreacion"
                            value={formData.usuarioCreacion}
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
                        <Button type="submit" variant="contained" color="primary">
                            Registrar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default RegistrarLocal;