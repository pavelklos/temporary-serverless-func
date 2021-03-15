// domain/.netlify/functions/003-product
// domain/api/003-product

require('dotenv').config();

const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appb6cXBB1rfbpXlM')
  .table('PRODUCTS');
// console.log({ airtable });

exports.handler = async (event, context, cb) => {
  //   console.log(event);
  const { id } = event.queryStringParameters;

  if (id) {
    try {
      //   const product = await airtable.retrieve('reckqrAmygPuNUzgu');
      const product = await airtable.retrieve(id);
      //   console.log(product);
      if (product.error) {
        return {
          headers: { 'Access-Control-Allow-Origin': '*' },
          statusCode: 404,
          body: `No prodcut with id: ${id}`,
        };
      }
      return {
        headers: { 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
        // body: `Single Product [id = ${id}]`,
        body: JSON.stringify(product),
      };
    } catch (error) {
      return {
        headers: { 'Access-Control-Allow-Origin': '*' },
        statusCode: 500,
        body: 'Server Error',
      };
    }
  }

  return {
    headers: { 'Access-Control-Allow-Origin': '*' },
    statusCode: 400,
    body: 'Please provide product id',
  };
};
