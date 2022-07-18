const { options } = require('../options/mariaDB');
const knex = require('knex')(options);

// Guarda el nuevo producto en la base de datos
const save = async (req, res) => {
    try {
        knex('productos').insert(req.body);
    } catch (err) {
        console.log(err);
    } finally {
        await knex.destroy();
    }
};

// Devuelve todos los productos
const getAll = async (req, res) => {
    try {
        const rows = await knex.from('productos').select('*');
        res.json(rows);
    } catch (e) {
        console.log(e);
    } finally {
        await knex.destroy();
    }
};

// Devuelve un producto segun el parametro id
const getById = async (req, res) => {
    try {
        const queryId = req.params.id;
        const rows = await knex('productos').where({id: queryId});
        res.json(rows);
    } catch (e) {
        console.log(e);
    } finally {
        await knex.destroy();
    }
};

// actualiza el producto segun su id
const updateById = async (req, res) => {
    try {
        await knex('productos').where({ id: req.params.id }).update(req.body);
    } catch (e) {
        console.log(e);
    } finally {
        await knex.destroy();
    }
};

// Elimina un producto segun el parametro id
const deleteById = async (req, res) => {
    try {
        await knex('productos').where({ id: req.params.id }).del();
    } catch (e) {
        console.log(e);
    } finally {
        await knex.destroy();
    }
};

module.exports = {
    save,
    getAll,
    getById,
    updateById,
    deleteById
};