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
        <nav class="navbar navbar-dark bg-light mb-6">
            <span class="navbar-brand mb-1 h2 w-95 text-center">Team Profile!</span>
        </nav>

        <div class="container">
            <div class="row">`;
            
    fs.writeFile("./Test/team.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("start");
}

initApp();
