import mongoose from "mongoose";

const Posts = mongoose.model('Posts', new mongoose.Schema({
    text: {type:String, ref:'text'},
    author: {type:String,required:true,ref:'author'},
    title: {type:String,required:true, ref:'title'},
    date: {type:String,required:true, ref: 'date'},
    postid: {type:String,required:true,ref:'postid'},
    boardid: {type:String,required:true,ref:'boardid'},
    img: {type:String,required:true,ref: 'img'}
}));

export default Posts;