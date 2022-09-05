const express = require("express");
const product = require("./routes/productRoutes");
const cart = require("./routes/cartRoutes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", product);
app.use("/api", cart);
app.get("*", (req, res) => {
    res.status(404).json({ message: "Not Found" });
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

server.on("error", (err) => {
    console.log(err);
});
