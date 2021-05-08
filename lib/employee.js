class Employee {
    constructor(name, id, email, role) {
        this.name = name;
        this.email = email;
        this.id = id;
    }
    
    getName() {
        return this.name
    }

    getEmail() {
        return this.email;
    }

    getId() {
        return this.id;
    }
}

module.exports = Employee;