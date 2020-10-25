// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Base = require("./Employee")

class Intern extends Base{
    constructor(name, id, email, school) {
    super(name, id, email)
      this.school = school;
    }
      printInfo() {
      console.log(`School: ${this.school}`);
    }
    getSchool() {
        return this.school
    }
    getRole() {
        return Intern.name
    }
  }

  module.exports = Intern