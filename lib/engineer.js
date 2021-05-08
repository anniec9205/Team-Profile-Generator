const Employee = require("./employee");

class Engineer extends Employee {
    constructor (name, email, id, github) {
        super(name, id, email);
        this.github = github;
    }
    
    getRole() {
        return "engineer";
    }
    
    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;