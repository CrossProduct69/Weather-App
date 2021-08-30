const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");


const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});


app.post("/weather",function(req,res){

    const formData=req.body;

    var city=formData.city.toUpperCase();

    city=city[0]+city.substr(1).toLowerCase();

    console.log(city);

    const url ="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=d531d16bf015296debb02ddd3c2e6a06&units=metric";

    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weather =JSON.parse(data);
            const icon=weather.weather[0].icon;
            
            const temp=weather.main.temp;
            const weather1=weather.weather[0].description;
            res.write(`<h1>Temperature of ${city} is ${temp} <sup>&#176;</sup> Celsius</h1> <h2>clouds are ${weather1}</h2>`);
            res.write(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${weather1}">`);
            res.send();
        });
    });
});

app.listen(3000,function(){
    console.log("God is always listening");
});