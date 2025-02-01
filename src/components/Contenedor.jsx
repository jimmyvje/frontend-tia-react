import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Cajon from './Cajon';
import RegistrarProducto from './RegistrarProducto'; // Importa el formulario de productos
import RegistrarLocal from './RegistrarLocal'; // Importa el formulario de locales
import BuscarProductoYLocales from './AsignarProductoLocal';
import ListarStockSucursal from './ListarStockSucursal';

const estilos = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginLeft: 240, // Ajusta este valor según el ancho del Drawer
    },
}));

const Contenedor = () => {
    const classes = estilos();
    const [opcionActiva, setOpcionActiva] = useState(null);

    const handleCambiarOpcion = (opcion) => {
        setOpcionActiva(opcion);
    };

    return (
        <div className={classes.root}>
            
            <Cajon opcionActiva={opcionActiva} cambiarOpcion={handleCambiarOpcion} />

            
            <main className={classes.content}>
                <div className={classes.toolbar}></div>
                {opcionActiva === 'registrarProducto' && <RegistrarProducto />}
                {opcionActiva === 'registrarLocal' && <RegistrarLocal />} 
                {opcionActiva === 'inventarioLocal' && <BuscarProductoYLocales />} 
                {opcionActiva === 'listaInventario' && <ListarStockSucursal />} 
                {!opcionActiva && <p>Selecciona una opción del menú</p>}
            </main>
        </div>
    );
};

export default Contenedor;