const User = require('../model/user.model')


const signUp = async (req, res)=>{
    const userData = req.body;

    // console.log(userData);
    const user = await User.create(userData)

    res.json({
        message:"User signed up successfully",
        user
    })
}

module.exports = {
    signUp
}