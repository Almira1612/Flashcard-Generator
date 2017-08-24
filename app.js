var inquirer = require('inquirer');
var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');
var fs = require('fs');

inquirer
  .prompt([
  	   {
      type: "list",
      message: "What do you want to do?",
      choices: ["Creat basic card", "Creat cloze card", "Show all cards", "take the quiz", "Exit"],
      name: "choice"
    }
  ]).then(function(response){
      if (response.choice === "Creat basic card") {
        function askBasicCard(){
        inquirer.prompt([{
            name: 'front',
            message: 'Enter the question here: '
        }, {
            name: 'back',
            message: 'Enter the answer here: '
        }]).then(function(answers) {
            var newCard = new BasicCard(answers.front, answers.back);
            newCard.creatCard();
               inquirer
                  .prompt([
                    {
                        type: "confirm",
                        message: "Do you want creat another card?:",
                        name: "confirm",
                        default: true
                    },
                    ]).then(function(inquirerResponse){
                         if (inquirerResponse.confirm) {
                           askBasicCard();
                         }
                    });
        });
      }
      askBasicCard();
    } else if (response.choice === "Creat cloze card") {
        function askClozeCard(){
            inquirer.prompt([{
                name: 'text',
                message: 'Enter full text here: '
            }, {
                name: 'cloze',
                message: 'Enter the cloze argument here: '
            }]).then(function(answers) {
                var search = answers.text.search(answers.cloze);
                var substring = answers.text.substring(0, search) + '___________' + answers.text.substring(search + answers.cloze.length);
                var clozeCard = new ClozeCard(substring, answers.cloze);
                clozeCard.create();
                    inquirer
                  .prompt([
                    {
                        type: "confirm",
                        message: "Do you want creat another card?:",
                        name: "confirm",
                        default: true
                    },
                    ]).then(function(inquirerResponse){
                         if (inquirerResponse.confirm) {
                           askClozeCard();
                         }
                    });
            });
        }
        askClozeCard();
    } else if (response.choice === "Show all cards") {
        
      
           
            fs.readFile('./quiz.txt', 'utf8', function(error, data) {
               
                if (error) {
                    console.log(error);
                }
             console.log("[" + "Basic Cards: " + data + "]");
            });
             fs.readFile('./dataCloze.txt', 'utf8', function(error, data) {
               
                if (error) {
                    console.log(error);
                }
             console.log("[" + "Cloze Cards: " + data + "]");
            });
        

    } else if (response.choice === "take the quiz"){

    } else {
        console.log('Thank you for using Flashcard-Generator, goodbye~');
    }
  });    