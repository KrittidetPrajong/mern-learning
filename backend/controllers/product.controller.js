import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}) // fetch all products in db
        res.status(200).json({ success: true, data: products })
    } catch (error) {
        console.log("Error in fetching products: ", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const createProduct = async (req, res) => {
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
}

export const updateProduct = async (req, res) => {
    const {id} = req.params
    const product = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid ID" })
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true})
        res.status(200).json({ success: true, data: updatedProduct })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid ID" })
    }

    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({success: true, message: "Delete Product"})
    } catch (error) {
        console.log("Error in deleting product: ", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}