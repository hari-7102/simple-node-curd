const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Product = require('./models/productsModels');
const ProductRoutes = require('./routes/productRoutes');


//middleware
app.use(express.json());


//router
app.use('/api/products', ProductRoutes);








//post to products
// app.post('/api/products', async (req, res) => {
//     try {
//         const products = await Product.create(req.body);
//         res.status(200).json(products);
//     }catch (error) {
//         res.status(500).json({message: error.message});
//     }

// });


//get all products
// app.get('/api/products' , async (req, res) => {
//     try {
//         const ProductData = await Product.find();
//         res.status(200).json(ProductData);
//     }catch (error) {
//         res.status(500).json({message: error.message});
//     }
// })

//update products
// app.put('/api/products/:id', async (req, res) => {
//     try{
//         const {id} = req.params;
//         const UpdateProducst = await Product.findByIdAndUpdate(id , req.body);
//         res.status(200).json(UpdateProducst);
//     }catch (error) {
//         res.status(500).json({message: error.message}); 
//     }
// });


//Delete products
// app.delete('/api/products/:id', async (req, res) => {
//     try{
//         const {id} = req.params;
//         const DeleteProducst = await Product.findByIdAndDelete(id);
//         if(!DeleteProducst){
//             return res.status(404).json({message: `cannot find any product with ID ${id}`});
//         }
//         res.status(200).json("Product Deleted Successfully");   
//     }catch (error) {
//         res.status(500).json({message: error.message}); 
//     }
// });



mongoose.connect("mongodb+srv://hariharanbvn28:DevilkingMongodb007@cluster0.tscfgvn.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Connected to MongoDB")
    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    });
})
.catch(() => {
    console.log("Error connecting to MongoDB")
});

