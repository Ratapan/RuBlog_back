import Product from '../models/Product';

export const getProduct = async(req,res) => {
    const products = await Product.find();
    res.status(200).json(products)
};

export const getProductById = async(req,res) => {
    const products = await Product.findById(req.params.productId);
    res.status(200).json(products)
};

export const createProduct = async (req,res) => {
    const {
        name,
        category,
        price,
        imgURL} = req.body;
    const newProduct = new Product({name,category,price,imgURL})

    const productSaved = await newProduct.save()
    
    res.status(201).json(productSaved)
};

export const updateProduct = async(req,res) => {
    const productUpdated = await Product.findByIdAndUpdate(req.params.productId, req.body,{
        new: true
    });
    res.status(200).json(productUpdated)
};

export const deleteProduct = async(req,res) => {
    const productDeleted = await Product.findByIdAndDelete(req.params.productId);
    res.status(204).json()
};