const { options } = require('../options/mariaDB');
const knex = require('knex')(options);

// Crea la tabla de productos
const Productos = {
    // Guarda el producto en la tabla
    async save(product) {
        try {
            await knex('productos').insert(product);
        } catch (err) {
            console.log(err);
        }
    },
    // Actualiza el producto por su id
    async updateById(id, product) {
        try {
            await knex('productos').where({ id: id }).update(product);
        } catch (e) {
            console.log(e);
        } finally {
            // await knex.destroy();
        }
    },
    // Obtiene el producto con el id pedido
    async getById(id) {
        try {
            const rows = await knex('productos').where({id: id});
            return rows;
        } catch (e) {
            console.log(e);
        } finally {
            // await knex.destroy();
        }
    },
    // Obtiene todos los productos de la tabla
    async getAll() {
        try {
            const rows = await knex.from('productos').select('*');
            return rows;
        } catch (e) {
            console.log(e);
        } finally {
            // await knex.destroy();
        }
    },
    // Elimina el producto por su id
    async deleteById(id) {
        try {
            await knex('productos').where({ id: id }).del();
        } catch (e) {
            console.log(e);
        } finally {
            // await knex.destroy();
        }
    },
    // Elimina todos los productos de la tabla
    async deleteAll() {
        try {
            await knex('productos').del();
        } catch (e) {
            console.log(e);
        } finally {
            // await knex.destroy();
        }
    }
};

module.exports = Productos;