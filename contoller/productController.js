

const Product = require('../models/productsModels');



const createProducts = async(req, res) => {
    try {
        const products = await Product.create({...req.body, user: req.user._id, });
        res.status(200).json(products);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
};


const getAllProducts = async (req, res) => {
    try {
        
        console.log("Current logged in user:", req.user); 
        const ProductData = await Product.find({ user: req.user._id });
        // console.log("products data" , ProductData)
        res.status(200).json(ProductData);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateProducts = async (req, res) => {
    try{
        const {id} = req.params;
        const UpdateProducst = await Product.findByIdAndUpdate(id , req.body);
        res.status(200).json(UpdateProducst);
    }catch (error) {
        res.status(500).json({message: error.message}); 
    }
}

const DeleteProducts = async (req, res) => {
    try{
        const {id} = req.params;
        const DeleteProducst = await Product.findByIdAndDelete(id);
        if(!DeleteProducst){
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }
        res.status(200).json("Product Deleted Successfully");   
    }catch (error) {
        res.status(500).json({message: error.message}); 
    }
}

module.exports = {

    createProducts,
    getAllProducts,
    updateProducts,
    DeleteProducts

};
