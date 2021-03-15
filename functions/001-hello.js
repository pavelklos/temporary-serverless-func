// domain/.netlify/functions/001-hello
// domain/api/001-hello

// exports.handler = async (event, context) => {
//   return {
//     statusCode: 200,
//     body: 'Our First Netlify Function Example',
//   };
// };

const person = { name: 'Pavel Klos', age: 51 };
const numbers = [1, 2, 3, 4, 5];
const date = new Date().toLocaleString();

exports.handler = (event, context, cb) => {
  // console.log('███ event ███', event);
  console.log('███ event.path ███', event.path);
  console.log('███ event.httpMethod ███', event.httpMethod);
  console.log(
    '███ event.queryStringParameters ███',
    event.queryStringParameters
  );
  // console.log('███ context ███', context);
  console.log('███ context.clientContext ███', context.clientContext);

  cb(null, {
    headers: { 'Access-Control-Allow-Origin': '*' },
    statusCode: 200,
    body: 'Our First Netlify Function Example [with callback] ' + date,
    // body: person, // 500 Internal Server Error : Your function response must have a string body. You gave: [object Object]
    // body: numbers, // 500 Internal Server Error : Your function response must have a string body. You gave: 1,2,3,4,5
    // body: JSON.stringify(person),
    // body: JSON.stringify(numbers),
  });
};
