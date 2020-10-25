// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Base = require("./Employee")

class Manager extends Base{
    constructor(name, id, email, officeNumber) {
    super(name, id, email)
      this.officeNumber = officeNumber;
    }
      printInfo() {
      console.log(`Phone Number: ${this.officeNumber}`);
    }
    getOfficeNumber() {
        return this.officeNumber
    }
    getRole() {
        return "Manager"
    }
  }

  module.exports = Manager