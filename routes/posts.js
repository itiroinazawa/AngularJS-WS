var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.connect("mongodb://localhost:27017/blogpostdb");

autoIncrement.initialize(connection);
    
var bookSchema = new Schema({
    author: { type: Number, ref: 'Author' },
    title: String,
    genre: String,
    publishDate: Date
});

var commentSchema = new mongoose.Schema({
    author: String,
    content: String,
    datePublished: Date
});

var postSchema = new Schema({
    _id: Number,
    content: String,
    keywords: String,
    permalink: String,
    tags: String,
    title: String,
    comments:[commentSchema],
    datePublished: Date,
    author: String        
});
 
commentSchema.plugin(autoIncrement.plugin, 'Comment');
postSchema.plugin(autoIncrement.plugin, 'Post');

module.exports = mongoose.model('Post', postSchema);