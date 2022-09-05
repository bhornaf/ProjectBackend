const express = require("express");
const { Router } = express;
const Cart = require("../containers/cart");

const router = Router();
const cart = new Cart("./data/cart_data.json");

router.get("/cart", async (req, res) => {
    cart.getAll()
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

router.get("/cart/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    cart.getById(id)
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

router.post("/cart", async (req, res) => {
    const { timestamp, products } = req.body;
    cart.save(timestamp, products)
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

router.delete("/cart/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    cart.deleteById(id)
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

router.put("/cart/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { timestamp, products } = req.body;
    cart.updateById(id, { timestamp, products })
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

module.exports = router;
