// domain/.netlify/functions/003-z-complete
// domain/api/003-z-complete

require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appb6cXBB1rfbpXlM')
  .table('PRODUCTS');

exports.handler = async (event, context, cb) => {
  const { id } = event.queryStringParameters;

  // FROM [003-product.js]
  if (id) {
    try {
      const product = await airtable.retrieve(id);
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

  // FROM [003-airtable.js]
  try {
    const { records } = await airtable.list();
    const products = records.map((product) => {
      const { id, createdTime } = product;
      const { name, image, price } = product.fields; // WE DON'T NEED 'desc'
      const { url, filename, size } = image[0];
      return { id, name, url, price, createdTime, filename, size };
    });
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 500,
      body: 'Server Error',
    };
  }
};
