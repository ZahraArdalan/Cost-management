let employees = [];

const addbutton = document.getElementById("addbtn");
addbutton.addEventListener("click", addEmployee);

function addEmployee() {
  const name = document.getElementById("name").value;
  const job = document.getElementById("job").value;
  const age = document.getElementById("age").value;

  if (name && job && age) {
    const employee = { name, job, age };
    employees.push(employee);

    document.getElementById("name").value = "";
    document.getElementById("job").value = "";
    document.getElementById("age").value = "";
    displayEmployees();
  } else {
    alert("لطفا همه فیلدها را پر کنید");
  }
}

function displayEmployees() {
  const tablebody = document.getElementById("employeeTable");
  tablebody.innerHTML = ""; // خالی کردن جدول برای بارگذاری جدید

  employees.forEach((employee, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.job}</td>
      <td>${employee.age}</td>
      <td><button onclick="deleteEmployee(${index})">حذف</button></td>
    `;

    tablebody.appendChild(row); // اضافه کردن ردیف به جدول
  });
}

function deleteEmployee(index) {
  employees.splice(index, 1); // حذف کارمند از آرایه
  displayEmployees(); // باز نمایش جدول پس از حذف
}
