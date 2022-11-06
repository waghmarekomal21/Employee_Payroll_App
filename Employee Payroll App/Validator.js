// Global variables
let isUpdate = false;
let employeePayrollObject = {}


// function to get salary slider output
function salaryOutput() {
  const salary = document.querySelector('#salary');
  const output = document.querySelector('.salary-output');
  output.textContent = salary.value;
  salary.addEventListener('input', function () {
    output.textContent = salary.value;
  });
}

// function validate name
function validateName() {
  const name = document.querySelector('#name');
  name.addEventListener('input', function () {
    if (name.value.length == 0) {
      setTextValue('.text-error', "");
      return;
    }
    try {
      (new EmployeePayrollData()).name = name.value;
      setTextValue('.text-error', "");
    } catch (e) {
      setTextValue('.text-error', e);
    }
  });
}

// check date if it is within 30 days
function checkDate() {
  try {
    let date = day.value + " " + month.value + " " + year.value;
    (new EmployeePayrollData()).startDate = new Date(Date.parse(date));
    setTextValue('.date-error', "");
  } catch (e) {
    setTextValue('.date-error', e);
  }
}

// function to validate date
function validateDate() {
  const day = document.querySelector('#day');
  const month = document.querySelector('#month');
  const year = document.querySelector('#year');
  day.addEventListener('input', checkDate);
  month.addEventListener('input', checkDate);
  year.addEventListener('input', checkDate);
}

// add eventListener as the page loads
window.addEventListener('DOMContentLoaded', (event) => {
  salaryOutput();
  validateName();
  validateDate();
  checkForUpdate();
});

// function to save to local storage
const save = () => {
  event.preventDefault();
  event.stopPropagation();
  try {
    setEmployeePayrollObject();
    createAndUpdateStorage();
    resetForm();
    window.location.replace(site_properties.home_page)
  } catch (e) {
    return;
  }
}

// function to create employee object and store values by getting it from input fields  
const setEmployeePayrollObject = () => {
  employeePayrollObject._name = getInputValueById('#name');
  employeePayrollObject._profilePic = getSelectedValues('[name=profile]').pop();
  employeePayrollObject._gender = getSelectedValues('[name=gender]').pop();
  employeePayrollObject._department = getSelectedValues('[name=department]');
  employeePayrollObject._salary = getInputValueById('#salary');
  employeePayrollObject._note = getInputValueById('#notes');
  let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
  employeePayrollObject._startDate = new Date(Date.parse(date));
  // alert(employeePayrollData.toString());
}

// Three methods to get value of input field based on class and id
// 1. Class: function to return values of selected items using querySelectorAll
const getSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  let selItems = [];
  allItems.forEach(item => {
    if (item.checked) selItems.push(item.value);
  });
  return selItems;
}

// 2. Id: function to return values of selected items using querySelector
const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
}

// 3. Id: function to return values of selected items using getElementById
const getInputElementValue = (id) => {
  let value = document.getElementById(id).value;
  return value;
}


// function to get EmployeePayrollData stored in local storage, 
// parse into JSON, then add to object and finally update local storage
const createAndUpdateStorage = () => {
  let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  // check if present
  if (employeePayrollList) {
    let empPayrollData = employeePayrollList.find(empData => empData._id == employeePayrollObject._id);
    console.log(empPayrollData, employeePayrollList._id);

    if (!empPayrollData) {
      employeePayrollList.push(createEmployeePayrollData());
    } else {
      const index = employeePayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
      employeePayrollList.splice(index, 1, createEmployeePayrollData(empPayrollData._id));
      console.log(employeePayrollList)
    }
  } else { // else add to object
    employeePayrollList = [createEmployeePayrollData()]
  }

  // update local storage
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

// function to reset input fields
const resetForm = () => {
  setValue('#name', '');
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=department]');
  setValue('#salary', '');
  setTextValue('.salary-output', 400000);
  setTextValue(".text-error", '');
  setTextValue(".date-error", '');
  setValue('#notes', '');
  setValue('#day', '1');
  setValue('#month', 'Jan');
  setValue('#year', '2020');
}

// function to reset checkbox and radio buttons
const unsetSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
    item.checked = false;
  });
}

// function to reset innerHTML of the given element
const setTextValue = (id, value) => {
  let textError = document.querySelector(id);
  textError.textContent = value;
}

// function to reset value of the given element
const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
}

// function to check if there is any update array present inside object of local storage
const checkForUpdate = () => {
  const jsonData = localStorage.getItem('edit-emp');
  isUpdate = jsonData ? true : false;
  if (!isUpdate) return;
  employeePayrollObject = JSON.parse(jsonData);
  setForm();
}

// function to set all the input fields with corresponding values of that element
const setForm = () => {
  setValue('#name', employeePayrollObject._name);
  setSelectedValue('[name = profile]', employeePayrollObject._profilePic);
  setSelectedValue('[name = gender]', employeePayrollObject._gender);
  setSelectedValue('[name = department]', employeePayrollObject._department);
  setValue('#salary', employeePayrollObject._salary);
  setTextValue('.salary-output', employeePayrollObject._salary);
  let date = stringifyDate(employeePayrollObject._startDate).split(" ");
  setValue('#day', date[0]);
  setValue('#month', date[1]);
  setValue('#year', date[2]);
  setValue('#notes', employeePayrollObject._note);
}

// function to set checkbox and radio buttons by selecting the values of that element
const setSelectedValue = (propertyValue, value) => {
  let allItem = document.querySelectorAll(propertyValue);
  allItem.forEach(item => {
    if (Array.isArray(value)) {
      if (value.includes(item.value)) {
        item.checked = true;
      }
    } else if (item.value === value) {
      item.checked = true;
    }
  });
}

// function to create new Employee data 
const createEmployeePayrollData = (id) => {
  let employeePayrollData = new EmployeePayrollData();
  if (!id) employeePayrollData.id = createNewEmployeeID();
  else employeePayrollData.id = id;
  setEmployeePayrollData(employeePayrollData);
  return employeePayrollData;
}

// function to create new Employee id
const createNewEmployeeID = () => {
  let empId = localStorage.getItem('EmpId');
  empId = !empId ? 1 : (parseInt(empId) + 1).toString();
  localStorage.setItem('EmpId', empId);
  return empId;
}

// function to set updated employee data to the array
const setEmployeePayrollData = (employeePayrollData) => {
  try {
    employeePayrollData.name = employeePayrollObject._name;
  } catch (e) {
    setTextValue('.text-error', e);
    throw e;
  }
  employeePayrollData.profilePic = employeePayrollObject._profilePic;
  employeePayrollData.gender = employeePayrollObject._gender;
  employeePayrollData.department = employeePayrollObject._department;
  employeePayrollData.salary = employeePayrollObject._salary;
  employeePayrollData.note = employeePayrollObject._note;
  try {
    employeePayrollData.startDate = new Date(Date.parse(employeePayrollObject._startDate));
  } catch (e) {
    setTextValue('.date-error', e);
    throw e;
  }
  alert(employeePayrollData.toString());
}