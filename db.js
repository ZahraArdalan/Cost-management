let db;
const addDate = document.querySelector(".input-date");
const addIncome = document.querySelector(".input-income");
const addCategories = document.querySelector(".input-categories");
const addSpent = document.querySelector(".input-spent");
const list = document.querySelector(".listdata");

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
  //console.log(newItem);

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
      let date2 = document.createElement("p");
      let categories2 = document.createElement("p");
      let spent2 = document.createElement("p");
      let income2 = document.createElement("p");
      date2.textContent = cursor.value.odate;
      categories2.textContent = cursor.value.ocategories;
      spent2.textContent = cursor.value.ospent;
      income2.textContent = cursor.value.oincome;
      listItem.appendChild(date2);
      listItem.appendChild(categories2);
      listItem.appendChild(spent2);
      listItem.appendChild(income2);
      list.appendChild(listItem);
      listItem.setAttribute("data-cost-id", cursor.value.id);

      let deleteButton = document.querySelector(".btndelete");
      //console.log(deleteButton);
      //listItem.appendChild(deleteButton);
      deleteButton.addEventListener("click", deleteItem);

      cursor.continue();
    } else {
      if (!list.firstChild) {
        let listItem = document.createElement("li");
        listItem.textContent = "There is no cost...!!";
        list.appendChild(listItem);
      }
    }
  };
};

const deleteItem = (e) => {
  let contactId = Number(e.target.parentElement.getAttribute("data-cost-id"));
  let transaction = db.transaction(["cost"], "readwrite");
  let objectStore = transaction.objectStore("cost");
  let request = objectStore.delete(contactId);
  transaction.oncomplete = () => {
    e.target.parentElement.parentElement.removeChild(e.target.parentElement);
    console.log(`contact ${contactId}is deleted`);
    if (!list.firstChild) {
      let listItem = document.createElement("li");
      listItem.textContent = "There is no cost...!!";
      list.appendChild(listItem);
    }
  };
};

form.addEventListener("submit", addData);
