const userModel= require('../models/user.model');
const blackListTokenModel = require('../models/blackListToken.model');
const bcrypt = require('bcrypt');


module.exports.registerUser=async (req,res)=>{
    try{
        const {fullname ,email, password}=req.body;
        const user=new userModel({fullname, email, password});
        const token=user.generateAuthToken();
        await user.save();

        res.status(201).json({token,user,message: 'User registered successfully'});
    }catch (error){
        res.status(500).json({ message: error.message });
    }
};


module.exports.loginUser=async (req,res) =>{
    try{
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = user.generateAuthToken();
        res.cookie('token', token);
        res.status(200).json({ token,message: 'Login successful' });

    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

module.exports.getUserProfile = async (req, res, next) => {
    console.log("Fetching user profile for:", req.user);
    res.status(200).json(req.user);
};


module.exports.logoutUser = async (req, res, next) => {
    console.log("Logout endpoint hit");
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        console.log("No token found to blacklist");
        return res.status(400).json({ message: 'No token found' });
    }

    console.log("Blacklisting token:", token);
    await blackListTokenModel.create({ token });
    res.status(200).json({ message: 'Logged out' });
};

