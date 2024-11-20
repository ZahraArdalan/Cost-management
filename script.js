let Cost = [];

const addbutton = document.getElementById("addbtn");
addbutton.addEventListener("click", addCost);

function addCost() {
  const date = document.getElementById("date").value;
  const income = document.getElementById("income").value;
  const categories = document.getElementById("categories").value;
  const spent = document.getElementById("spent").value;

  if (spent && income && categories && date) {
    const payment = { date, income, categories, spent };
    Cost.push(payment);

    document.getElementById("date").value = "";
    document.getElementById("income").value = "";
    document.getElementById("categories").value = "";
    document.getElementById("spent").value = "";
    displaypayment();
  } else {
    alert("لطفا همه فیلدها را پر کنید");
  }
}

function displaypayment() {
  const tablebody = document.getElementById("CostTable");
  tablebody.innerHTML = ""; // خالی کردن جدول برای بارگذاری جدید

  Cost.forEach((payment, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${payment.date}</td>
      <td>${payment.income}</td>
      <td>${payment.categories}</td>
      <td>${payment.spent}</td>
      <td><button onclick="deletePayment(${index})">حذف</button></td>
    `;

    tablebody.appendChild(row); // اضافه کردن ردیف به جدول
  });
}

function deletePayment(index) {
  Cost.splice(index, 1); // حذف کارمند از آرایه
  displaypayment(); // باز نمایش جدول پس از حذف
}
