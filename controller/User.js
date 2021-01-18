const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.registerUser = async (req, res) =>  {
    try {
        const emailExists = await User.findOne({email: req.body.email});
        if(emailExists) {
            return res.status(400).send("Email already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        });
        const savedUser = await user.save();
        const {_id, name, email} = savedUser;
        res.send({id: _id, name, email});

    } catch(err) {
        res.status(400).send(err);
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            return res.status(400).send("Email does not exists");
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) {
            return res.status(400).send("Password is incorrect");
        }
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header("auth-token", token).send({token});
    } catch (err) {
        res.send("Error");
    }
};