// domain/.netlify/functions/006-newsletter
// domain/api/006-newsletter

require('dotenv').config();
const axios = require('axios');

const url = `https://api.buttondown.email/v1/subscribers`;

exports.handler = async (event, context, cb) => {
  const method = event.httpMethod;
  const body = event.body;
  console.log('█ 006-newsletter █', { method, body });

  // [405] Method Not Allowed
  if (method !== 'POST') {
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 405,
      body: 'Only POST Requests Allowed',
    };
  }

  // [POST]
  const { email } = JSON.parse(event.body);
  // console.log('email:', email);

  if (!email) {
    // [400] Bad Request
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 400,
      body: 'Please provide email value',
    };
  }

  try {
    const response = await axios.post(
      url,
      { email },
      {
        headers: {
          Authorization: `Token ${process.env.BUTTONDOWN_EMAIL_API_KEY}`,
        },
      }
    );
    const data = response.data;
    console.log('data:', data);
    // [201] Created
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 201,
      body: 'Success : Created',
    };
  } catch (error) {
    // [400] Bad Request
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 400,
      // body: JSON.stringify(error),
      body: JSON.stringify(error.response.data),
    };
  }
};

// [Buttondown (1.0.0)]
// . https://api.buttondown.email/v1/schema
// !!!	[Authentication]
// 	. Clients should authenticate by passing the token key in the "Authorization" HTTP header, prepended with the string "Token ".
// 	  . For example:
// 	    . Authorization: Token ...
// !!!	[Create a new subscriber]
// 	. Request samples
// 	  . [POST]
// 	    . https://api.buttondown.email/v1/subscribers
// 	  . {
// 	      "email": "user@example.com",
// 	      "metadata": {},
// 	      "notes": "string",
// 	      "referrer_url": "string",
// 	      "tags": [
// 	        "string"
// 	      ]
// 	    }
