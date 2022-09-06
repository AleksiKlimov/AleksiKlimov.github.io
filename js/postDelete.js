//навешиваю обработчик на окно
window.addEventListener("click", function (event) {
  let postsLength = document.querySelectorAll(".post");
  //проверяю на какой кнопке сработало событие
  if (
    event.target.innerText == "Delete" ||
    event.target.innerText == "Удалить"
  ) {
    //вызываю функцию удаления поста а также убираю пост из разметки
    let post = event.target.closest(".post");
    postDelete(post.id);
    post.outerHTML = "";
  }
  //проверяю цель события и количество постов
  if (
    (event.target.innerText == "Delete" ||
      event.target.innerText == "Удалить") &&
    postsLength.length == 1
  ) {
    //вызываю функцию для отрисовки страницы
    let post = event.target.closest(".post");
    let idPost = post.getAttribute("info");
    requestURL(idPost);
    //очищаю лишние комментарии при перерисовке страницы
    let elementForComment = document.querySelector(".comments");
    elementForComment.innerHTML = "";
  }
});

//объявляю функцию удаления поста из "бд"
function postDelete(postId) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: "DELETE",
  });
}
