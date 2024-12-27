const input = document.querySelector("input");
const btn_add = document.querySelector("#btn-add");
const btn_del = document.querySelector("#btn-del");
const unOrderList = document.querySelector("ul");
let storeInputData;
let createElementli;
// Add li in unorder list
/**
 * Adds a new list item to the unordered list with the input data.
 * If the input data is not empty or just whitespace, it creates a new
 * list item element, sets its text to the input data, appends it to the
 * unordered list, and stores the data in local storage.
 */
function addElement() {
  createElementli = document.createElement("li");
  if (storeInputData && storeInputData.trim() !== "") {
    createElementli.innerText = storeInputData;
    unOrderList.appendChild(createElementli);
    StoreDataInLocalStorage();
  }
}
// Remove li in unorder list
function removeElement() {
  // Remove the last child element
  if (unOrderList.lastElementChild) {
    unOrderList.removeChild(unOrderList.lastElementChild);
    StoreDataInLocalStorage();
  } else {
    alert("No items to remove!");
  }
}
function initialize() {
  input.value = "";
  retriveLocalStorageDataWhenFormLoad();
  input.addEventListener("input", (e) => {
    if (input.value !== "undefined") {
      storeInputData = input.value;
    }
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addElement();
      input.value = "";
    }
  });
  btn_add.addEventListener("click", () => {
    addElement();
    input.value = "";
  });
  btn_del.addEventListener("click", () => {
    removeElement();
  });
}

window.addEventListener("load", () => {
  initialize();
});

// Local Storage data add or remove code below ok

function StoreDataInLocalStorage() {
  let listsItems = [];
  unOrderList.querySelectorAll("li").forEach((item) => {
    listsItems.push(item.innerText); // Store the text from each li
  });
  localStorage.setItem("taskList", JSON.stringify(listsItems));
}
function retriveLocalStorageDataWhenFormLoad() {
  const savedList = JSON.parse(localStorage.getItem("taskList"));
  if (savedList) {
    savedList.forEach((item) => {
      createElementli = document.createElement("li");
      createElementli.innerText = item;
      unOrderList.appendChild(createElementli);
    });
  }
}
