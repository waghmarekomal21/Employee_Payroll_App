// day 45 uc9
// day 46 uc1
class EmployeePayrollData {
    get id() {
      return this._id;
    }
    set id(id) {
      this._id = id;
    }
  
    get name() {
      return this._name;
    }
  
    // day 45 uc10
    set name(name) {
      console.log(name);
      let pattern = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
      if (pattern.test(name))
        this._name = name;
      else
        throw 'Incorrect Name';
    }
  
    get profilePic() {
      return this._profilePic;
    }
  
    set profilePic(profilePic) {
      this._profilePic = profilePic;
    }
  
    get gender() {
      return this._gender;
    }
    set gender(gender) {
      this._gender = gender;
    }
  
    get department() {
      return this._department;
    }
    set department(department) {
      this._department = department;
    }
  
    get salary() {
      return this._salary;
    }
    set salary(salary) {
      this._salary = salary;
    }
  
    get note() {
      return this._note;
    }
    set note(note) {
      this._note = note;
    }
  
    get startDate() {
      return this._startDate;
    }
  
    // day 45 uc10
    set startDate(startDate) {
      let currentDate = new Date();
      if (startDate > currentDate)
        throw "Start Date is a future date";
  
      var diff = Math.abs(currentDate.getTime() - startDate.getTime());
      if (diff / (1000 * 60 * 60 * 24) > 30) {
        throw "Start Date is a beyond 30 days";
      }
      this._startDate = startDate;
    }
  
    toString() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const empDate = !this.startDate ? "undefined" : this.startDate.toLocaleDateString("en-us", options);
      return "\nID = " + this.id + ", \nName = " + this.name + ", \nGender = " +
        this.gender + ", \nProfile URL = " + this.profilePic
        + ", \nDepartment = " + this.department + ", \nSalary = "
        + this.salary + ", \nStart Date = " + empDate + ", \nNote = " + this.note;
    }
  }