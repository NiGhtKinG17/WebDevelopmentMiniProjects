const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);



app.route("/articles")

  .get(function(req, res) {
    Article.find({}, function(err, foundArticles) {
      if (err) {
        console.log(err);
      } else {
        res.send(foundArticles);
      }
    });
  })

.post(function(req, res) {
  const article = new Article({
    title: req.body.title,
    content: req.body.content
  });
  article.save(function(err) {
    if (!err) {
      res.send("Successfully saved");
    } else {
      res.send(err);
    }
  });
})

.delete(function(req, res) {
  Article.deleteMany({}, function(err) {
    if (!err) {
      res.send("Deleted all articles Successfully");
    } else {
      res.send(err);
    }
  });
});



app.route("/articles/:article")
  .get(function(req,res){
    Article.findOne({title: req.params.article}, function(err,foundArticle){
      if(!err){
        if(foundArticle){
          res.send(foundArticle);
        }else{
          res.send("Article not found");
        }
      }else{
        res.send(err);
      }
    });
  })

  .put(function(req,res){
    Article.update({title: req.params.article},
    {title: req.body.title, content: req.body.content},
    {overwrite: true},
    function(err){
      if(!err){
        res.send("Updated Successfully");
      }
    });
  })

  .patch(function(req,res){
    Article.update(
      {title: req.params.article},
      {$set: req.body},
      function(err){
        res.send("Updated Successfully");
      }
    )
  })

  .delete(function(req,res){
    Article.deleteOne(
      {title: req.params.article},
      function(err){
        if(!err){
          res.send("Article Deleted Successfully");
        }else{
          res.send(err);
        }
      }
    )
  });

app.listen("3000", function() {
  console.log("Server connected on 3000");
})
