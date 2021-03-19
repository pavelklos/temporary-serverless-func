const title = document.querySelector('.title h2');
const result = document.querySelector('.result');
const serverIp = document.querySelector('.serverIp');

const fetchData = async () => {
  try {
    // get ip
    const { data: ip } = await axios.get('/api/102-get-ip');
    console.log('Server IP:', ip);
    serverIp.innerHTML = ip;

    // const response = await axios.get('/.netlify/functions/004-survey');
    const response = await axios.get('/api/004-survey');
    const data = response.data;
    const surveyHtml = data
      .map((vote) => {
        const { id, room, votes } = vote;
        return `
          <li class='vote'>
            <div class="key">
              ${room.toUpperCase().substring(0, 2)}
            </div>
            <div>
              <h4>${room}</h4>
              <p class="vote-${id}" data-votes="${votes}">${votes} votes</p>
            </div>
            <button data-id="${id}">
              <i class="fas fa-vote-yea"></i>
            </button>
          </li>
        `;
      })
      .join('');

    // console.log('response:', response);
    console.log('data:', data);
    // console.log('products:', products);
    result.innerHTML = surveyHtml;
  } catch (error) {
    // console.log('error:', error);
    console.log('error.response:', error.response);
    // console.log('error.response.data:', error.response.data);
    result.innerHTML = `<h4>There was an error:</h4><h4>[${error.response.status}] ${error.response.data}</h4>`;
  }
};

// fetchData();
window.addEventListener('load', () => {
  fetchData();
});

result.addEventListener('click', async function (e) {
  // console.log(e.target);
  if (e.target.classList.contains('fa-vote-yea')) {
    // console.log(e.target);
    const btn = e.target.parentElement;
    const id = btn.dataset.id;
    const voteNode = result.querySelector(`.vote-${id}`);
    const votes = voteNode.dataset.votes;

    // log
    // console.log(btn);
    // console.log(id);
    // console.log(voteNode);

    // -> Netlify Serverless Function -> [airtable] PUT
    const newVotes = await modifyData(id, votes);
    title.textContent = 'Survey';

    if (newVotes) {
      // [frontend]
      // voteNode.innerHTML = `${newVotes} votes`;
      voteNode.textContent = `${newVotes} votes`;
      voteNode.dataset.votes = newVotes;
    }
  }
});

// modify data
async function modifyData(id, votes) {
  // return parseInt(votes) + 1;
  // return Number(votes) + 1;
  title.textContent = 'Loading...';

  try {
    const response = await axios.put('/api/004-survey', { id, votes });
    const data = response.data;
    // [data]
    // {
    //   id: 'recJsfbGfiICgiK4N',
    //   fields: { votes: 6, room: 'bedroom' },
    //   createdTime: '2021-03-16T13:37:19.000Z'
    // }
    const newVotes = data.fields.votes;
    return newVotes;
  } catch (error) {
    // console.log('error:', error);
    console.log('error.response:', error.response);
    // console.log('error.response.data:', error.response.data);
    // result.innerHTML = `<h4>There was an error:</h4><h4>[${error.response.status}] ${error.response.data}</h4>`;
    return null;
  }
}
