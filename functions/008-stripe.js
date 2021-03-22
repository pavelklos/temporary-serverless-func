// domain/.netlify/functions/008-stripe
// domain/api/008-stripe

require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context, cb) => {
  const method = event.httpMethod;
  const body = event.body;
  console.log('█ 008-stripe █', { method, body });

  // [405] Method Not Allowed
  if (method !== 'POST') {
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 405,
      //   body: 'Only POST Requests Allowed',
      body: 'Only Accepts POST Requests',
    };
  }

  const { purchase, total_amount, shipping_fee } = JSON.parse(body);
  // console.log({ purchase, total_amount, shipping_fee });
  // IN PRODUCTION WE NEED FUNCTION : RECALCULATE ORDER AMOUNT -> TO CHECK
  const calculateOrderAmount = () => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return shipping_fee + total_amount;
  };

  // [STRIPE : GET CLIENT SECRET]
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      //   amount: shipping_fee + total_amount,
      amount: calculateOrderAmount(),
      currency: 'usd',
    });
    // console.log('paymentIntent:', paymentIntent);
    // console.log('client_secret:', paymentIntent.client_secret);

    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (error) {
    // [500] Internal Server Error
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
