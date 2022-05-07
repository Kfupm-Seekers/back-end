import mongoose from 'mongoose'
// for each clooection we make a CRUD
const pathDescriptionSchema = mongoose.Schema({

    image: String,
    lTitle: String,
    lDescription: String,
    rTitle: String,
    rDescription: String,
})

const PathDescription = mongoose.model('PathDescription', pathDescriptionSchema);
export default PathDescription;