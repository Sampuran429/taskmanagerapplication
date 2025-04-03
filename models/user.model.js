const mongoose= require('mongoose');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');

const userSchema= new mongoose.Schema(
    {
        //check
        fullname : {
            firstname : {
                type: String,
                required: true,
                minlength: [3, 'First name must be at least 3 characters long'],
            },
            lastname : {
                type: String,
                required: true,
                minlength: [3, 'Last name must be at least 3 characters long'],
            },
        },
        email : {
            type : String,
            required : true,
            unique : true,
            minlength: [5, 'Email must be at least 5 characters long'],
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'],
        },
        password : {
            type : String,
            required : true,
            select : true, //check
        }
    },
    {timestamps: true}
);

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


userSchema.statics.isEmailTaken = async function (email) {
    return !!(await this.findOne({ email }));
};


userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};


module.exports = mongoose.model('User', userSchema);
