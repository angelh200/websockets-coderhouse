const { options: mariaOptions } = require('./options/mariaDB');
const { options: sqliteOptions } = require('./options/sqliteDB');
const knex = require('knex');
const mariaDB = knex(mariaOptions);
const sqliteDB = knex(sqliteOptions);
const fs = require('fs');

(async () => {
    try {
        const productos = JSON.parse(await fs.promises.readFile('./productos.json', 'utf-8'));
        const mensajes = JSON.parse(await fs.promises.readFile('./mensajes.json', 'utf-8'));

        await mariaDB.schema.dropTableIfExists('productos');
        await sqliteDB.schema.dropTableIfExists('mensajes');

        console.log('- Se crean las tablas productos y mensajes');
        await mariaDB.schema.createTable('productos', (table) => {
            table.increments('id');
            table.string('title');
            table.integer('price');
            table.string('thumbnail');
        });
        await sqliteDB.schema.createTable('mensajes', (table) => {
            table.increments('id');
            table.string('email');
            table.timestamp('date').defaultTo(sqliteDB.fn.now());
            table.string('msg');
        });

        console.log('- Se limpia la tabla');
        await mariaDB('productos').del();
        await sqliteDB('mensajes').del();

        console.log('- Se cargan los productos iniciales en la tabla');
        await mariaDB('productos').insert(productos);
        await sqliteDB('mensajes').insert(mensajes);

        console.log('- Se muestra los productos de la tabla');
        rowsProd = await mariaDB.from('productos').select('*');
        rowsMsg = await sqliteDB.from('mensajes').select('*');
        for (let row of rowsProd) {
            console.log(`${row['id']} ${row['title']} ${row['price']} ${row['thumbnail']}`);
        }
        for (let row of rowsMsg) {
            console.log(`${row['id']} ${row['email']} ${row['date']} ${row['msg']}`);
        }
    } catch (e) {
        console.log(e);
    } finally {
        await mariaDB.destroy();
        await sqliteDB.destroy();
    }
})();