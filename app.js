var inquirer = require('inquirer');



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
        inquirer.prompt([{
            name: 'front',
            message: 'Enter the question here: '
        }, {
            name: 'back',
            message: 'Enter the answer here: '
        }]).then(function(answers) {
            var basicFlashCard = new BasicFlashcard(answers.front, answers.back);
            basicFlashCard.save();
        });
    } else if (response.choice === "Creat cloze card") {
        inquirer.prompt([{
            name: 'text',
            message: 'Enter full text here: '
        }, {
            name: 'cloze',
            message: 'Enter the cloze argument here: '
        }]).then(function(answers) {
            var search = answers.text.search(answers.cloze);
            var substring = answers.text.substring(0, search) + '___________' + answers.text.substring(search + answers.cloze.length);
            var clozeFlashCard = new ClozeFlashcard(substring, answers.cloze);
            clozeFlashCard.save();
        });
    } else if (response.choice === "Show all cards") {
        showAllCards();
    } else if (response.choice === "take the quiz"){

    } else {
        console.log('Thank you for using Flashcard-Generator, goodbye~');
    }
  });    