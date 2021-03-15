const result = document.querySelector('.result');
console.log('result:', result);

let products = undefined;

const fetchProduct = async () => {
  result.innerHTML = `<h2>Loading...</h2>`;

  try {
    // const id = window.location.search;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idParam = urlParams.get('id');
    const nameParam = urlParams.get('name');
    console.log('window.location.search:', window.location.search);
    console.log('URLSearchParams:', { idParam, nameParam });

    // const response = await axios.get(`/.netlify/functions/003-product?id=${id}`);
    // const response = await axios.get(`/api/003-product?id=${id}`);
    // const response = await axios.get(`/api/003-product${queryString}`);
    const response = await axios.get(`/api/003-z-complete${queryString}`);
    const data = response.data;
    product = response.data;
    const { desc, image, name, price } = product.fields;
    const url = image[0].url;
    const productHtml = `
      <h1 class="title">${name}</h1>
      <article class="product">
        <img class="product-img" src="${url}" alt="${name}"/>
        <div class="product-info">
          <h5 class="title">${name}</h5>
          <h5 class="price">$${price}</h5>
          <p class="desc">${desc}</p>
        </div>
      </article>
    `;
    // console.log('response:', response);
    // console.log('data:', data);
    console.log('product:', product);
    result.innerHTML = productHtml;
  } catch (error) {
    // console.log('error:', error);
    // console.log('error.response:', error?.response);
    // console.log('error.response.data:', error.response.data);
    result.innerHTML = `<h4>There was an error:</h4><h4>[${error?.response?.status}] ${error?.response?.data}</h4>`;
    // result.innerHTML = `<h2>${error.response.data}</h2>`;
  }
};

fetchProduct();
