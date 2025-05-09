const mongoose = require('mongoose');
require('dotenv').config()

function check(){

    mongoose.connect('mongodb://localhost:27017/taskDB')
    .then(()=>console.log('connected'))
    .catch((error)=>console.log(error))
}

module.exports= {check};