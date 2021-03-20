// domain/.netlify/functions/004-survey
// domain/api/004-survey

// const ipify = require('ipify');

require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appb6cXBB1rfbpXlM')
  .table('SURVEY');

exports.handler = async (event, context, cb) => {
  // ipify
  // const ip = await ipify({ useIPv6: false });
  // console.log('ip:', ip);

  // console.log('event.httpMethod:', event.httpMethod);
  // console.log('event.body:', event.body);
  const method = event.httpMethod;
  const body = event.body;
  console.log({ method, body });
  console.log('█ 004-survey █', { method, body });

  // [GET]
  if (method === 'GET') {
    try {
      const list = await airtable.list();
      const { records } = list;
      const survey = records.map((item) => {
        const { id } = item;
        const { room, votes } = item.fields;
        return { id, room, votes };
      });

      return {
        headers: { 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
        body: JSON.stringify(survey),
        // body: JSON.stringify({ survey }),
      };
    } catch (error) {
      return {
        headers: { 'Access-Control-Allow-Origin': '*' },
        statusCode: 500,
        body: 'Server Error',
      };
    }
  }
  // [PUT]
  if (method === 'PUT') {
    try {
      const { id, votes } = JSON.parse(body); // JSON.parse(event.body)
      if (!id || !votes) {
        return {
          headers: { 'Access-Control-Allow-Origin': '*' },
          statusCode: 400, // 400 : Bad Request
          body: 'Please provide [id] and [votes] values',
        };
      }
      const fields = { votes: Number(votes) + 1 };
      const item = await airtable.update(id, fields);
      console.log('item:', item);
      if (item.error) {
        return {
          headers: { 'Access-Control-Allow-Origin': '*' },
          statusCode: 400,
          body: JSON.stringify(item),
        };
      }
      return {
        headers: { 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
        body: JSON.stringify(item),
      };
    } catch (error) {
      return {
        headers: { 'Access-Control-Allow-Origin': '*' },
        statusCode: 500, // 400
        body: 'Server Error', // 'Please provide [id] and [votes] values'
      };
    }
  }
  // Default Response = 405 : Method Not Allowed
  return {
    headers: { 'Access-Control-Allow-Origin': '*' },
    statusCode: 405,
    body: 'Only GET and PUT Requests Allowed',
  };
};
