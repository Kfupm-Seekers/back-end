
//for path Fav
const  mongoose = require("mongoose");
//path
const PathSchema= new mongoose.Schema({
    pathTitle:{ type: String , required:true},
    pathDescription:{ type: String , required:true}
})
//path end

module.exports= mongoose.model('Path',PathSchema);

