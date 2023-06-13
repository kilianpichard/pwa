const API_URL = "https://jsonplaceholder.typicode.com/posts";

fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    let stringifiedData = JSON.stringify(data);
    const dom = generateCards(data)
    
    document.getElementById("posts").appendChild(dom);

    localStorage.setItem("posts", stringifiedData);
  });
