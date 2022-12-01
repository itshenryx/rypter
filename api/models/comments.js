import mongoose from "mongoose";

const Comments = mongoose.model('Comments', new mongoose.Schema({
    user : {type:String,required:true,ref: 'userid'},
    text: {type:String,required:true, ref: 'comment_text'},
    postid:{type:String,required:true, ref: 'postid'}
}));

export default Comments;