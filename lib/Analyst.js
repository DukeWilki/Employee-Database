// TODO: Write code to define and export the Analyst class. HINT: This class should inherit from Employee.
const Base = require("./Employee")

class Analyst extends Base{
    constructor(name, id, email, officeNumber) {
    super(name, id, email)
      this.officeNumber = officeNumber;
    }
      printInfo() {
      console.log(`Phone Number: ${this.officeNumber}`);
    }
    getName() {
      return this.name
  }
    getOfficeNumber() {
        return this.officeNumber
    }
    getRole() {
      return "Analyst"
  }
  }

  module.exports = Analyst