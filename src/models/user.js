const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Please provide a proper email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
        validate(value) {
            if(value.includes('password')) {
                throw new Error('The password cannot include the word "Password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    lastLoginAt: {
        type: Date
    },
    avatar: {
        type: Buffer,
        default: null
    }
},
{
    timestamps: true
});

// userSchema.methods is for an specific "user" methods
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject(); // toObject() method is provided by mongoose

    // delete this data to not send it back as a response
    delete userObject.password;
    delete userObject.tokens;
    if(userObject.avatar !== null ){
        userObject.avatar = true;
    }
    

    return userObject;
};

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
}

// userSchema.statics for "User" model methods
userSchema.statics.findByCredentials = async (email,password) => {

    const user = await User.findOne({email});

    if(!user) {
        throw new Error('Unable to login, please check your email and password and try again.');
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Unable to login, please check your email and password and try again.');
    }

    return user;
}

userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

const User = mongoose.model('Users', userSchema);

module.exports = User;