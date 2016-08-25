//create objects for each question
var question1 = {text: "question1_text", choices: ["1_1", "1_2", "1_3", "1_4"], correctAnswer: "choice3", success: "something", fail:"something"};
var question2 = {text: "question2_text", choices: ["2_1", "2_2", "2_3", "2_4"], correctAnswer: "choice3", success: "something", fail:"something"};
var question3 = {text: "question3_text", choices: ["3_1", "3_2", "3_3", "3_4"], correctAnswer: "choice3", success: "something", fail:"something"};
var question4 = {text: "question4_text", choices: ["4_1", "4_2", "4_3", "4_4"], correctAnswer: "choice3", success: "something", fail:"something"};

var questionArray = [question1,question2,question3,question4];

var winTotal = 0;
var lossTotal = 0;
var questionAnsweredCorrectly = 0;
var questionAnsweredIncorrectly = 0;
var questionTimer = 15;
var currentQuestion = 0;
var timerTarget;

function startGame() {
	//reset all variables
	printQuestion();
	startTimer();

};

function printQuestion() {
	//print question
	questionToPrint = ("<h2>" + questionArray[currentQuestion].text + "</h2><hr>");
		$( ".jumbotron" ).html("");
		$( ".jumbotron" ).append( questionToPrint );

	for (i=0; i<questionArray[currentQuestion].choices.length; i++) {
		choiceToPrint = ("<p><a class='btn btn-primary btn-lg choice' role='button'>" + questionArray[currentQuestion].choices[i] + "</a></p>");
		$( ".jumbotron" ).append( choiceToPrint );
	}
}


function startTimer() {
	questionTimer = 15;
	$('#timer').html(questionTimer);
	//wait 2 seconds, clear damage report and move playerCard back
	var timerTarget = setInterval(function(){
		updateTimer();
	},1000); 
}

function updateTimer() {
	questionTimer--;
	if (questionTimer < 1 ) {
		clearInterval(timerTarget);
		//call next question
	} else if (questionTimer < 6 ) {
		$("#timer").addClass("lowTime");
		$('#timer').html(questionTimer);
	} else {
		$('#timer').html(questionTimer);
	}
}


$('#playAgain').on('click', function(event) {
	startGame();
});


startGame();