// domain/.netlify/functions/101-comfy-sloth-store-strapi-payment
// domain/api/101-comfy-sloth-store-strapi-payment

require('dotenv').config();
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  // FOR [POST] WITH 'body'
  if (event.body) {
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body);
    // console.log({ cart, shipping_fee, total_amount });
    // console.log({ stripe });

    const calculateOrderAmount = (cart) => {
      // Replace this constant with a calculation of the order's amount
      // Calculate the order total on the server to prevent
      // people from directly manipulating the amount on the client
      return shipping_fee + total_amount;
    };

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(cart),
        currency: 'usd',
      });
      return {
        headers: { 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
        // body: 'STRIPE (Netlify Serverless Function) 101-comfy-sloth-store-strapi-payment',
        // body: JSON.stringify({ cart, shipping_fee, total_amount }),
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        headers: { 'Access-Control-Allow-Origin': '*' },
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  }

  // FOR [GET] WITHOUT 'body'
  return {
    headers: { 'Access-Control-Allow-Origin': '*' },
    statusCode: 200,
    body:
      'STRIPE (Netlify Serverless Function) 101-comfy-sloth-store-strapi-payment',
    // body: 'Create Payment Intent',
  };
};
