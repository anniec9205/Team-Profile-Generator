const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");
const Engineer = require("./lib/engineer");
const employees = [];

function initApp() {
    startHtml();
    addMember();
}

function addMember() {
    inquirer.prompt([{
        message: "What is the team member's name",
        name: "name"
    },
    {
        type: "list",
        message: "Choose team member's role",
        choices: [
            "Manager",
            "Engineer",
            "Intern",
        ],
        name: "role"
    },
    {
        message: "What is the team member's email address",
        name: "email"
    },
    {
        message: "What is the team member's id",
        name: "id"
    }])
    .then(function({name, role, email, id}) {
        let roleInfo = "";
        if (role === "Engineer") {
            roleInfo = "GitHub username";
        } else if (role === "Intern") {
            roleInfo = "school name";
        } else {
            roleInfo = "office phone number";
        }
        inquirer.prompt([{
            message: `What is the team member's ${roleInfo}`,
            name: "roleInfo"
        },
        {
            type: "list",
            message: "Do you want to add more team members?",
            choices: [
                "yes",
                "no"
            ],
            name: "moreMembers"
        }])
        .then(function({roleInfo, moreMembers}) {
            let newMember;
            if (role === "Engineer") {
                newMember = new Engineer(name, roleInfo, email, id);
            } else if (role === "Intern") {
                newMember = new Intern(name, roleInfo, email, id);
            } else {
                newMember = new Manager(name, roleInfo, email, id);
            }
            employees.push(newMember);
            addHtml(newMember)
            .then(function() {
                if (moreMembers === "yes") {
                    addMember();
                } else {
                    finishHtml();
                }
            });
        });
    });
}

function startHtml() {
    const html = 
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">

        <link rel="stylesheet"href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

        <title>Team Profile!</title>

    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-6">
            <span class="navbar-brand mb-1 h2 w-95 text-center">Team Profile!</span>
        </nav>

        <div class="container">
            <div class="row">`;
    fs.writeFile("./__tests__/team.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("start");
}

function addHtml(member) {
    return new Promise (function (resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const email = member.getEmail(); 
        const id = member.getId();
        
        let data = "";
        if (role === "Engineer") {
            const gitHub = member.getGithub();
            data = 
            `<div class="col-5">
            <div class="card mx-auto mb-4" style="width: 17rem">
            
            <h5 class="card-header">${name}<br /><br />Engineer!</h5>

            <ul class="list-group list-group-flush">
                <li class="list-group-item">id: ${id}</li>
                <li class="list-group-item">email address: ${email}</li>
                <li class="list-group-item">gitHub: ${gitHub}</li>
            </ul>

            </div>
            </div>`;

        } else if (role === "Intern") {
            const school = member.getSchool();
            data = 
            `<div class="col-5">
            <div class="card mx-auto mb-4" style="width: 17rem">

            <h5 class="card-header">${name}<br /><br />Intern!</h5>

            <ul class="list-group list-group-flush">
                <li class="list-group-item">id: ${id}</li>
                <li class="list-group-item">email address: ${email}</li>
                <li class="list-group-item">school: ${school}</li>
            </ul>

            </div>
            </div>`;

        } else {
            const officePhone = member.getOfficeNumber();
            data = 
            `<div class="col-5">
            <div class="card mx-auto mb-4" style="width: 17rem">

            <h5 class="card-header">${name}<br /><br />Manager!</h5>

            <ul class="list-group list-group-flush">
                <li class="list-group-item">id: ${id}</li>
                <li class="list-group-item">email address: ${email}</li>
                <li class="list-group-item">office phone: ${officePhone}</li>
            </ul>

            </div>
            </div>`
        }

        console.log("adding team member");
        fs.appendFile("./__tests__/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
}

function finishHtml() {
    const html = 
    `</div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./__tests__/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("end");
}

initApp();
