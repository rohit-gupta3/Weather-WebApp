const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

// to store your secret
const dotenv= require("dotenv");
dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 3000;


//set view engine

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
// app.use(express.json);
app.get('/',(req, res)=>{
    const data = {
        city: "Select a city",
        temperature: "May be hot",
        description: "ohh la la"
    }
    res.render('index',data);
});

app.post("/",(req,res)=>{
    const cityName = req.body.cityName;
    const apiKey = process.env.apiKey;
    // results={
    //     city: "",
    //     temperature: "",
    //     description: ""
    // };
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey+"&units=metric";
    https.get(url,(response)=>{
        
        response.on("data",(data)=>{
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description

             results = {
                city: cityName,
                temperature: temp,
                description: description
            }
            //console.log(results);
            res.render('index',results);
        })
    })

    
});
app.get('*',function(req,res){
    res.send("This page does not exist, You have entered wrong url")
});


app.listen(PORT,()=>{
    console.log(`App is running on http://localhost:${PORT}/`);
});