// domain/.netlify/functions/001-hello
// domain/api/001-hello

const ipify = require('ipify');
const axios = require('axios');

exports.handler = async (event, context, cb) => {
  // [ipify]
  // const ip = await ipify({ useIPv6: false });
  // console.log('ip:', ip);

  // [axios] amazonaws, whatismyipaddress
  // const { data: ip } = await axios.get('https://checkip.amazonaws.com/');
  const { data: ip } = await axios.get('http://ipv4bot.whatismyipaddress.com/');
  // const { data: ip } = await axios.get('http://ipv6bot.whatismyipaddress.com/');

  return {
    statusCode: 200,
    body: JSON.stringify(ip),
  };
};

// // https://stackoverflow.com/questions/20273128/how-to-get-my-external-ip-address-with-node-js

// const axios = require('axios');

// // replace these URLs with whatever is good for you
// const remoteIPv4Url = 'http://ipv4bot.whatismyipaddress.com/';
// const remoteIPv6Url = 'http://ipv6bot.whatismyipaddress.com/';

// // Try getting an external IPv4 address.
// async function getExternalIPv4(debug = false) {
//   try {
//     const response = await axios.get(remoteIPv4Url);
//     if (response && response.data) {
//       return response.data;
//     }
//   } catch (error) {
//     if (debug) {
//       console.log(error);
//     }
//   }
//   return undefined;
// }

// // Try getting an external IPv6 address.
// async function getExternalIPv6(debug = false) {
//   try {
//     const response = await axios.get(remoteIPv6Url);
//     if (response && response.data) {
//       return response.data;
//     }
//   } catch (error) {
//     if (debug) {
//       console.log(error);
//     }
//   }
//   return undefined;
// }

// async function getExternalIP(debug = false) {
//   let address;
//   // Try IPv6 and then IPv4
//   address = await getExternalIPv6(debug);
//   if (!address) {
//     address = await getExternalIPv4(debug);
//   }
//   return address;
// }

// module.exports { getExternalIP, getExternalIPv4, getExternalIPv6 }

// *********************************************************************************************************************

// https://ipdata.co/blog/how-to-get-the-ip-address-in-javascript/

// function getIPFromAmazon() {
//   fetch('https://checkip.amazonaws.com/')
//     .then((res) => res.text())
//     .then((data) => console.log(data));
// }

// getIPFromAmazon();

// https://checkip.amazonaws.com/

// *********************************************************************************************************************
