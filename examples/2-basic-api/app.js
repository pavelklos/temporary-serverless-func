// const { default: axios } = require('axios');

const result = document.querySelector('.result');
console.log('result:', result);

const fetchData = async () => {
  console.log('fetch data called [second example]');

  try {
    const response = await axios.get('/api/002-basic-api');
    const data = response.data;
    console.log('response:', response);
    console.log('data:', data);
    // result.textContent = data;
    // result.innerHTML = JSON.stringify(data);
    // result.innerHTML = `<h2>Success</h2>`;

    const products = data
      .map((product) => {
        console.log(product);
        const {
          id,
          name,
          image: { url },
          price,
        } = product;
        return `<article class="product" data-id="${id}">
        <img src="${url}" alt="${name}"/>
        <div class="info">
          <h5>${name}</h5>
          <h5 class="price">$${price}</h5>
        </div>
      </article>`;
      })
      .join('');
    result.innerHTML = products;
  } catch (error) {
    result.innerHTML = `<h2>There was an error. Please try again later</h2>`;
  }
};

fetchData();
