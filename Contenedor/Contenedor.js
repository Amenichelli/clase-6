const fs = require('fs');

class Contenedor {
    constructor(fileName) {
            this.fileName = fileName;
            this.arr = [];
        }
        //Genera ID
    async save(obj) {
        const objs = await this.getAll()

        let newId
        if (objs.length == 0) {
            newId = 1
        } else {
            newId = objs[objs.length - 1].id + 1
        }


        const newObj = {...obj, id: newId }
        objs.push(newObj)


        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            return newId
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    //Devuelve el objeto con el ID buscado
    async getById(id) {
            try {
                this.arr = await this.getAll();
                console.log('this.arr', this.arr);
                const obj = this.arr.find(el => el.id === Number(id));
                console.log('obj', obj);
                return obj ? obj : null;
            } catch (err) {
                console.log(err);
            }
        }
        //Devuelve un array con los objetos presentes en el archivo
    async getAll() {
            try {
                const arr = await fs.promises.readFile(this.fileName, 'utf-8');
                console.log('arr', arr);
                const arrParsed = JSON.parse(arr);
                console.log('arrParse', arrParse);
                return arrParsed;
            } catch (err) {
                console.log(err);
            }
        }
        //Elimina del archivo el objeto con el ID buscado
    async deleteById(id) {
            try {
                this.arr = await this.getAll();
                console.log('this.arr', this.arr);
                this.arr = this.arr.filter(el => el.id != Number(id));
                console.log('objDel', objDel);
                fs.promises.writeFile(this.fileName, JSON.stringify(this.arr, null, 2));
            } catch (err) {
                console.log(err);
            }
        }
        //Elimina todos los objetos guardados en el archivo
    async deleteAll() {
        try {
            this.arr = await this.getAll();
            console.log('this.arr', this.arr);
            this.arr = [];
            fs.promises.writeFile(this.fileName, JSON.stringify(this.arr, null, 2));
            console.log('this.arr', this.arr);
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = Contenedor;