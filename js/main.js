// Question object, which checks itself if the answer is correct
function Q(question, answers, ga_index) {
    this.question = question;
    this.answers = answers;
    this.ga_index = ga_index;
    this.check = function(answer) {
        return this.answers.indexOf(answer) === this.ga_index; // looks for the index of the selected answer, and compares it to ga_index (0,1,2,3).
        // if answer's index = ga:index --> gives back true, if not --> false
    };
// puts itselft to DOM
    this.toDOM = function() {
        $('.question').html("<p>" + this.question + "</p>");
        $('.options-panel').html(''); //clears the content
        $('h2').html(''); //clears the content of the check function
        for (var i = 0; i < this.answers.length; i++) { //prints the answers and puts them in .options. It uses the length of the array with the answers.
            $('.options-panel').append('<div class="options"><p>' + this.answers[i] + '</p></div>');
        }
    };
}
// sets the step's focus in the right upper corner
function indicateStep() {
    if (newId > 0) {
        $('.step-active').removeClass('step-active').prev('.step').addClass('step-active');
    }
}

// set focus of the selected answer
function clickAnswer() {
    $('.options').on('click', function() {
        $('h2').hide();
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
    });
}

// storing questions in array
var questions = new Array();
questions.push(// puts the questions in the new Array
        new Q('Which one is the oldest from the following bands?', ['Pink Floyd', 'Rolling Stones', 'Guns and Roses', 'Cool and the Gang'], 1), // calls Q object with these parameters
        new Q('In which band sings Jean-Paul "Bluey"?', ['Earth Wind and Fire', 'Metallica', 'Incognito', 'The Beatles'], 2),
        new Q('Which band has sold the most albums?', ['Michael Jackson', 'Bee Gees', 'Fleetwood Mac', 'Led Zeppelin'], 0),
        new Q('Which one is the longest song?', ['Bohemian Rhapsody', 'Echoes', 'November Rain', 'Telegraph Road'], 0)
        );

// shows the next question from the array
$(document).ready(function() {
    var currentQuestionId = -1; // it is -1 because in the nextQuestion variable I always add 1, so the first question in the array = -1 + 1 == [0]
    $('.next-button').on('click', function() {
        $('.question p').hide();
        newId = currentQuestionId + 1;
        if (newId < questions.length) { // in default 0 < 4 -->true
            currentQuestionId = newId; // it was -1, now it is 0
            nextQuestion = questions[currentQuestionId];
            nextQuestion.toDOM();
        } else { // if there is no more question left, shows the final screen.
            $('.evaluate-window').fadeIn(300);
        }
        clickAnswer();
        indicateStep(); 
// desides whether a question is correct or not
        $('.options').on('click', function() {
            var correctness = 'incorrect'; //the answer is incorrect by default so there is no need for one more condition!
            if (nextQuestion.check($(this).text()) === true) {
                correctness = 'correct';
                $('.level-eq').first().removeClass('level-eq').addClass('level-eq2').fadeIn(300); // there is a bug: if I push the next button on the same question, it always adds a new eq part
            }
            var appending_text = '<h2> Your answer is ' + correctness + '!<br>';
            $('.answer').append(appending_text);
        });
    });

});


