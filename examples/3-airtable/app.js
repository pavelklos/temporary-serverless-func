const result = document.querySelector('.result');
console.log('result:', result);

let products = undefined;

const fetchProducts = async () => {
  try {
    // const response = await axios.get('/.netlify/functions/003-airtable');
    // const response = await axios.get('/api/003-airtable');
    const response = await axios.get('/api/003-z-complete');
    const data = response.data;
    products = response.data;
    const productsHtml = data
      .map((product) => {
        const { id, name, url, price } = product;
        return `
        <a href="product.html?id=${id}&name=${name}" class="product">
          <img src="${url}" alt="${name}"/>
          <div class="info">
            <h5>${name}</h5>
            <h5 class="price">$${price}</h5>
          </div>
        </a>
      `;
      })
      .join('');
    // console.log('response:', response);
    // console.log('data:', data);
    console.log('products:', products);
    result.innerHTML = productsHtml;
  } catch (error) {
    // console.log('error:', error);
    console.log('error.response:', error.response);
    // console.log('error.response.data:', error.response.data);
    result.innerHTML = `<h4>There was an error:</h4><h4>[${error.response.status}] ${error.response.data}</h4>`;
  }
};

fetchProducts();

// [PRODUCT]
// id: "recJjarejIgBPdDQk",
// name: "blue sneakers",
// url: "https://dl.airtable.com/.attachments/76d822ac76229be54478c1224a422928/a4f6b077/product-1.jpg",
// price: 39.99,
// createdTime: "2021-03-11T13:04:54.000Z",
// filename: "product-1.jpg",
// size: 34090
