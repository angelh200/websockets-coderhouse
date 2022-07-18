const express = require('express');
const router = express.Router();
const productoController = require('../../controller/productController');

// Devulve todos los productos
router.get('/', productoController.getAll);

// Devuelve un producto segun el id
router.get('/:id', productoController.getById);

// Agrega un producto y le asigna un nuevo id
router.post('/', productoController.save);

// Recibe y actualiza el producto segun su id
router.put('/:id', productoController.updateById);

// Elimina un producto segun el id
router.delete('/:id', productoController.deleteById);

module.exports = router;