//навешиваю событие на окно
window.addEventListener("click", function (event) {
  //по клику подгружаю комментарии
  if (
    event.target.innerText == "Comments" ||
    event.target.innerText == "Комментарии"
  ) {
    let post = event.target.closest(".post");
    getPost(post.id);
    getComments(post.id);

    let posts = document.querySelector(".posts");
    posts.innerHTML = "";
    //меняю текст на кнопке
    setTimeout(() => {
      let btn = document.querySelector(".btn > span");
      btn.innerText = "close comments";
    }, 400);
  }
  //по клику перезагружаю страницу с постами
  if (
    event.target.innerText == "close comments" ||
    event.target.innerText == "закрыть комментарии"
  ) {
    let post = event.target.closest(".post");
    let idPost = post.getAttribute("info");
    requestURL(idPost);
    //посты и комментарии убираю со страницы
    let posts = document.querySelector(".posts");
    posts.innerHTML = "";

    let elementForComment = document.querySelector(".comments");
    elementForComment.innerHTML = "";
  }
});
//объявляю функцию получения конкретного поста
function getPost(idPost) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${idPost}`)
    .then((response) => response.json())
    .then((json) => showPost([json]));
}
//объявляю функцию получения комментариев к посту
function getComments(postId) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then((response) => response.json())
    .then((json) => showComments(json));
}
//объявляю функцию которая отображает комментарии на странице
function showComments(comments) {
  let elementForComment = document.querySelector(".comments");
  comments.forEach(function (item) {
    let comment = `<div class="mb-3" id="${item.id}">
        <small>comment №: ${item.id}</small>
        <div>name: <small>${item.name}</small></div>
        <div>mail: <small>${item.email}</small></div>
        <div>body: <small>${item.body}</small></div>
       
        </div>`;
    elementForComment.insertAdjacentHTML("beforeend", comment);
  });
  comments = [];
}
