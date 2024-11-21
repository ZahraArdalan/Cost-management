let db;
const addDate = document.querySelector("#date");
const addIncome = document.querySelector("#income");
const addCategories = document.querySelector("#categories");
const addSpent = document.querySelector("#spent");

const form = document.querySelector(".form");
window.onload = () => {
  let request = window.indexedDB.open("cost", 1);
  request.onerror = () => {
    console.log("Database failed To Open");
  };
  request.onsuccess = () => {
    console.log("Database Opened successfully");
    db = request.result;
    console.log(db);
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
  };
  transaction.onerror = () => {
    console.log("Error Transaction on Database");
  };
};

form.addEventListener("submit", addData);
