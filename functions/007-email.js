// domain/.netlify/functions/007-email
// domain/api/007-email

require('dotenv').config();
const nodemailer = require('nodemailer');

const {
  ETHEREAL_HOST,
  ETHEREAL_PORT,
  ETHEREAL_USER,
  ETHEREAL_PASSWORD,
} = process.env;
// console.log({ ETHEREAL_HOST, ETHEREAL_PORT, ETHEREAL_USER, ETHEREAL_PASSWORD });

// [nodemailer] create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: ETHEREAL_HOST,
  port: ETHEREAL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: ETHEREAL_USER, // generated ethereal user
    pass: ETHEREAL_PASSWORD, // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false, // !!! ISSUE : ERROR : self signed certificate in certificate chain
  },
});

exports.handler = async (event, context, cb) => {
  const method = event.httpMethod;
  const body = event.body;
  console.log('█ 007-email █', { method, body });

  // [405] Method Not Allowed
  if (method !== 'POST') {
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 405,
      body: 'Only POST Requests Allowed',
    };
  }

  // [POST]
  const { name, email, subject, message } = JSON.parse(event.body);
  // console.log({ name, email, subject, message });
  if (!name || !email || !subject || !message) {
    // [400] Bad Request
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 400,
      body: 'Please Provide All Values',
    };
  }

  // [data]
  const data = {
    from: 'John Doe <learncodetutorial@gmail.com>',
    to: `${name} <${email}>`,
    subject: subject,
    html: `<p>${message}</p>`,
  };

  try {
    await transporter.sendMail({ ...data });
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 200,
      body: 'Success : Sent',
    };
  } catch (error) {
    // [400] Bad Request
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 400,
      // body: JSON.stringify(error),
      // body: JSON.stringify(error.response.data),
      body: JSON.stringify(error.message),
    };
  }
};

// [Nodemailer]
// https://nodemailer.com/about/
// 'use strict';
// const nodemailer = require('nodemailer');

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: 'bar@example.com, baz@example.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world?', // plain text body
//     html: '<b>Hello world?</b>', // html body
//   });

//   console.log('Message sent: %s', info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);
