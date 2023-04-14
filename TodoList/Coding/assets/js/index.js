// Database
var todos = ["HTML", "CSS", "SCSS", "JS"];

// DOM Select
var todoList = document.querySelector(".container__list");
var input = document.querySelector("input");
// once you finish typing your code, make sure you do 'refactor'
// 1. vanilla js ---> refactor
// 2. framework

init();

function init() {
  displayList();

  // Event Listeners
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const index = todos.length;
      const value = input.value;

      todos.push(value);
      appendElement(value, index);
      // input.innerHTML = "";
      input.value = "";
    }
  });
}

// Helper Functions
function displayList() {
  todos.forEach(function (el, i) {
    appendElement(el, i);
  });
}

function appendElement(todo, i) {
  var todoItem = document.createElement("li");
  todoItem.classList.add("container__item");
  // todoItem.setAttribute("id", `item-${i}`);
  todoList.appendChild(todoItem);
  todoItem.innerHTML =
    '<i class="fa-solid fa-trash-can container__icon"></i> <span class="container__content">' +
    i +
    ": " +
    todo +
    "</span>";

  completeEventListener(todoItem);
  deleteEventListener(todoItem);
}

function completeEventListener(todoItem) {
  todoItem
    .querySelector(".container__content")
    .addEventListener("click", function (e) {
      e.target.classList.toggle("container__content--completed");
    });
}

function deleteEventListener(todoItem) {
  todoItem
    .querySelector(".container__icon")
    .addEventListener("click", deleteTodo);
}

function deleteTodo(e) {
  var todoItem = e.target.parentNode;
  todoItem.classList.add("container__item--deleted");
  e.target.classList.add("container__icon--deleted");

  setTimeout(
    (function (todoItem) {
      // closure ==> close --> private room
      return function () {
        todoItem.style.display = "none";
        // todoItem.remove();
        todos.splice(Number(todoItem.textContent[1]), 1);
        todoList.innerHTML = "";
        displayList();
      };
    })(todoItem),
    400
  );
}
