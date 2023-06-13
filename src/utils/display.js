function generateCards(data) {


  const container = document.createElement('div');
  container.classList.add('card-container');


  // check if there is an id in the url
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has('id')) {
    const id = urlParams.get('id');
    const post = data.find(item => item.id == id);

    const card = cardDom(post);
    container.appendChild(card);

    //replace the h1 with the title of the post
    const title = document.querySelector('h1');
    title.innerText = post.title;

    return container;
  }
  
  data.forEach(item => {
    const card = cardDom(item);
    container.appendChild(card);
  });
  
  return container;
}

const cardDom = (item) => {
  const card = document.createElement('div');
  card.classList.add('card');
  
  const title = document.createElement('h2');
  title.innerText = item.title;
  card.appendChild(title);
  
  const body = document.createElement('p');
  body.innerText = item.body;
  card.appendChild(body);



  card.addEventListener('click', () => {
    window.location.href = window.location.origin + "?id=" + item.id;
  });
  
  return card;
}