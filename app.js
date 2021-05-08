const inquirer = require("inquirer");
const fs = require("fs");
const jest = require("jest");
const axios = require("axios");
const manager = require("./Library/manager");
const intern = require("./Library/intern");
const engineer = require("./Library/engineer");
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
            "manager"
            "engineer",
            "intern",
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
        if (role === "engineer") {
            roleInfo = "GitHub username";
        } else if (role === "intern") {
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
            if (role === "engineer") {
                newMember = new Engineer(name,roleInfo, email, id);
            } else if (role === "intern") {
                newMember = new Intern(name,roleInfo, email, id);
            } else {
                newMember = new Manager(name,roleInfo, email, id);
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

initApp();
