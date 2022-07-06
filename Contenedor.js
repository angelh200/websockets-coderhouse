const fs = require('fs');
const fsPromises = fs.promises;

class Contenedor {
    constructor(fileName) {
        this.filePath = `./${fileName}.txt`;
        this.items = [];
        fs.open(this.filePath, 'r', (err, fd) => {
            if(err) {
                // Se crea el archivo si no existe
                fs.writeFileSync(this.filePath, JSON.stringify(this.items, null, 2));
            } else {
                // Se lee el archivo si existe
                this.items = JSON.parse(fs.readFileSync(this.filePath, {encoding: 'utf-8'}));
            }
        });
    }

    // Guarda un nuevo objeto en el array y le asigna un nuevo Id
    async save(obj) {
        try {
            let newId = 0;
            const size = this.items.length;
            if(size) {
                newId = this.items[size - 1].id + 1;
            }
            const newItem = {...obj, id: newId};
            this.items.push(newItem);

            await fsPromises.writeFile(this.filePath, JSON.stringify(this.items, null, 2));
            return newId;
        } catch(err) {
            console.log('No se pudo guardar el objeto', err);
        }
    }

    async updateById(id, product) {
        try{
            const items = await this.getAll();
            const itemIndex = items.findIndex(el => el.id == id);
            const newProduct = {...product, id};
            items[itemIndex] = newProduct;
            await fsPromises.writeFile(this.filePath, JSON.stringify(items, null, 2));
            return newProduct;
        } catch(err) {
            console.log('Error al actualizar', err);
        }
    }

    async getById(id) {
        try {
            const items = await this.getAll();
            const foundItem = items.find(el => el.id == id);
            if (!foundItem) return null;
            return foundItem;
        } catch(err) {
            console.log('error al obtener el item', err);
        }
    }

    async getAll() {
        try {
            const items = JSON.parse(await fsPromises.readFile(this.filePath));
            return items;
        } catch(err) {
            console.log('No se puedo leer el archivo', err);
        }
    }

    getAllSync() {
        return JSON.parse(fs.readFileSync(this.filePath, {encoding: 'utf-8'}));
    }

    async deleteById(id) {
        try {
            const items = await this.getAll();
            const arrayIndex = items.findIndex(el => el.id == id);
            if(arrayIndex === -1) {
                console.log(`El archivo con id:${id} no existe`);
                return null;
            }
            items.splice(arrayIndex, 1);
            await fsPromises.writeFile(this.filePath, JSON.stringify(items, null, 2));
            return id;
        } catch(err) {
            console.log('No se pudo eliminar el item', err);
        }
    }

    async deleteAll() {
        try {
            await fsPromises.writeFile(this.filePath, JSON.stringify([]));
            console.log('Se elminaron todos los elementos');
        } catch (err) {
            console.log('Hubo un error', err);
        }
    }
}

module.exports = Contenedor;