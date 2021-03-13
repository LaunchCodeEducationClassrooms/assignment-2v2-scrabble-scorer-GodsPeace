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

//greet player and prompt for word//
function initialPrompt() {
   let word=input.question("Let's play some scrabble!\n\nEnter a word to score: ");
   return word;
   
};
//inefficiently iterate over each key in oldPointStructure and then checks if the letter is inside the array paired with that key
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
//
let simpleScore=(word)=> {
  word = word.toUpperCase();
  return word.length;
};

let  vowelBonusScore=(word)=> {

  let wordArray = word.toUpperCase().split("");
  let vowels = ["A", "E", "I", "O", "U"];
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
let newPointStructure=transform(oldPointStructure); 


let scrabbleScore=(word)=> {
word = word.toLowerCase();
let totalLetterPoints = 0;

for (i = 0; i < word.length; i++) {
    letter = word[i];
    totalLetterPoints += newPointStructure[letter];
}
return(totalLetterPoints);
}
  
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
    scoreFunction: scrabbleScore }  

const scoringAlgorithms = [scoringMethod0,scoringMethod1,scoringMethod2];


  
function scorerPrompt(){
let algorithmChoice=input.question(`\nWhat scoring algorithm would you like to use?:\n\n0-${scoringAlgorithms[0].name}-1 point for each letter\n\n1-${scoringAlgorithms[1].name}-Vowels are worth 3 points\n\n2-${scoringAlgorithms[2].name}-Uses standard Scrabble scoring system\n\nEnter 0, 1, or 2: `);
  
   return algorithmChoice;
}

 function transform(oldPointStructure){
  let newLettersAsKeysObject = {};
  for (const [letterValue, letterArr] of Object.entries(oldPointStructure)) {
    for (const letter of letterArr) {
      newLettersAsKeysObject[letter.toLowerCase()] = Number(letterValue);
    }
  }
  return newLettersAsKeysObject;
}




function runProgram() {

  let word=initialPrompt();
  let algorithmChoice = scorerPrompt();
 

if (algorithmChoice==0) {

    console.log(`You have chosen Simple Score\nThe score for the word ${word} is ${simpleScore(word)} `)
}
if (algorithmChoice == 1){
            console.log (`You have chosen Bonus Vowels\nThe score for the word ${word} is ${vowelBonusScore(word)}. `)
}
if (algorithmChoice == 2){
            console.log (`You have chosen Scrabble\nThe score for the word ${word} is ${scrabbleScore(word)} `)
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

