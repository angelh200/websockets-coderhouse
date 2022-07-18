const { options } = require('../options/sqliteDB');
const sqliteDB = require('knex')(options);

// Crea la tabla de productos
const Mensajes = {
    // Guarda el producto en la tabla
    async save(product) {
        try {
            await sqliteDB('mensajes').insert(product);
        } catch (err) {
            console.log(err);
        }
    },
    // Actualiza el producto por su id
    async updateById(id, product) {
        try {
            await sqliteDB('mensajes').where({ id: id }).update(product);
        } catch (e) {
            console.log(e);
        } finally {
            // await sqliteDB.destroy();
        }
    },
    // Obtiene el producto con el id pedido
    async getById(id) {
        try {
            const rows = await sqliteDB('mensajes').where({id: id});
            return rows;
        } catch (e) {
            console.log(e);
        } finally {
            // await sqliteDB.destroy();
        }
    },
    // Obtiene todos los mensajes de la tabla
    async getAll() {
        try {
            const rows = await sqliteDB.from('mensajes').select('*');
            return rows;
        } catch (e) {
            console.log(e);
        } finally {
            // await sqliteDB.destroy();
        }
    },
    // Elimina el producto por su id
    async deleteById(id) {
        try {
            await sqliteDB('mensajes').where({ id: id }).del();
        } catch (e) {
            console.log(e);
        } finally {
            // await sqliteDB.destroy();
        }
    },
    // Elimina todos los mensajes de la tabla
    async deleteAll() {
        try {
            await sqliteDB('mensajes').del();
        } catch (e) {
            console.log(e);
        } finally {
            // await sqliteDB.destroy();
        }
    }
};

module.exports = Mensajes;