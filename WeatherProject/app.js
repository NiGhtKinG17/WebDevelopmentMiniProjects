//jshint esversion: 6

const express = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

const https = require("https");

app.get("/", function(req, res) {
  res.sendFile(__dirname+"/index.html")

});

app.post("/", function(req,res){
  const city = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=5fccf809a91eb4da9efe6f949163020f"

  https.get(url, function(response) {

    console.log(response.statusCode);

    response.on("data", function(data) {

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const code = weatherData.weather[0].icon;

      res.write("<p>The current condition is "+desc)
      res.write("<h1>The temperaure in "+city+" is "+temp+"deg Celcius</h1>")
      res.write("<img src='http://openweathermap.org/img/wn/"+code+"@2x.png' alt='img'>");
      res.send();
    })
  });

})

app.listen(3000, function() {
  console.log("Server active");
});
