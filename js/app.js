const clients = JSON.parse(DATA);
const clientEl = document.getElementById('client');
const sortSelectEl = document.getElementById('sortSelect');
const searchFormEl = document.getElementById('searchForm');
const allCountEl = document.getElementById('allCount');
const unreadCountEl = document.getElementById('unreadCount');


clientEl.addEventListener('click', e => {
  if (e.target.matches('.card-text')) {
    console.log('click on text!');
    const cardEl = e.target.closest('.card')
    if (cardEl) {
      const messageId = cardEl.dataset.id
      const messageIdx = clients.findIndex(client => client.id === Number(messageId))
      const message = clients[messageIdx]
      console.log(message);
      if (message.seen) {
        clients.splice(messageIdx, 1)
      } else {
        message.seen = true
      }
      renderCards(clientEl, clients);
    }
  }
})


function createCardHtml(cardData) {
  const date = new Date(cardData.date);
  const time = date.toLocaleTimeString();
  const day = date.toLocaleDateString();
  return `
  <div class="card mb-3 ${cardData.seen ? 'seen' : 'unseen'}" data-id="${cardData.id}">
  <div class="row g-0 card-body">
    <div class="col-1 align-self-center">
      <img src="${cardData.avatar}" class="card-img rounded-start" alt="${cardData.name}">
    </div>
    <div class="col-2 align-self-center">
    <h2 class="title-name">${cardData.name}</h2>
    <a href="#" class="fw-bold">${cardData.phone}</a>
    </div>
    <div class="col-5">
      <div class="mb-4" >
     <p class="card-text">${cardData.text}</p>
      </div>
    </div>
    <div class="col-2">
    <div class="date">${time}</div>
    </div>
    <div class="col-2">
    <div class="date">${day}</div>
    </div>
  </div>
</div>
  `;
}

renderCards(clientEl, clients);

function renderCounters(dataArray) {
  allCountEl.textContent = dataArray.length
  unreadCountEl.textContent = dataArray.filter(message => !message.seen).length;
}

function renderCards(elemToRender, dataArray) {
  dataArray.sort((a, b) => {
    return a.seen - b.seen || b.date - a.date;
  });
  renderCounters(dataArray)
  elemToRender.innerHTML = createCardsHtml(dataArray).join('');
}

function createCardsHtml(dataArray) {
  return dataArray.map((data) => createCardHtml(data));
}

searchFormEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = event.target.search.value
    .trim()
    .toLowerCase()
    .split(' ')
    .filter((word) => !!word);
  console.log(query);
  const searchFields = ['name', 'phone', 'text'];
  const filteredClients = clients.filter((client) => {
    return query.every((word) => {
      return searchFields.some((field) => {
        return String(client[field]).toLowerCase().includes(word);
      });
    });
  });
  renderCards(clientEl, filteredClients);
});




