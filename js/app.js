const clients = JSON.parse(DATA);
const clientEl = document.getElementById("client");
const sortSelectEl = document.getElementById("sortSelect");
const searchFormEl = document.getElementById("searchForm");


function createCardHtml(cardData) {
  const date = new Date(cardData.date);
  const time = date.toLocaleTimeString();
  const day = date.toLocaleDateString();
  return `
  <div class="card mb-3">
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
     <p>${cardData.text}</p>
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

function renderCards(elemToRender, dataArray) {
  elemToRender.innerHTML = createCardsHtml(dataArray).join("");
}

function createCardsHtml(dataArray) {
  return dataArray.map((data) => createCardHtml(data));
}

sortSelectEl.addEventListener("change", (event) => {
  const [key, order] = event.target.value.split("/");

  if (typeof clients[0][key] === "string") {
    clients.sort((client1, client2) => {
      return client1[key].localeCompare(client2[key]) * order;
    });
  } else {
    clients.sort((client1, client2) => {
      return (client1[key] - client2[key]) * order;
    });
  }

  renderCards(clientEl, clients);
});

searchFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = event.target.search.value
    .trim()
    .toLowerCase()
    .split(" ")
    .filter((word) => !!word);
  console.log(query);
  const searchFields = ["name", "phone", "text"];
  const filteredClients = clients.filter((client) => {
    return query.every((word) => {
      return searchFields.some((field) => {
        return String(client[field]).toLowerCase().includes(word);
      });
    });
  });
  renderCards(clientEl, filteredClients);
});
