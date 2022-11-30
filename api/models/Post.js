import mongoose from "mongoose";

const Post = mongoose.model('Post', new mongoose.Schema({
    text: {type:String},
    author: {type:String,required:true},
    title: {type:String,required:true},
    date: {type:String,required:true},
    postid: {type:String,required:true},
    boardid: {type:String,required:true},
    img: {type:String,required:true}
}));

export default Post;