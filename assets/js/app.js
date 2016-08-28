//create objects for each question
var question01 = {
	text: "What was the main event at UFC 1?", 
	choices: ["Royce Gracie	vs. Gerard Gordeau", "Royce Gracie vs. Ken Shamrock", "Patrick Smith vs. Art Jimmerson", "Kevin Rosier vs. Zane Frazier"], 
	correctAnswer: 0, 
	success: "UFC was contested under tournament rules. Royce Gracie won the tournament by defeating Gerard Gordeau via submission due to a rear naked choke. He had beaten Art Jimmerson and Ken Shamrock earlier in the night.", 
};
var question02 = {
	text: "Which US politician referred to the UFC as 'human cockfighting' in 1997?", 
	choices: ["Tom Daschle", "John McCain", "Mitch McConnell", "Trent Lott"], 
	correctAnswer: 1, 
	success: "John McCain was a major reason why the UFC was banned in every state and taken off pay-per-view in the late 1990s. Politically, he was MMA's biggest adversary. McCain is still not a huge UFC fan, but has repeatedly said positive things about how far MMA has come since he railed against it."
};
var question03 = {
	text: "What superstar was most influential in the launch the UFC woman's bantamweight division?",
	choices: ["Laila Ali", "Cris Cyborg", "Miesha Tate", "Ronda Rousey"],
	correctAnswer: 3,
	success: "The UFC had long balked at the prospect of adding women into its fold because of the perception that there wasn't enough depth to create meaningful weight classes. Rousey's rising stardom had a significant impact on the way the UFC  viewed the potential for female fighters in the UFC."
};
var question04 = {
	text: "What was middleweight Anderson Silva's excuse for failing a drug test?",
	choices: ["Accidential ingestion", "Lab error", "Tainted sexual enhancement pills"],
	correctAnswer: 3,
	success: "Silva tested positive before and after his fight in January against Nick Diaz at UFC 183. The results of the tests showed Silva had traces of Drostanolone along with Androstane. The former middleweight champion claimed a tainted product he took for sexual performance led to part of the positive results."
};
var question05 = {
	text: "Who was the first two-division champion in UFC history?",
	choices: ["BJ Penn", "Conor McGregor", "Daniel Cormier", "Randy Couture"],
	correctAnswer: 3,
	success: "Randy Couture is a former three-time UFC Heavyweight Champion, two-time UFC Light Heavyweight Champion, and the UFC 13 Heavyweight Tournament Winner. Couture is the first of only two fighters to hold two UFC championship titles in two different divisions (along with B.J. Penn)."
};
var question06 = {
	text: "Who is this?<br><img src='assets/images/who.png'>",
	choices: ["Matt Hughes", "Frank Trigg", "George St Pierre", "Rich Franklin"],
	correctAnswer: 2,
	success: "Georges St Pierre (GSP) is a three-time former UFC Welterweight Champion. He is frequently cited as one of the greatest MMA fighters of all time. On December 13, 2013, while holding the record for most wins in title bouts in UFC history, St-Pierre vacated the title and retired from the sport."
};
var question07 = {
	text: "Which UFC event had the most pay-per-view buys?",
	choices: ["UFC 202", "UFC 196", "UFC 1", "UFC 100"],
	correctAnswer: 4,
	success: "UFC 100, headlined by a heavyweight clash between Brock Lesnar and Frank Mir and also featuring a middleweight bout between Dan Henderson and Michael Bisping, sold 1.6 million buys on pay-per-view."
};
var question08 = {
	text: "'The Ultimate Fighter' reality show is credited with making the UFC mainstream. Which two light heavyweight fighters featured on the show fought in the finale?",
	choices: ["Ken Shamrock vs. Rich Franklin", "Diego Sanchez vs Kenny Florian", "Forest Griffin vs. Stephen Bonnar", "Chris Leben vs Josh Koscheck"],
	correctAnswer: 2,
	success: "Even though the main attraction of the event was Rich Franklin vs the UFC Hall of Famer Ken Shamrock the spotlight was stolen by the incredible bout between Forrest Griffin and Stephan Bonnar. Hailed as one of the greatest fights in MMA history by many, Forrest and Stephan produced a 3 round stand up war that went the distance. Although Forrest Griffin would take the decision both men were given UFC contracts for their amazing performance."
};
var question09 = {
	text: "What was the last state in the US to legalize MMA contests?",
	choices: ["Nevada", "New York", "California", "Texas"],
	correctAnswer: 1,
	success: "For years, the UFC had lobbied to overturn a 1997 action outlawing the sport in New York state, but its efforts were repeatedly stymied. On March 23, 2016, New York became the last state to legalize MMA. The legalization of MMA competitions in New York State will allow the UFC to hold events in the world famouse Madison Square Garden later this year."
};
var question10 = {
	text: "What submission technique has been used the most to end fights in the UFC?",
	choices: ["Triangle", "Heel hook", "Rear naked choke", "Armbar"],
	correctAnswer: 2,
	success: "The rear naked choke (RNC) is a chokehold in martial arts applied from an opponent's back. Either arm can be used to apply the choke. The attacker's arm encircles the opponent's neck and then grabs his own biceps on the other arm to apply pressure to both sides of the opponents' neck. This is considered a 'blood choke' because it restricts blood flow to the brain via the carotid arteries."
};

var questionArray = [question01,question02,question03,question04,question05,question06,question07,question08,question09,question10];

var questionAnsweredCorrectly = 0;
var questionAnsweredIncorrectly = 0;
var questionsUnanswered = 0;
var questionTimer;
var currentQuestion = 0;
var timerTarget;
var questionSuccess = false;
var questionTimerLength = 2;
var timeToDisplayAnswers = 2000;


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
	$('#timerWindow').css("visibility","visible");
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
		questionsUnanswered++;
		showAnswer();
	} else if (questionTimer < 6 ) {
		$("#timer").addClass("lowTime");
	} 
}

function showAnswer() {
	$('#timerWindow').css("visibility","hidden");
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
	},timeToDisplayAnswers); 
}

function showEndGame(){
	$('#timerWindow').css("visibility","hidden");

	var correctInsertion;
	var incorrectInsertion;
	var unansweredInsertion;

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

	if (questionsUnanswered == 1) {
		unansweredInsertion = "question";
	} else {
		unansweredInsertion = "questions";
	}

	$( ".jumbotron" ).append("<p>You got " + questionAnsweredCorrectly + " " + correctInsertion + " correct.</p>");
	$( ".jumbotron" ).append("<p>You got " + questionAnsweredIncorrectly + " " + incorrectInsertion + " incorrect.</p>");
	$( ".jumbotron" ).append("<p>You left " + questionsUnanswered + " " + unansweredInsertion + " unanswered.</p>");

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