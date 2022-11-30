import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from 'cors';
import bcrypt from 'bcrypt';
import User from "./models/User.js";
import jwt from 'jsonwebtoken';
import Comments from "./models/comments.js";
import Board from './models/Board.js';
import Post from './models/Post.js';

const secret = 'secret123';

const port = 9000;
const url = "mongodb+srv://root:root@cluster0.ew1hmfn.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url);

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors({
    origin: 'localhost:3000',
    credentials : true,
}))

app.get('/', (req,res,next)=>{
    res.send("");
    next();
});

app.post('/register',(req,res)=>{
    const email= req.body.email;
    const username = req.body.username;
    const password = bcrypt.hashSync(req.body.password,10);
    const user = new User({email,username,password});
    user.save().then(user => {
        jwt.sign({id:user._id},secret, (err,token) => {
            if (err){
                console.log(err);
                res.sendStatus(500);
            } else {
                res.status(201).cookie('token',token).send();
            }
        })
        res.sendStatus(201);
    }).catch(e => {
        console.log(e);
        res.sendStatus(500);
    })
})

app.post('/comments', (req,res) => {
    var newcomment = new Comments();
    newcomment.user = req.body.userid;
    newcomment.text = req.body.comment_text;
    newcomment.postid = req.body.postid;
    newcomment.save();
    res.sendStatus(201).send();
})

app.get('/post-comments', async(req,res) => {
    let postcomment = await Comments.find({postid:req.body.postid});
    console.log(postcomment);
    res.send(postcomment);
})

app.get('/board-details', (req,res) => {
    let boarddetails =  Board.find({boardid:req.body.boardid});
    console.log(boarddetails);
    res.send(boarddetails);

    var query = Board.find({postid:req.body.postid});
    query.count(function (err, count) {
        if (err) {
            console.log(err)
        }
        else 
        {
            console.log("Count:", count)
            res.send(query);
        }
    });
  
})

app.post('/newpost', async(req,res) => {
    var newpost = new Post();
    newpost.text = req.body.text;
    newpost.author = req.body.author;
    newpost.title = req.body.title;
    newpost.date = req.body.date;
    newpost.boardid = req.body.boardid;
    newpost.postid = req.body.postid;
    newpost.img = req.body.img;

    let result = await newpost.save();
    console.log(result)
    res.sendStatus(201).send(result);

})

app.get('/existingpost', async(req,res) => {
    let existingpost = await Post.find({postid:req.body.postid});
    console.log(existingpost);
    res.send(existingpost);
})

app.get('/user', (req,res)=> {
    const token = req.cookies.token;
    const userInfo = jwt.verify(token,secret);
        User.findById(userInfo.id)
        .then(user => {
            res.json({username :user.username});
        })
        
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
});

app.post('/login', (req,res) => {
    const {username,password} = req.body;
    User.findOne({username}).then(user => {
        if (user && user.username){
            const passOk = bcrypt.compareSync(password,user.password);
            if (passOk) {
                jwt.sign({id:user._id},secret, (err,token) => {
                    res.cookie('token', token).send();
                });
            } else {
                res.status(422).json('Invalid username or password');
            }
        } else {
            res.status(422).json('Invalid username or password');
        }
    })
})

app.post('/logout', (req,res)=> {
    res.cookie('token', '').send();
})


// app.listen(port, () => {console.log(port)});
app.listen(4000);