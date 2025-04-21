const mongoose = require('mongoose');
const Product = require('./models/product');
//const images =require('./images');


mongoose.connect('mongodb://localhost:27017/menos')
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })
const seedProducts = [

    {
        name: 'hammer',
        image: '/images/logo-no-background.png',
        price: 4.00,
        quantity: 10.00,
        category: 'tools'
    },
    {
        name: 'hacksaw',
        image: '/images/logo-no-background.png',
        price: 5.00,
        quantity: 10.00,
        category: 'tools'
    },
    {
        name: 'wrench',
        image: '/images/logo-no-background.png',
        price: 6.00,
        quantity: 10.00,
        category: 'tools'
    },
    {
        name: 'heater',
        image: '/images/logo-no-background.png',
        price: 10.00,
        quantity: 10.00,
        category: 'electrical supplies'
    },
    {
        name: 'lamps',
        image: '/images/logo-no-background.png',
        price: 7,
        quantity: 10,
        category: 'electrical supplies'
    },
    {
        name: 'Floor lamps',
        image: '/images/placeholder.jpg',
        price: 7,
        quantity: 10,
        category: 'electrical supplies'
    },
    {
        name: 'Farm Brick',
        image: '/images/logo-no-background.png',
        price: 0.25,
        quantity: 10,
        category: 'electrical supplies'
    },
    {
        name: 'water pipes',
        image: '/images/logo-no-background.png',
        price: 2.00,
        quantity: 10,
        category: 'plumbing'
    },

]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    }) 
