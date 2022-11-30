import mongoose from "mongoose";

const Comments = mongoose.model('Comments', new mongoose.Schema({
    user : {type:String,required:true},
    text: {type:String,required:true},
    postid:{type:String,required:true}
}));

export default Comments;