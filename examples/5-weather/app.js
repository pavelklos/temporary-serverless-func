const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const alert = document.querySelector('.alert');
const result = document.querySelector('.result');
alert.style.display = 'none';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = input.value;
  console.log('submit - city:', city);
  if (city) {
    getWeatherData(city);
  }
});

async function getWeatherData(city) {
  alert.style.display = 'none';

  try {
    const response = await axios.post('/api/005-weather', { city });
    const data = response.data;
    // console.log(response);
    // console.log(response.data);

    const { name } = data;
    const { country } = data.sys;
    const {
      temp,
      temp_min: min,
      temp_max: max,
      feels_like,
      pressure,
      humidity,
    } = data.main;
    const { description } = data.weather[0];

    // &#8451 = ℃, &#8457 = ℉
    result.innerHTML = `
    <article class="card">
      <h3>${name}, ${country}</h3>
      <h4>${description} (${temp} °C)</h4>
      <hr />
      <p>temp: <b>${temp}</b> &#8451</p>
      <p>temp min: <b>${min}</b> &#8451</p>
      <p>temp max: <b>${max}</b> &#8451</p>
      <p>feels like: <b>${feels_like}</b> &#8451</p>
      <p>humidity: <b>${humidity}</b> %</p>
      <p>pressure: <b>${pressure}</b> <span style="text-transform: none">hPa</span></p>
      <hr />
      <i>The average value of surface pressure on Earth is <b>985.5</b> hPa</i>
    </article>
    `;
  } catch (error) {
    // console.log('error:', error);
    console.log('error.response:', error.response);
    // console.log('error.response.data:', error.response.data);
    // result.innerHTML = `<h4>There was an error:</h4><h4>[${error.response.status}] ${error.response.data}</h4>`;
    alert.style.display = 'block';
    alert.textContent = `Can not find weather data for city: '${city}'`;
  }
}
