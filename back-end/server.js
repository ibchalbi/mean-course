import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Post from './models/Post';
import { runInNewContext } from 'vm';

const app= express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/posts');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connected')
});

router.route('/posts').get((req, res) => {
    Post.find((err, posts) => {
        if (err)
            console.log(err);
        else
            res.json(posts);
    });
});


router.route('/posts/:id').get((req, res) =>{
    Post.findById(req.params.id,(err, post)=>{
        if (err)
        console.log(err);
    else
        res.json(post);
    });
});


router.route('/posts/add').post((req, res) =>{
  let post = new Post(req.body);
  post.date=new Date();
  post.save().then(post => {
      res.status(200).json({'post': 'added post'});
  }).catch(err => {
      res.status(400).send('failed to add');
  });
  
});

router.route('/posts/update/:id').post((req, res) =>{
    Post.findById(req.params.id, (err,post) => {
        if (!post)
            return runInNewContext(new Error('Could not load dox'));
        else
        {
            
            post.title = req.body.title;
            post.responsible = req.body.responsible;
            post.content=req.body.content;
            post.description=req.body.description;
            
            post.save().then(post=>{
                res.json('Update done');
            }).catch(err=>{
                res.status(400).send('update failed');
            });
        }
    });
    
  });

  router.route('/posts/delete/:id').get((req, res) =>{
    Post.findByIdAndRemove({_id: req.params.id},(err, post) =>{
        if(err)
            res.json(err);
        else    
            res.json("Removed succesfully");
    });
    
  });

app.use('/', router);

app.listen(4000, () => console.log('Express server is running: port 4000'));