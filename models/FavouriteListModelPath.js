
//for path Fav
const  mongoose = require("mongoose");

const FavouriteListPathSchema= new mongoose.Schema({
    user_id:{ type: String , required:true},
    list:{ type: [String], required:true , default:[]},

})
module.exports=mongoose.model('FavouriteListPath',FavouriteListPathSchema)
