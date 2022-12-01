import mongoose from "mongoose";

const Likes = mongoose.model('Likes', new mongoose.Schema({
    userid : {type:String,required:true,ref:'userid'},
    postid: {type:String,required:true,ref:'postid'}
}));

export default Likes;