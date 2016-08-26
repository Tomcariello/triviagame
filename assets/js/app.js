//create objects for each question
var question01 = {
	text: "question1_text", 
	choices: ["1_1", "1_2", "1_3", "1_4"], 
	correctAnswer: 0, 
	success: "You got it!", 
};
var question02 = {
	text: "question2_text", 
	choices: ["2_1", "2_2", "2_3", "2_4"], 
	correctAnswer: 1, 
	success: "Yuppers"
};
var question03 = {
	text: "question3_text",
	choices: ["3_1", "3_2", "3_3", "3_4"],
	correctAnswer: 2,
	success: "Good job!"
};
var question04 = {
	text: "question4_text",
	choices: ["4_1", "4_2", "4_3", "4_4"],
	correctAnswer: 3,
	success: "Well done!"
};
var question05 = {
	text: "question1_text",
	choices: ["5_1", "5_2", "5_3", "5_4"],
	correctAnswer: 0,
	success: "Go for the gold!"
};
var question06 = {
	text: "question2_text",
	choices: ["6_1", "6_2", "6_3", "6_4"],
	correctAnswer: 1,
	success: "I'm impressed"
};
var question07 = {
	text: "question3_text",
	choices: ["7_1", "7_2", "7_3", "7_4"],
	correctAnswer: 2,
	success: "Keep it going"
};
var question08 = {
	text: "question4_text",
	choices: ["8_1", "8_2", "8_3", "8_4"],
	correctAnswer: 3,
	success: "Perfect"
};
var question09 = {
	text: "question1_text",
	choices: ["9_1", "9_2", "9_3", "9_4"],
	correctAnswer: 0,
	success: "Well la di da!"
};
var question10 = {
	text: "question2_text",
	choices: ["10_1", "10_2", "10_3", "10_4"],
	correctAnswer: 1,
	success: "Not bad!"
};

var questionArray = [question01,question02,question03,question04,question05,question06,question07,question08,question09,question10];

var questionAnsweredCorrectly = 0;
var questionAnsweredIncorrectly = 0;
var questionTimerLength = 5;
var questionTimer;
var currentQuestion = 0;
var timerTarget;
var questionSuccess = false;


function startGame() {
	$('#newGame').css("display", "none");
	questionAnsweredCorrectly = 0;
	questionAnsweredIncorrectly = 0;
	questionTimer = questionTimerLength;
	currentQuestion = 0;
	questionSuccess = false;
	printQuestion();
};

function printQuestion() {
	if (currentQuestion <= questionArray.length - 1) {
		questionSuccess = false;
	
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
	questionTimer = questionTimerLength;
	$('#timer').html(questionTimer);
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
		anwserToPrint = ("<h2>You got it!</h2><hr>");
	} else {
		anwserToPrint = ("<h2>Sorry, that was incorrect</h2><hr>");
	}
	
	$( ".jumbotron" ).html("");
	$( ".jumbotron" ).append( anwserToPrint + questionArray[currentQuestion].success);
	currentQuestion++;
	
	setTimeout(function(){
		printQuestion();
	},2000); 
}

function showEndGame(){
	var correctInsertion;
	var incorrectInsertion;
	
	$( ".jumbotron" ).html("");
	$( ".jumbotron" ).append("<H1>Game Over!</h1>");
	if (questionAnsweredCorrectly == 1) {
		correctInsertion = "question";
	} else {
		correctInsertion = "questions";
	}

	if (questionAnsweredIncorrectly == 1) {
		incorrectInsertion = "question";
	} else {
		incorrectInsertion = "questions";
	}

	$( ".jumbotron" ).append("<p>You got " + questionAnsweredCorrectly + " " + correctInsertion + " correct.</p>");
	$( ".jumbotron" ).append("<p>You got " + questionAnsweredIncorrectly + " " + incorrectInsertion + " incorrect</p>.");

	$('#newGame').css("display", "block");
}

function trackChoices() {
	$('.choice').on('click', function(event) {
		clearInterval(timerTarget);
		var answerGiven = parseInt($(this).attr('data-value'));
		var correctAnswer = parseInt(questionArray[currentQuestion].correctAnswer);
		
		if (answerGiven == correctAnswer) {
			questionSuccess = true;
			questionAnsweredCorrectly++;
		} else {
			questionSuccess = false;
			questionAnsweredIncorrectly++;
		}
	showAnswer();
	});
	
}

$('#playAgain').on('click', function(event) {
	startGame();
});


startGame();