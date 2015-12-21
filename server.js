var express = require('express');
var mongoose   = require('mongoose');
var	Post = require('./routes/posts');
var router = require('express').Router();
var bodyParser    = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
  next();
});

router.route('/posts')
        .post(function(req, res) {
            var post = new Post();
			console.log('body: ' + req.body);
			console.log('post: ' + req.body.post);
            console.log('content: ' + req.body.content);
            console.log('keywords: ' + req.body.keywords);
            console.log('permalink: ' + req.body.permalink);
            console.log('tags: ' + req.body.tags);
            console.log('title: ' + req.body.title);
            console.log('author: ' + req.body.author);
       
    
            post.content= req.body.content;
            post.keywords= req.body.keywords;
            post.permalink= req.body.permalink;
            post.tags= req.body.tags;
            post.title= req.body.title;
            post.datePublished= new Date();
            post.author= req.body.author;
    
            // save the bear and check for errors
            post.save(function(err) {
                console.log('post chamado');
                if (err){
                    console.log('post err: ' + err);
                    res.send(err);
                }
                
                console.log('post criado');
                /*res.json({ message: 'Post created!' });*/
				res.json(req.body);
            })
        })
        .get(function(req, res) {
                console.log('get all chamado');
                Post.find(function(err, posts) {
                if (err){
                    console.log('get err: ' + err);
                    res.send(err);
                }
                console.log(posts);
                res.json(posts);
            });
            
        });

router.route('/posts/:id')
    .get(function(req, res) {
        Post.findById(req.params.id, function(err, posts) {
            if (err)
                res.send(err);
            res.json(posts);
        })
    })
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Post.findById(req.params.id, function(err, post) {
            console.log('put chamado');
            if (err)
                res.send(err);

            post.content= req.body.content;
            post.keywords= req.body.keywords;
            post.permalink= req.body.permalink;
            post.tags= req.body.tags;
            post.title= req.body.title;
            post.datePublished= new Date();
            post.author= req.body.author;

            // save the bear
            post.save(function(err) {
                if (err){
                    console.log('put err: ' + err);
                    res.send(err);
                }

                res.json({ message: 'Bear updated!' });
            });

        })
    })
    .delete(function(req, res) {
        console.log('delete chamado');
        Post.remove({
            _id: req.params.id
        }, function(err, post) {
            if (err){
                console.log('delete err: ' + err);
                res.send(err);
            }

            res.json({ message: 'Successfully deleted' });
        });
    });


app.listen(8080);
console.log('Listening on port 8080... ');

app.use('/api', router);