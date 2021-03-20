// domain/.netlify/functions/005-weather
// domain/api/005-weather

require('dotenv').config();
const axios = require('axios');

exports.handler = async (event, context, cb) => {
  const method = event.httpMethod;
  const body = event.body;
  console.log('█ 005-weather █', { method, body });

  // [405] Method Not Allowed
  if (method !== 'POST') {
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 405,
      body: 'Only POST Requests Allowed',
    };
  }

  // [POST]
  const { city } = JSON.parse(event.body);
  console.log('city:', city);

  // [URL]
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`;
  console.log(url);

  try {
    const response = await axios.get(url);
    const data = response.data;
    // console.log('data:', data);

    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 404,
      body: JSON.stringify(error),
    };
  }
};

// [OpenWeatherMap] API
// . For temperature in Fahrenheit use units=imperial
// . For temperature in Celsius use units=metric
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=imperial
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric

// [ERROR]
// {
//   cod: 401,
//   message: "Invalid API key. Please see http://openweathermap.org/faq#error401 for more info."
// }
// {
//   cod: "404",
//   message: "city not found"
// }

// [OK]
//  const { name } = data;
//  const { country } = data.sys;
//  const {
//    temp,
//    temp_min: min,
//    temp_max: max,
//    feels_like,
//    pressure,
//    humidity,
//  } = data.main;
//  const { description } = data.weather[0];
