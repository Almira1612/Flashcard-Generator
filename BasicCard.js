var fs = require("fs");

// constructor for BasicCard
function BasicCard(front,back){
    this.front = front;
    this.back = back;
    this.creatCard = function(){
       fs.appendFile("quiz.txt","{front: " + front + ", back: " + back + "}" , function(err){
     	  if (err) {
                console.log(err);
            }
       });
   };
}

module.exports = BasicCard;