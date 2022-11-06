// Global variables
let empPayrollList;

// function to get employee data stored in local storage and parse it into JSON 
const getDataFromLocalStorage = () => {
  return localStorage.getItem('EmployeePayrollList') ?
    JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}


// add eventListener as the page loads
window.addEventListener('DOMContentLoaded', (event) => {
  // get data from local storage
  empPayrollList = getDataFromLocalStorage();
  // update count
  document.querySelector('.emp-count').textContent = empPayrollList.length;
  // create row for each employee 
  createInnerHtml();

  localStorage.removeItem("edit-emp");
});


// function to create table and append it to the innerHTML 
const createInnerHtml = () => {
  if (empPayrollList.length == 0) return;
  // column headings
  const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th>" + "<th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>";

  // add table header 
  let innerHtml = `${headerHtml}`;

  // data row loop through JSON object
  for (let empPayrollData of empPayrollList) {
    // append row to the existing rows
    innerHtml = `${innerHtml}
      <tr>
        <td><img class="profile" alt="${empPayrollData._name}" src ="${empPayrollData._profilePic}"></td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td>${getDepartmentHtml(empPayrollData._department)}</td>
        <td>${empPayrollData._salary}</td>
        <td>${stringifyDate(empPayrollData._startDate)}</td>
        <td class="action-group">
          <img id ="${empPayrollData._id}" src="delete-black-18dp.svg" alt="Delete" onClick="remove(this)">
          <img id ="${empPayrollData._id}" src="create-black-18dp.svg" alt="Edit" onClick="update(this)">
        </td>
      </tr>`
      ;
  }
  document.querySelector('#display').innerHTML = innerHtml;
}


// function to get department from array and create label for each
const getDepartmentHtml = (data) => {
  let deptHtml = '';
  for (let dept of data) {
    deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`;
  }
  return deptHtml;
}

// function to remove an existing employee
const remove = (node) => {
  // check if the element is present in array
  let employeeData = empPayrollList.find(empData => empData._id == node.id);
  // if not exit and do nothing
  if (!employeeData) {
    return;
  }
  // get index of the employee, splice, set it to local storage and then update the table
  const index = empPayrollList.map(empData => empData._id).indexOf(employeeData._id);
  empPayrollList.splice(index, 1);
  localStorage.setItem('EmployeePayrollList', JSON.stringify(empPayrollList));
  document.querySelector('.emp-count').textContent = empPayrollList.length;
  createInnerHtml();
}

// function to update an existing employee
const update = (node) => {
  // check if the element is present in array
  let employeeData = empPayrollList.find(empData => empData._id == node.id);
  // if not exit and do nothing
  if (!employeeData) {
    return;
  }
  // else, set it to local storage by creating new array inside object
  localStorage.setItem('edit-emp', JSON.stringify(employeeData));
  // then move to add-employee.html page
  window.location.replace(site_properties.add_employee_page);
}