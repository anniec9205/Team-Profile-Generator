const Employee = require("./employee");

class Intern extends Employee {
    constructor(name, email, id, school) {
        super(name, id, email);
        this.school = school;
    }

    getRole() {
        return "intern";
    }
    
    getSchool() {
        return this.school;
    }
}

module.exports = Intern;
