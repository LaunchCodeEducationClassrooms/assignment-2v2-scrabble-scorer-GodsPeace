// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};




// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
//greet player and prompt for word//
function initialPrompt() {
   let word=input.question("Let's play some scrabble!\nEnter a word to score: ");
   return word;
   
};




function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";

	for (let i = 0; i < word.length; i++) {

	  for (const pointValue in oldPointStructure) {

		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `${pointValue}\n`
		 }

	  }
	}
	return letterPoints;
 };

let simpleScore=(word)=> {
  word = word.toUpperCase();
  return word.length;
};

let  vowelBonusScore=(word)=> {

  let wordArray = word.toLowerCase().split("");
  let vowels = ["a", "e", "i", "o", "u"];
  let pointsForVowel = 3;
  let pointsForConsonant = 1;
  let finalVowelBonusPoints = 0;

  wordArray.forEach(letter => {
    if (vowels.includes(letter)) {
      finalVowelBonusPoints += pointsForVowel;
    } else {
      finalVowelBonusPoints += pointsForConsonant;
    }

  });

  return finalVowelBonusPoints;

};


//word=input.question("Let's play some scrabble!\nEnter a word to score: ");
  
  let scoringMethod0={
    name:"Simple Score",
    description: "Each letter is worth 1 point",	
    scorerFunction: simpleScore

  };
  let scoringMethod1={
    name:"Bonus Vowels",
    description:"Vowels are 3 pts",
    scoreFunction:vowelBonusScore 
  };
  let scoringMethod2={ 
    name:"Scrabble",
    description:"Uses the scrabbleScore() function to determine the score for a given word",
    scoreFunction: oldScrabbleScorer()}  

const scoringAlgorithms = [scoringMethod0,scoringMethod1,scoringMethod2];



let scrabbleScore;





  
function scorerPrompt(){
let algorithmChoice=input.question(`What scoring algorithm would you like to use?:\n0-${scoringAlgorithms[0].name}\n1-${scoringAlgorithms[1].name}\n2-${scoringAlgorithms[2].name}\nEnter your choice: `);
  
   return algorithmChoice;


};
//function transform() {};

//function transform(oldPointStructure){
 function transform(oldPointStructure){
  let newLettersAsKeysObject = {};
  for (const [letterValue, letterArr] of Object.entries(oldPointStructure)) {
    for (const letter of letterArr) {
      newLettersAsKeysObject[letter.toLowerCase()] = Number(letterValue);
    }
  }
  return newLettersAsKeysObject;
}
{
console.log(transform(oldPointStructure)); 

}

//oldScrabbleScorer() uses oldPointStructure and returns a score for each letter in a word. You'll want to write scrabbleScore() to use newPointStructure and return a cumulative score for the whole word entered.

let newPointStructure=transform(oldPointStructure);


function runProgram() {

  let word=initialPrompt();
  let algorithmChoice = scorerPrompt();
 

if (algorithmChoice==0) {

    console.log(`You have chosen Simple Score\nYour score is: ${simpleScore(word)} `)
}
if (algorithmChoice == 1){
            console.log (`You have chosen Bonus Vowels\nYour score is: ${vowelBonusScore(word)} `)
}
if (algorithmChoice == 2){
            console.log (`You have chosen Scrabble\nYour score is:\n${scrabbleScore(word)} `)
}
{
  console.log(word[2]);
  }
}
// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

