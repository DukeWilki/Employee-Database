// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Base = require("./Employee")

class Engineer extends Base{
    constructor(name, id, email, github) {
    super(name, id, email)
      this.github = github;
    }
      printInfo() {
      console.log(`GitHub profile: ${this.github}`);
    }
    
    getGithub() {
        return this.github
    }
    getRole() {
        return "Engineer"
    }

  }

  module.exports = Engineer