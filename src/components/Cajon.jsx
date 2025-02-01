import React from 'react';
import { makeStyles } from '@mui/styles';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

const estilos = makeStyles((theme) => ({
    drawer: {
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
    },
    toolbar: theme.mixins.toolbar,
}));

const Cajon = ({ opcionActiva, cambiarOpcion }) => {
    const classes = estilos();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <div className={classes.toolbar}></div>
            <List>
                {/* Opción 1: Registrar Producto */}
                <ListItem
                    button
                    selected={opcionActiva === 'registrarProducto'}
                    onClick={() => cambiarOpcion('registrarProducto')}
                >
                    <ListItemText primary="Registrar Producto" />
                </ListItem>

                {/* Opción 2: Registrar Local */}
                <ListItem
                    button
                    selected={opcionActiva === 'registrarLocal'}
                    onClick={() => cambiarOpcion('registrarLocal')}
                >
                    <ListItemText primary="Registrar Local" />
                </ListItem>

                {/* Opción 3: Inventario por local */}
                <ListItem
                    button
                    selected={opcionActiva === 'inventarioLocal'}
                    onClick={() => cambiarOpcion('inventarioLocal')}
                >
                    <ListItemText primary="Asignar productos" />
                </ListItem>

                {/* Opción 4: Inventario Lista */}
                <ListItem
                    button
                    selected={opcionActiva === 'listaInventario'}
                    onClick={() => cambiarOpcion('listaInventario')}
                >
                    <ListItemText primary="Inventario por local" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Cajon;