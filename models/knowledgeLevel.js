const knowledgeLevelSchema= new mongoose.Schema({
    userID:{ type: Number , required:true},
    questionID:{ type: Number , required:true},
    score:{type: Number , required:true}
})
//path end

module.exports= mongoose.model('Path',knowledgeLevelSchema);