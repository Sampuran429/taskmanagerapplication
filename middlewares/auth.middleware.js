const userModel=require('../models/user.model');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blackListToken.model');


module.exports.authUser = async (req, res, next) => {
    console.log("Token received:", req.cookies.token || req.headers.authorization);
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        req.user = user;
        console.log("Authenticated user:", req.user);
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

