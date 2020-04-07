'use strict';
require('dotenv').config();



const expreess =require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000
const app = expreess();

app.use(cors());



app.get('/location', (request, response) => {
    try {
      const geoData = require('./data/geo.json');
      const city = request.query.city;
      const locationData = new Location(city, geoData);
      response.status(200).json(locationData);
    } catch (error) {
      errorHandler(error, request, response);
    }
  });

// app.use('*', notFoundHandler);
function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData[0].display_name;
  this.latitude = geoData[0].lat;
  this.longitude = geoData[0].lon;
}


let arrWeather = [];

app.get('/weather', (Request, Response) => {

    const weatherData = require('./data/weather.json');
    const cityWeather = Request.query.city;
    arrWeather = [];
    weatherData.data.map(val => {
        new Allweather(val)
    });
    Response.send(arrWeather)

})


function Allweather(val) {
    this.forecast = val.weather.description,
    this.time = new Date (val.valid_date).toDateString();
    arrWeather.push(this)
}
    
    // for(let i = 0 ; i < weatherData.data.length  ;i++){

    //     this.forecast = weatherData.data[i].weather.description,

    //     this.time = weatherData.data[i].valid_date

    //     arrWeather.push(this)
    // }


  
  app.listen(PORT, () => console.log(`the server is up and running on ${PORT}`));

  
  function notFoundHandler(request, response) {
    response.status(404).send('NOT FOUND!!');
  }
  function errorHandler(error, request, response) {
    response.status(500).send(error);
  }
  app.use('*', notFoundHandler);