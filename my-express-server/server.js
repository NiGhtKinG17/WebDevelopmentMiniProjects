//jshint version:6
const express = require("express");

const app = express();

app.get("/", function(request, response){
  response.send("<h1>hello</h1>");
});

app.get("/contact", function(req,res){
  res.send("Contact");
});

app.get("/about", function(req,res){
  res.send("Hritik \nShelar");
});

app.get("/hobbies", function(req,res){
  res.send("<ul><li>coffee</li><li>Games</li><li>Series</li></ul>")
})

app.listen(3000, function (){
  console.log("Server Active");
});
