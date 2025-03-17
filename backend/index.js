import express, { json } from 'express';
import { connectDB } from './congig/db.js';
import Product from './models/product.model.js';

const app = express();

app.use(express.json()) // allow us to accept JSON data in the req.body

app.post('/api/products', async (req, res) => {
    const product = req.body // user send this data

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all field" })
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save()
        res.status(201).json({ success: true, data: newProduct})
    } catch (error) {
        console.error("Error in create Product", error)
        res.status(500).json({ success: false, message: "Server Error"}) // status code 500 for inner server error
    }
})

app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port http://localhost:5000');
})