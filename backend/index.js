import express, { json } from 'express';
import { connectDB } from './config/db.js';
import productRoute from './routes/product.route.js'

const app = express();

app.use(express.json()) // allow us to accept JSON data in the req.body

app.use('/api/products', productRoute)

app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port http://localhost:5000');
})