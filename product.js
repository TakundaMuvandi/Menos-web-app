const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
   image: {
    type: String,
         required: true
   },
    
    price:{
        type: Number,
        required: true, 
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['plumbing', 'electrical supplies', 'hardware materials', 'tools','paints']
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;