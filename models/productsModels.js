const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: [true, 'Product name is required']
        },
        quantity : {
            type : Number,
            required: true,
            default: 0
        },
        price : {
            type : Number,
            required: true,
            default: 0
        },
        total : {
            type : Number,
            required: true,
            default: 0
        },
    
        // user : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    },
        {timestamps: true }
    
    );




const Product = mongoose.model('Product', productSchema);

module.exports = Product;
