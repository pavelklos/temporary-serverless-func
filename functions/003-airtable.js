// domain/.netlify/functions/003-airtable
// domain/api/003-airtable

require('dotenv').config();

const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appb6cXBB1rfbpXlM')
  .table('PRODUCTS');
// console.log({ airtable });

exports.handler = async (event, context, cb) => {
  try {
    const data = await airtable.list();
    const { records } = data;
    const products = records.map((product) => {
      const { id, createdTime } = product;
      const { name, image, price } = product.fields; // WE DON'T NEED 'desc'
      //   const url = image[0].url;
      const { url, filename, size } = image[0];
      return { id, name, url, price, createdTime, filename, size };
    });
    // console.log(data);
    // console.log(records);
    // console.log(products);
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
