const fs = require("fs");

class Product {
    constructor(fileName) {
        this.fileName = fileName;
        this.data = [];
    }

    readFile = async () => {
        const data = await fs.promises.readFile(this.fileName, "utf8");
        this.data = JSON.parse(data);
        return this.data;
    };

    getAll = async () => {
        const data = await this.readFile();
        return this.data;
    };

    getRandom = async () => {
        const data = await this.getAll();
        const randomIndex = Math.floor(Math.random() * data.length);
        return data[randomIndex];
    };

    getById = async (id) => {
        const data = await this.getAll();
        const product = data.find((product) => product.id === id);
        return product;
    };

    save = async (products) => {
        const data = await this.getAll();
        const maxId = data.reduce((max, product) => {
            return product.id > max ? product.id : max;
        }, 0);
        const id = maxId + 1;
        const product = {
            id,
            ...products,
        };

        const maxLength = data.length;
        this.data[maxLength] = product;
        await fs.promises.writeFile(this.fileName, JSON.stringify(this.data));
        return id;
    };

    deleteById = async (id) => {
        const data = await this.getAll();
        const index = data.findIndex((product) => product.id === id);
        data.splice(index, 1);
        await fs.promises.writeFile(this.fileName, JSON.stringify(data));
    };

    updateById = async (id, product) => {
        const data = await this.getAll();
        const index = data.findIndex((product) => product.id === id);
        data[index] = product;
        await fs.promises.writeFile(this.fileName, JSON.stringify(data));
    };

    deleteAll = async () => {
        this.data = [];
        await fs.promises.writeFile(this.fileName, JSON.stringify([]));
    };
}

exports = module.exports = Product;
