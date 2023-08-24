const router = require('express').Router();
const User = require('../models/user');
const { ensureAuthenticated } = require('../config/passport');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const passport = require('passport');
const jwtSecret = process.env.JWT_SECRET;

router.get('/login', async (req, res) => {
    if(req.message){
        res.render("login", { message: req.message });
    }
    else{
    res.render("login", { message: '' });}
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const jwtSecret = process.env.JWT_SECRET;
    const user = await User.findOne({ email: email });
    if (!user) {
        req.message = 'User not found';
        return res.redirect('/auth/login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        req.message = 'Invalid credentials';
        return res.redirect('/auth/login');
    }

    const token = jwt.sign({ sub: user.uuid }, jwtSecret, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration




    passport.authenticate('local', {
        successRedirect: '/', // Redirect after successful login
        failureRedirect: '/auth/login', // Redirect if login fails
        failureFlash: true, // Enable flash messages for login failures
        session: true,
    })(req, res);

})




router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            uuid: uuidv4(),

        });

        await newUser.save();


        const token = jwt.sign({ sub: newUser.uuid }, jwtSecret, { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration
        passport.authenticate('local', {
            successRedirect: '/auth/login', // Redirect after successful login
            failureRedirect: '/auth/signup', // Redirect if login fails
            failureFlash: true, // Enable flash messages for login failures
            session: true,
        })(req, res);
        // Redirect to login page or dashboard after successful signup
    } catch (error) {
        // Handle error appropriately
        res.render('signup', { message: 'An error occurred during signup. <br/>' + error });
    }
});
router.get('/signup', async (req, res) => {

    res.render("signup", { message: '' });
});

router.get('/logout', async (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/auth/login');
});
module.exports = router;