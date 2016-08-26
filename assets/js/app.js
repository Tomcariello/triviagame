//create objects for each question
var question1 = {text: "question1_text", choices: ["1_1", "1_2", "1_3", "1_4"], correctAnswer: 0, success: "You got it!", fail:"Sorry, the correct answer was..."};
var question2 = {text: "question2_text", choices: ["2_1", "2_2", "2_3", "2_4"], correctAnswer: 1, success: "You got it!", fail:"Sorry, the correct answer was..."};
var question3 = {text: "question3_text", choices: ["3_1", "3_2", "3_3", "3_4"], correctAnswer: 2, success: "You got it!", fail:"Sorry, the correct answer was..."};
var question4 = {text: "question4_text", choices: ["4_1", "4_2", "4_3", "4_4"], correctAnswer: 3, success: "You got it!", fail:"Sorry, the correct answer was..."};

var questionArray = [question1,question2,question3,question4];

var winTotal = 0;
var lossTotal = 0;
var questionAnsweredCorrectly = 0;
var questionAnsweredIncorrectly = 0;
var questionTimer = 15;
var currentQuestion = 0;
var timerTarget;
var questionSuccess = false;


function startGame() {
	//reset all variables
	printQuestion();

};

function printQuestion() {
	if (currentQuestion <= questionArray.length - 1) {
		questionSuccess = false;
		//print question
		questionToPrint = ("<h2>" + questionArray[currentQuestion].text + "</h2><hr>");
			$( ".jumbotron" ).html("");
			$( ".jumbotron" ).append( questionToPrint );

		for (i=0; i<questionArray[currentQuestion].choices.length; i++) {
			choiceToPrint = ("<p><a class='btn btn-primary btn-lg choice' data-value='" + i + "'role='button'>" + questionArray[currentQuestion].choices[i] + "</a></p>");
			$( ".jumbotron" ).append( choiceToPrint );
		}
		startTimer();
		trackChoices();
	} else {
		showEndGame();
	}

}


function startTimer() {
	questionTimer = 5;
	$('#timer').html(questionTimer);
	//wait 2 seconds, clear damage report and move playerCard back
	timerTarget = setInterval(function(){
		updateTimer();
	},1000); 
}

function updateTimer() {
	questionTimer--;
	$('#timer').html(questionTimer);
	if (questionTimer < 1 ) {
		clearInterval(timerTarget);
		currentQuestion++;
		showAnswer();
	} else if (questionTimer < 6 ) {
		$("#timer").addClass("lowTime");
		
	} 
}

function showAnswer() {
	if (questionSuccess == true) {
		anwserToPrint = ("<h2>" + questionArray[currentQuestion].success + "</h2><hr>");
	} else {
		anwserToPrint = ("<h2>" + questionArray[currentQuestion].fail + "</h2><hr>");
	}
	
	$( ".jumbotron" ).html("");
	$( ".jumbotron" ).append( anwserToPrint );
	// printQuestion();
}

function showEndGame(){

}

function trackChoices() {
	$('.choice').on('click', function(event) {
		var answerGiven = parseInt($(this).attr('data-value'));
		var correctAnswer = parseInt(questionArray[currentQuestion].correctAnswer);
		
		if (answerGiven == correctAnswer) {
			questionSuccess = true;
		} else {
			questionSuccess = false;
		}
	showAnswer();
	});
	
}

$('#playAgain').on('click', function(event) {
	startGame();
});


startGame();