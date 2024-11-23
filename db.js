let db;
const addDate = document.querySelector("#date");
const addIncome = document.querySelector("#income");
const addCategories = document.querySelector("#categories");
const addSpent = document.querySelector("#spent");
const list = document.querySelector(".list");

const form = document.querySelector(".form");
window.onload = () => {
  let request = window.indexedDB.open("cost", 1);
  request.onerror = () => {
    console.log("Database failed To Open");
  };
  request.onsuccess = () => {
    console.log("Database Opened successfully");
    db = request.result;
    //console.log(db);
    displayData();
  };

  request.onupgradeneeded = (e) => {
    let db = e.target.result;
    let objectStore = db.createObjectStore("cost", {
      keyPath: "id",
      autoIncrement: true,
    });
    objectStore.createIndex("date", "date", {
      unique: false,
    });

    objectStore.createIndex("income", "income", {
      unique: false,
    });

    objectStore.createIndex("categories", "categories", {
      unique: false,
    });

    objectStore.createIndex("spent", "spent", {
      unique: false,
    });

    console.log("Database setup successfully...");
  };
};
const addData = (e) => {
  // از رفرش کردن صفحه جلوگیری کند
  e.preventDefault();
  console.log(e);

  let newItem = {
    odate: addDate.value,
    ocategories: addCategories.value,
    oincome: addIncome.value,
    ospent: addSpent.value,
  };

  let transaction = db.transaction(["cost"], "readwrite");
  let objectStore = transaction.objectStore("cost");
  let request = objectStore.add(newItem);
  request.onsuccess = () => {
    addDate.value = "";
    addCategories.value = "";
    addIncome.value = "";
    addSpent.value = "";
  };

  transaction.oncomplete = () => {
    console.log("transaction Completed on Database");
    displayData();
  };
  transaction.onerror = () => {
    console.log("Error Transaction on Database");
  };
};

const displayData = () => {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  let objectStore = db.transaction("cost").objectStore("cost");
  objectStore.openCursor().onsuccess = (e) => {
    let cursor = e.target.result;

    if (cursor) {
      let listItem = document.createElement("li");
      let date = document.createElement("p");
      let categories = document.createElement("p");
      let spent = document.createElement("p");
      let income = document.createElement("p");
      date.textContent = cursor.value.addDate;
      categories.textContent = cursor.value.addCategories;
      spent.textContent = cursor.value.addSpent;
      income.textContent = cursor.value.addIncome;
      listItem.appendChild(date);
      listItem.appendChild(categories);
      listItem.appendChild(spent);
      listItem.appendChild(income);
      listItem.setAttribute("data-cost-id", cursor.value.id);
      cursor.continue();
    } else {
      if (!list.firstChild) {
        let listItem = document.createElement("li");
        listItem.textContent = "There is no cost...!!";
        listItem.appendChild(listItem);
      }
    }
  };
};

form.addEventListener("submit", addData);
