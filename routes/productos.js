const express = require('express');
const router = express.Router();
const Contenedor = require('../Contenedor');

const productos = new Contenedor('productos');

// Devulve todos los productos
router.get('/', (req, res) => {
    productos.getAll().then(data => res.send(data));
});

// Devuelve un producto segun el id
router.get('/:id', (req, res) => {
    productos.getById(req.params.id)
        .then(data => res.send(data));
});

// Agrega un producto y le asigna un nuevo id
router.post('/', (req, res) => {
    console.log('se hico un post', req.body);
    productos.save(req.body).then(id => {
        const newProduct = {...req.body, id};
        res.send(newProduct);
    });
});

// Recibe y actualiza el producto segun su id
router.put('/:id', (req, res) => {
    productos.updateById(req.params.id, req.body)
        .then(data => res.send(data));
});

// Elimina un producto segun el id
router.delete('/:id', (req, res) => {
    productos.deleteById(req.params.id)
        .then(data => res.send(data));
});

module.exports = router;