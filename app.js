var inquirer = require('inquirer');
var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');
var fs = require('fs');
var count = 0;
var point = 0;
var cards = 0;

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
            inquirer
              .prompt([
                   {
                  type: "list",
                  message: "Which type of cards do you want?",
                  choices: ["Basic card", "Cloze card"],
                  name: "whichCard"
                }
              ]).then(function(answers) {
                //choose basic card------------------------------------------
                  if (answers.choices === "Basic card") {
                     fs.readFile("quiz.txt", "utf8", function(error, data) {
                      var dataArr = data.split("\n");
                 //re-display the content as an array for later use.
                      for (var i = 0; i < dataArr.length-1; i++){
                        var cardArr = dataArr[i].split("+");
                        var card = new BasicCard(cardArr[0],cardArr[1]);
                        cards.push(card);
                      }
              //show the front text of cards
                var questions = function(){
                  //   if(count < cards.length){
                  //     console.log(cards[count].front);
                      inquirer.prompt([
                          {
                            type: "input",
                            name: "answer",
                            message: "Answer is : ",
                          }
                        ]).then(function(answers){
                            if(answers.answer === cards(count).back){
                              count++;
                              point++;
                            }
                            else {
                              console.log("Wrong answer, the correct answer is: " + cards(count).back);
                              count++;
                            }
                        questions();
                            });
                  //   }else {
                  // console.log("Game over");
                  // console.log("Your score is: " + point);
                  //        }
                    };
                  questions();
                });
              }else {
        //Choose Cloze card------------------------------------------ 
             count = 0;
             point = 0;
             fs.readFile("dataCloze.txt", "utf8", function(error, data) {
              var dataArr = data.split("\n");
               for (var i = 0; i < dataArr.length-1;i++){
                var cardArr = dataArr[i].split("+");
                var cardC = new ClozeCard(cardArr[0],cardArr[1]);
                cards.push(cardC);
                   }
                       var ClozeQuestions = function(){
                        if(count < cards.length){
                          cards[count].clozeDeleted();
                           inquirer.prompt([
                              {
                                 type: "input",
                                 name: "answer",
                                 message: "Answer is : ",
                              }
                               ]).then(function(answers){
                                   if(answers.answer === cards(count).cloze){
                                     count++;
                                     point++;
                                   }else{
                                     count++;
                                     console.log("Wrong answer, the correct answer is: " + cards(count).cloze);
                                   }
                                   ClozeQuestions();
                               });
                               
                         }else{
                             console.log("Game over");
                            console.log("Your score is: " + point);
                             }
                        };
                    ClozeQuestions();
                }); 
           }
      });
    }else {
          console.log('Thank you for using Flashcard-Generator, goodbye~');
      }
    });    