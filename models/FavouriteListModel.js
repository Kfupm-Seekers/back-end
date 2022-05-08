const  mongoose = require("mongoose");

const FavouriteListSchema= new mongoose.Schema({
    user_id:{ type: String , required:true},
    list:{ type: [String], required:true , default:[]},

})
module.exports=mongoose.model('FavouriteList',FavouriteListSchema)