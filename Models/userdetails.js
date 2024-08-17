
const mongoose = require('mongoose');
const userdetailsSchema = new mongoose.Schema({
    
    firstname: {
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    location:{
        type: String,
        required:true
    },
    currentaddress:{ 
        type:String,
        required:true
    },
    mobilenumber:{
        type: String,
        required:true
    },
    alternativephonenumber: {
        type:String,
        required:true
    }
   
    
   
});
const Userdetails = mongoose.model('Userdetails', userdetailsSchema);
module.exports = Userdetails