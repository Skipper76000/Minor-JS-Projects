const todo = document.getElementById("todo");
const input = document.getElementById("input");

const todos = document.querySelector(".todos");

const saves = JSON.parse(localStorage.getItem("todo_list"));

if (saves) {
  saves.forEach((e) => {
    add_list(e.text,e.check);
  });
}

function add_list(text , check) {
  const li = document.createElement("li");
  li.innerHTML = text;
  todos.appendChild(li);
  if (check) {
    li.classList.toggle("completed");
  }
}

todo.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value;
  if (text) {
    add_list(text);
    input.value = "";
    UpdateLS();
  }
});

todos.addEventListener("click", (e) => {
  e.target.classList.toggle("completed");
  UpdateLS();
});

todos.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  e.target.remove();
  UpdateLS();
});

function UpdateLS() {
  const lists = document.querySelectorAll("li");
  const todo_list = [];
  lists.forEach((e) => {
    const todo = {
      text: e.textContent.trim(),
      check: e.classList.contains("completed"),
    };
    todo_list.push(todo);
  });

  localStorage.setItem("todo_list", JSON.stringify(todo_list));
}
