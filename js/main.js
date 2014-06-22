function Q(question, answers, ga_index) {
    this.question = question;
    this.answers = answers;
    this.ga_index = ga_index;
    this.check = function(answer) {
        return this.answers.indexOf(answer) == this.ga_index; // looks for the index of the selected answer, 
        //and compares it to ga_index (0,1,2,3).
        // if answer's index = ga:index --> gives back true, if not --> false
    };
    this.toDOM = function() {
        $('.question').html("<p>" + this.question + "</p>");
        $('.options-panel').html('');
        $('h2').html('');
        //$('.next-button').hide();
        for (var i = 0; i < this.answers.length; i++) { //prints the answers and puts them in .options
            $('.options-panel').append('<div class="options"><p>' + this.answers[i] + '</p></div>');
        }
    };
}
function indicateStep() {
    if (newId > 0) {
        $('.step-active').removeClass('step-active').prev('.step').addClass('step-active');
    }
}
function clickAnswer() {
    $('.options').on('click', function() {
        $('h2').hide();
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
    });
}

var questions = new Array();
questions.push(// puts the questions in the new Array
        new Q('Which one is the oldest from the following bands?', ['Pink Floyd', 'Rolling Stones', 'Guns and Roses', 'Cool and the Gang'], 1), // calls Q object with these parameters
        new Q('In which band sings Jean-Paul "Bluey"?', ['Earth Wind and Fire', 'Metallica', 'Incognito', 'The Beatles'], 2),
        new Q('Which band has sold the most albums?', ['Michael Jackson', 'Bee Gees', 'Fleetwood Mac', 'Led Zeppelin'], 0),
        new Q('Which one is the longest song?', ['Bohemian Rhapsody', 'Echoes', 'November Rain', 'Telegraph Road'], 0)
        );

$(document).ready(function() {
    var currentQuestionId = -1; // it is -1 because in the nextQuestion variable I always add 1, so the first question in the array = -1 + 1 == [0]
    $('.next-button').on('click', function() {
        $('.question p').hide();
        newId = currentQuestionId + 1;
        if (newId < questions.length) { // in default 0 < 4 -->true
            currentQuestionId = newId; // it was -1, now it is 0
            nextQuestion = questions[currentQuestionId];
            nextQuestion.toDOM();
        } else {
            alert('No more questions left!');
        }
        clickAnswer();
        indicateStep();
        $('.options').on('click', function() {
            var correctness = 'incorrect'; //the answer is incorrect by default so there is no need for one more condition!
            if (nextQuestion.check($(this).text()) === true) {
                correctness = 'correct';
                $('.level-eq').first().removeClass('level-eq').addClass('level-eq2').fadeIn(300);
            }
            var appending_text = '<h2> Your answer is ' + correctness + '!<br>';
            //I noticed you show pretty the same string here regardless of correctness.
            //why not to incapsulate it in your `q` objects so they just return that string?
            $('.answer').append(appending_text);
        });
    });

});


