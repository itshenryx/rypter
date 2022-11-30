import mongoose from "mongoose";

const Likes = mongoose.model('Likes', new mongoose.Schema({
    userid : {type:String,required:true},
    postid: {type:String,required:true}
}));

export default Likes;