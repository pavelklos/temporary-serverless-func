const form = document.querySelector('.form');
const emailInput = document.querySelector('.email-input');
const alert = document.querySelector('.alert');
alert.style.display = 'none';

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  form.classList.add('loading');
  alert.style.display = 'none';
  const email = emailInput.value;
  console.log('submit - email:', email);
  try {
    await axios.post('/api/006-newsletter', { email }); // NO RESPONSE
    form.innerHTML = `<h4 class="success">Success! Please check your email</h4>`;
  } catch (error) {
    // console.log('error:', error);
    console.log('error.response:', error.response);
    // console.log('error.response.data:', error.response.data);
    // result.innerHTML = `<h4>There was an error:</h4><h4>[${error.response.status}] ${error.response.data}</h4>`;
    alert.style.display = 'block';
    alert.textContent = `Something went wrong. Please try again`;
    // [OTHER SOLUTION FOR ERRORS]
    // . error.response.data
    // . error.response.data[0]
    // . error.response.data.email
    // . error.response.data.email[0]
    // const errorData = error.response.data;
    // const errorEmail = error.response.data?.email;
    // const errorMessage = errorEmail || errorData;
    // alert.textContent = errorMessage;
  }
  form.classList.remove('loading');
});
