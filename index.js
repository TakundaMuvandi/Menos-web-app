const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const ejsmate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');





// imported models
const Product = require('./models/product');
const User = require('./models/user')
const catchAsync = require('./functions/catchAsync');
const AppError = require('./functions/AppError');
const { error } = require('console');


mongoose.connect('mongodb://localhost:27017/menos')
    .then(() => {
        console.log("CONNECTION NOW OPEN!");
    })
    .catch(err => {
        console.log("Critical ERROR!");
        console.log(err);
    });

app.engine('ejs', ejsmate)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


const sessionConfig = {
    secret: 'ehhh!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        // security feature 
        // httponly: prevents the cookie from being accessed through client side script 
        httpOnly: true,
        //session time of only and hour
        expires: Date.now() + 1000 * 60 * 60 * 1,
        maxAge: + 1000 * 60 * 60 * 1,
    }
}


app.use(session(sessionConfig));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.loggedUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


app.get('/home', (req, res) => {
    res.render('home', { session: req.session })
})

app.post('/home', (req, res) => {
    req.render(req.body)

})

app.get('/login', catchAsync((req, res) => {
    res.render('login')
}));

app.post('/login', passport.authenticate('local', {failureFlash:true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'welcome back to Menos');
    res.redirect('/products')
});


app.post('/logout', (req, res) => {

    req.session.destroy();
    res.redirect('/login');
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', catchAsync(async (req, res, next) => {
   try{
    const { email, password, username } = req.body;
    const user = new User({email, username});
    const registeredUser = await User.register(user, password);
   req.flash('success', 'Welcome to Menos!');
   res.redirect('/products');
   } catch (e){
    req.flash('error', e.message);
    res.redirect('signup');
   }
}));



app.get('/products', catchAsync(async (req, res, next) => {

    if (!req.isAuthenticated()) {
        req.flash('error', 'You are not logged in')
        return res.redirect('/login')
    }

    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category: category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
    const products = await Product.find({})
    res.render('products/index', { products })
}))

app.get('/products/new', catchAsync((req, res, next) => {

    if (!req.isAuthenticated()) {
        req.flash('error', 'You are not logged in')
        return res.redirect('/login')
    }

    const categories = ['plumbing', 'electrical supplies', 'hardware materials', 'tools', 'paints']
    res.render('products/new', { categories });
}))

app.post('/products', catchAsync(async (req, res, next) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    req.flash('success', 'New Product successfully created!');
    res.redirect(`/products/${newProduct._id}`)
}))

app.get('/products/:id', catchAsync(async (req, res, next) => {

    if (!req.isAuthenticated()) {
        req.flash('error', 'You are not logged in')
        return res.redirect('/login')
    }

    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
        req.flash('error', 'Product does not exist');
        return res.redirect('/products');
    }
    res.render('products/show', { product })
}));

app.get('/products/:id/edit', catchAsync(async (req, res, next) => {

    if (!req.isAuthenticated()) {
        req.flash('error', 'You are not logged in')
        return res.redirect('/login')
    }

    const { id } = req.params;
    const categories = ['plumbing', 'electrical supplies', 'hardware materials', 'tools', 'paints']
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories })
}))

app.put('/products/:id', catchAsync(async (req, res, next) => {

    if (!req.isAuthenticated()) {
        req.flash('error', 'You are not logged in')
        return res.redirect('/login')
    }

    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true });
    req.flash('success', 'Product successfully updated!');
    res.redirect(`/products/${product._id}`);
}))

app.delete('/products/:id', catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    req.flash('success', 'Product successfully deleted!');
    res.redirect('/products');
}))

//Error handling Middle Ware
app.all('*', (req, res, next) => {
    next(new AppError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Error something went wrong' } = err;
    res.status(status).render('error', { error: err });
})

app.listen(2000, () => {
    console.log('Listening on port 2000')
})

