const Contenedor = require('./Contenedor/Contenedor');
const express = require('express');

const port = 8090;
const app = express();
const server = app.listen(process.env.port || port, () => console.log(`Server listening on PORT ${port}`));
server.on('error', err => console.log(`Error: ${err}`));

const productos = new Contenedor('productos.txt');

app.get('/productos', async(req, res) => {
    const mostrarProductos = await productos.getAll();
    res.send(mostrarProductos);
})

app.get('/productoRandom', async(req, res) => {
    const p = await productos.getAll();
    const numeroRandom = Math.floor(Math.random() * p.length);
    res.send(p[numeroRandom]);
})