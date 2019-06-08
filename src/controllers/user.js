const mongoose = require('mongoose');
const sharp = require('sharp');
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account');
const bcrypt = require('bcryptjs');
const moment = require('moment');

// Load models
const User = require('../models/user');

exports.create_user = async (req,res) => {

    const user = new User({
        ...req.body,
        lastLoginAt: moment()
    });

    try {

        const userExists = await User.findOne({email: req.body.email});
        if(userExists) {
            throw new Error('This email is already used.')
        }
        await user.save();
        // sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();
        res.status(201).json({ 
            user,
            token 
        });
    } catch(err) {
        console.log(err);
        res.status(400).json({errors: [{msg: err.message}]});
    }

}

exports.login_user = async (req,res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        user.lastLoginAt = moment();
        user.save();

        res.json({
            user,
            token
        });

    } catch (err) {
        console.log(err);
        res.status(400).json({ errors: [{ msg: err.message }] });
    }

}

exports.user_profile = (req,res) => {
    res.json(req.user);
};

exports.delete_user_account = async (req,res) => {
    try {
        await req.user.remove();
        sendCancelEmail(req.user.email, req.user.name);
        res.json(req.user);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.user_logout = async (req,res) => {

    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.body.token
        })
        await req.user.save()

        res.json(req.user);

    } catch(err) {
        console.log(err);
        res.status(500).json({ errors: [{ msg: err.message }] });
    }
}

exports.user_logout_all = async (req,res) => {

    try {
        req.user.tokens = [];
        req.user.save();
        res.json(req.user);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.update_user_profile = async (req,res) => {

    const updates = Object.keys(req.body);
    const updatesAllowed = ['name', 'email', 'currentPassword', 'password'];
    const isValid = updates.every((update) => updatesAllowed.includes(update));

    

    try {

        if(!isValid) {
            throw new Error('Invalid updates!');
        }

        if(req.body.currentPassword) {
            const isMatch = await bcrypt.compare(req.body.currentPassword, req.user.password)
            if(!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Current password is not correct' }]});
            }
        }

        updates.forEach(update => req.user[update] = req.body[update] );
        await req.user.save();

        res.json(req.user);
    } catch(err) {
        console.log(err.message);
        res.status(400).json({ errors: [{ msg: err.message }] });
    }
}

exports.upload_avatar = async (req,res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.json();
}, (error, req, res, next) => {
    console.log(error.message)
    res.status(400).json({error: error.message});
};

exports.delete_avatar = async (req,res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.json();
};

exports.get_avatar = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (err) {
        console.log(err)
        res.status(404).json({error: error.message});
    }
    

};