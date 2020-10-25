// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
      this.name = name;
      this.id = id;
      this.email = email;
    }
      printInfo() {
      console.log(`Name: ${this.name}`);
      console.log(`ID Number: ${this.id}`);
      console.log(`E-Mail: ${this.email}`);
    }

    getName() {
        return this.name
    }
    getId() {
        return this.id
    }
    getEmail() {
        return this.email
    }
    getRole() {
        return "Employee"
    }

  }

module.exports = Employee