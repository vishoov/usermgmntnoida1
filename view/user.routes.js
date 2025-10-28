const express = require('express');
const router = express.Router();
const User = require('../model/user.model')
const { signUp } = require('../controller/user.controller');
const { createToken, verifyToken } = require('../auth/jwt.auth')
router.post("/signup", signUp)

router.post('/login', async (req, res)=>{
    const { email, password } = req.body;

const user = await User.findOne({email})




if(!user){
    return res.json({
        message:"User doesnt exist"
    })
}

const token = createToken(user);
console.log(user)

if(!user.comparePassword(password)){
    return res.json({
        message:"Incorrect password",
        user
    })
}

    res.json({
        message:"User logged in",
        userData:{
            email,
            user,
            token
        }
    })
})

router.get('/users', verifyToken, (req, res)=>{
    res.send("These are the users")
})

router.get('/users/:id', (req, res)=>{
    const { id } = req.params;

    res.json({
        message:`This is the data for user with id: ${id}`
    })
})

module.exports = router;