// domain/.netlify/functions/002-basic-api
// domain/api/002-basic-api

// const items = [{ name: 'susan' }, { name: 'anna' }];
const items = require('../assets/data');

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    // body: 'Our Basic API EXAMPLE',
    // body: items, // Your function response must have a string body. You gave: [object Object],[object Object]
    body: JSON.stringify(items), // JS Object -> JS String
  };
};
