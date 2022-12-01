import mongoose from "mongoose";

const Board = mongoose.model('Board', new mongoose.Schema({
    title : {type:String,required:true},
    text: {type:String,required:true},
    creationdate: {type:String, required:true},
    postid: {type:String,required:true},
    boardid: {type:String,required:true}
}));

export default Board;