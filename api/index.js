const express = require("express");
const app = express();
const cors = require('cors');
const port = 8080;

const write = require("./master_db.js");
const read = require("./slave_db.js");

app.use(cors());
app.use(express.json());

app.post('/add_product', async (req, res) => {
    const { name, stock, price } = req.body;
    const addProduct = await write.query(`INSERT INTO product (name, stock, price) VALUES ('${name}', ${stock}, ${price})`);
    if (addProduct.rowCount > 0) {
        console.log("Query Success", {
            status: "success",
            message: "Product added successfully",
            data: {
                name,
                stock,
                price
            }
        });
        res.send({
            status: "success",
            message: "Product added successfully",
            data: {
                name,
                stock,
                price
            }
        });
    } else {
        console.log("Query failed", {
            status: "error",
            message: "Product not added"
        });
        res.send({
            status: "error",
            message: "Product not added"
        });
    }
});

app.get('/get_products', async (req, res) => {
    const { search } = req.query;
    const getProducts = await read.query(`SELECT * FROM product WHERE name LIKE '%${decodeURI(search)}%'`);
    if (getProducts.rows.length > 0) {
        console.log("Query success", {
            status: "success",
            message: "Products found",
            data: getProducts.rows
        });
        res.send({
            status: "success",
            message: "Products found",
            data: getProducts.rows
        });
    } else {
        console.log("Query failed", {
            status: "error",
            message: "No products found"
        });
        res.send({
            status: "error",
            message: "No products found"
        });
    }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});