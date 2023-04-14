/* ------------------------- */
/* Selector List */
/* ------------------------- */
var todos = document.querySelectorAll("li");
var deleteBtns = document.querySelectorAll("li span");
var input = document.querySelector("input[type='text']");
var todoList = document.querySelector("ul");

/* ------------------------- */
/* Variable List */
/* ------------------------- */
// Initial Database
var todoDB = [
  "HTML",
  "CSS",
  "HTML+CSS Project",
  "JavaScript",
  "JavaScript Project 1",
  "JavaScript Project 2",
  "Advanced JavaScript",
  "SASS",
  "Bootstrap",
  "Framework",
  "Back-end",
];

/* ------------------------- */
/* Initial Settings */
/* ------------------------- */
init();

/* ------------------------- */
/* Function List */
/* ------------------------- */
function init() {
  // Initializing todos
  initialize();

  // Setting up enter key press event listener on input
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event
  // https://stackoverflow.com/questions/905222/enter-key-press-event-in-javascript
  input.addEventListener("keydown", function (e) {
    // javaScript key codes, http://gcctech.org/csc/javascript/javascript_keycodes.htm
    if (e.keyCode === 13) {
      // Recieving a new todo from input
      var todoText = e.target.value;

      var i = todoDB.length;
      // Add the new todo into the DB
      todoDB.push(todoText);

      // Creating a new li and add to ul
      // https://stackoverflow.com/questions/10309650/add-elements-to-the-dom-given-plain-text-html-using-only-pure-javascript-no-jqu
      appendNewTodo(todoText, i);
      e.target.value = "";
    }
  });
}

function initialize() {
  todoList.textContent = "";
  todoDB.forEach(function (el, i) {
    appendNewTodo(el, i);
  });
}

function appendNewTodo(todo, i) {
  var newTodo = document.createElement("li");
  newTodo.innerHTML =
    "<span><i class='fas fa-trash-alt'></i></span>" + i + ": " + todo;
  todoList.appendChild(newTodo);

  // Adding event listener to the new element, https://stackoverflow.com/questions/50624631/event-listener-doesnt-work-after-adding-a-new-element
  // Check off specific todos by clicking
  todosListener(newTodo);
  // Click on X to delete Todo
  deleteBtnListener(newTodo.querySelector("span"));
}

function todosListener(el) {
  el.addEventListener("click", function () {
    // We could also do this in a different way where we use add and remove method. In that case, we should also use boolean values to keep track of the status of li's
    // Again, it is also possible to change styles directly in js using the style object but to follow the rule of seperation of concerns, toggling a class would be much cleaner and nicer
    this.classList.toggle("completed");

    // if (this.style.textDecoration === "line-through") {
    //   this.style.color = "#666";
    //   this.style.textDecoration = "none";
    // } else{
    //   this.style.color = "gray";
    //   this.style.textDecoration = "line-through";
    // }
  });

  // Fadeout effect with pure javaScript Step 2 - Remove
  // https://stackoverflow.com/questions/29017379/how-to-make-fadeout-effect-with-pure-javascript
  // https://stackoverflow.com/questions/33424138/how-to-remove-a-div-with-fade-out-effect-in-javascript/33424363
  // transitioned event, https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/transitionend_event
  el.addEventListener("transitionend", function () {
    // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
    this.remove();
    // remove() vs display: none
    // this.style.display = "none";
  });
}

function deleteBtnListener(el) {
  el.addEventListener("click", function (event) {
    // Event bubbling (propagation), https://javascript.info/bubbling-and-capturing
    // When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors
    // To make the event not bubble any futher up we use event.stopPropagation() method, https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
    event.stopPropagation();

    // Fadeout effect with pure javaScript Step 1 - Hide
    // How to select a parent element of the selected object, https://www.w3schools.com/jsref/prop_node_parentnode.asp
    this.parentNode.style.opacity = "0";

    // Remove the todo from DB
    var i = this.parentNode.textContent[0];
    todoDB.splice(i, 1);

    // Refresh todo List
    // initialize();
    // To have the transition effect we need to wait for the transition duration before we remove it
    setTimeout(initialize, 500);
  });
}
