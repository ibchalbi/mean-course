import mongoose from 'mongoose';

const Schema = mongoose.Schema;

 let Post = new Schema({
     title:{
         type: String
     },
     responsible:{
         type:String
     },
     description:{
        type:String
    },
    content:{
        type:String
    },
    date:{
        type:Date,
        default: new Date()
    }

 });

 export default mongoose.model('Post', Post)