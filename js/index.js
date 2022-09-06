//объявляю переменную
let requestGetPostLimit;
//навешиваю событие на документ
document.addEventListener("click", function (event) {
  if (
    event.target.innerText >= 0 &&
    event.target.innerText <= 10 &&
    event.target.closest(".pagination")
  ) {
    //получаю значение из пагинациии
    let posts = document.querySelector(".posts");
    posts.innerHTML = "";
    requestGetPostLimit = event.target.innerText;
    //вызываю функцию отрисовки постов необходимой страницы
    requestURL(requestGetPostLimit);
  }
});
//первичная подгурзка постов на страницу
window.addEventListener("DOMContentLoaded", function (event) {
  requestURL(1);
});
//объявляю функцию получения постов с сервера
function requestURL(requestGetPostLimit) {
  response = fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${requestGetPostLimit}&_limit=10`
  )
    .then((response) => response.json())
    .then((json) => showPost(json));
}
//объявляю функцию отрисовки постов на странице
function showPost(elem) {
  let posts = document.querySelector(".posts");
  elem.forEach((item) => {
    let post = `<div info="${item.userId}" id="${item.id}" class="post mb-4"><div  class="">id: ${item.id}</div>
    <p>title: ${item.title}</p>
    <small><p>body: ${item.body}</p></small>
    <footer class="buttons">
    <button type="button" data-action="delete" class="btn btn-sm  btn-outline-danger">Delete</button>
    <button type="button" data-action="comments" class="btn btn-sm btn-outline-info">
      <span>Comments</span> </button>
    </footer>
    </div>`;
    posts.insertAdjacentHTML("beforeend", post);
  });
  elem = [];
}
//реализую поиск элементов по совпадению
document.querySelector("#livesearch").oninput = function () {
  let value = this.value.trim();
  let searchElements = document.querySelectorAll(".post");
  if (value != "") {
    searchElements.forEach(function (item) {
      if (item.innerText.search(value) == -1) {
        item.classList.add("visually-hidden");
      } else {
        item.classList.remove("visually-hidden");
      }
    });
  } else {
    searchElements.forEach(function (item) {
      item.classList.remove("visually-hidden");
    });
  }
};
