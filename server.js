const express = require("express");
const { Router } = express;
const Product = require("./product");
const Cart = require("./cart");

const app = express();
const router = Router();
const product = new Product("product_data.json");
const cart = new Cart("cart_data.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

router.post("/products", (req, res) => {
    let admin = req.headers.admin;
    if (admin === "true") {
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
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
});

router.delete("/products/:id", async (req, res) => {
    let admin = req.headers.admin;
    if (admin !== "admin") {
        res.status(401).json({ message: "Unauthorized" });
        return;
    } else {
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
    let admin = req.headers.admin;
    const { id } = parseInt(req.params);
    const { timestamp, name, description, code, url, price, stock } = req.body;
    if (admin !== "admin") {
        res.status(401).json({ message: "Unauthorized" });
        return;
    } else {
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

app.use("/api", router);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

server.on("error", (err) => {
    console.log(err);
});
