import express from 'express';
import { connectDB } from './congig/db.js';

const app = express();

app.get('/products', (req, res) => {
     
})

app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port http://localhost:5000');
})