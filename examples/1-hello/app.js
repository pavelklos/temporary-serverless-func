// const { default: axios } = require('axios');

const result = document.querySelector('.result');
console.log('result:', result);

const fetchData = async () => {
  console.log('fetch data called');
  try {
    // const response = await axios.get('/.netlify/functions/001-hello');
    const response = await axios.get('/api/001-hello');
    const data = response.data;
    console.log('response:', response);
    console.log('data:', data);
    result.textContent = data;
  } catch (error) {
    console.log('error:', error.response);
    console.log('error:', error.response.data);
    result.textContent = error.response.data;
  }
};

fetchData();
