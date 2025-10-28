const express = require('express');
const app = express();
const userRoutes = require('./view/user.routes')
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config();


app.use(userRoutes)


//database connection code
const mongoose = require('mongoose')
const uri = process.env.MONGO_URI

mongoose.connect(uri)
.then(()=>console.log("Database connected"))
.catch(err=>console.log(err.message))


//data base connection code ends here


app.get("/", (req, res)=>{
    res.send("Welcome to user management API")
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`server is live on port ${PORT}, http://localhost:${PORT}`)
})