const express = require("express");
const { Router } = express;
const Product = require("../containers/product");
const isAdmin = require("../middleware/admin");

const router = Router();
const product = new Product("./data/product_data.json");

router.get("/products", async (req, res) => {
    product
        .getAll()
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
        .finally(() => {
            res.end();
        });
});

router.get("/products/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    product
        .getById(id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
        .finally(() => {
            res.end();
        });
});

router.post("/products", isAdmin, (req, res) => {
    product
        .save(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
        .finally(() => {
            res.end();
        });
});

router.delete("/products/:id", isAdmin, async (req, res) => {
    const admin = req.admin;
    if (admin === "admin") {
        const { id } = parseInt(req.params);
        product
            .deleteById(id)
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500).json(err);
            })
            .finally(() => {
                res.end();
            });
    }
});

router.put("/products/:id", async (req, res) => {
    const admin = req.admin;
    const { id } = parseInt(req.params);
    const { timestamp, name, description, code, url, price, stock } = req.body;
    if (admin === "admin") {
        product
            .updateById(id, {
                timestamp,
                name,
                description,
                code,
                url,
                price,
                stock,
                id,
            })
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    }
});

module.exports = router;
