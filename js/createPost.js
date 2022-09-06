//получаю форму из документа по id
let form = document.getElementById("form");
//навешиваю событие на форму
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let id = document.getElementById("id").value;
  let title = document.getElementById("title").value;
  let body = document.getElementById("body").value;
  //вызываю функцию создания поста
  createPost(id, title, body);
  //очищаю поля ввода инпут
  document.getElementById("id").value = "";
  document.getElementById("title").value = "";
  document.getElementById("body").value = "";
});
//объявляю функцию создания поста с запросом на сервер
async function createPost(userId = null, title = null, body = null) {
  await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
      userId,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}
