// step 1 - Get all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

// step 2 - create an event listener -- onKeyup event
inputBox.onkeyup = () => {
  // Getting the user entered value
  let userEnteredValue = inputBox.value;
  // if the user did not put space
  if (userEnteredValue.trim() != 0) {
    // add an active class to the button
    addBtn.classList.add("active");
  } else {
    // Remove the active class
    addBtn.classList.remove("active");
  }
};

// calling the show taxt function
showTasks();

// When the user clicks on the plus icon button
addBtn.onclick = () => {
  // Getting the input field value
  let userEnterValue = inputBox.value;
  // Getting local storage
  let getLocalStorageData = localStorage.getItem("New Todo");
  // if the local storage has no data
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    // Transform json string into a javascript object
    listArray = JSON.parse(getLocalStorageData);
  }
  // pushing or adding a new value in an array
  listArray.push(userEnterValue);
  // transforming the javascript into a json string
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  //showTasks
  // Remove the active class list from the button once the tast is added
  addBtn.classList.remove("active");
  console.log(listArray);
};

// Step 2 create a function to display the code items

function showTasks() {
  let getLocalStorageData = localStorage.getItem("New Todo");
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }
  const pendingTasksCount = document.querySelector(".pendingTasks");
  pendingTasksCount.textContent = listArray.length;
  // if the lenght is greater than 0
  if (listArray.length > 0) {
    // class = 'active'
    deleteAllBtn.classList.add("active");
  } else {
    deleteAllBtn.classList.remove("active");
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag;
  inputBox.value = "";
}

// step 3 create a delete function

function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  // this delete or remove the li
  listArray.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
}

// step four  create a delete all task function

deleteAllBtn.onclick = function () {
  listArray = [];
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
};
