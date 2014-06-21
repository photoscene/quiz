function Q(question, answers, ga_index, q_index) {
    this.question = question;
    this.answers = answers;
    this.ga_index = ga_index;
    this.q_index = q_index;
    this.check = function(answer) {
        return this.answers.indexOf(answer) == this.ga_index; // looks for the index of the selected answer, 
        //and compares it to ga_index (0,1,2,3).
        // if answer's index = ga:index --> gives back true, if not --> false
    };
    this.toDOM = function() {
        $('.question').html("<p>" + this.question + "</p>");
        $('.options-panel').html('');
        $('h2').html('');
        $('.next-button').hide();
        for (var i = 0; i < this.answers.length; i++) { //prints the answers and puts them in .options
            $('.options-panel').append('<div class="options"><p>' + this.answers[i] + '</p></div>');
        }
    };
    this.q_index = function(q_index) {
        $('.next-button').on('click', function() {
            for(var index=0; index < this.q_index.length; index++)
        });
    };
}

function indicateStep() {
    $('.step-active').removeClass('step-active').prev('.step').addClass('step-active');
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
        new Q('Which one is the oldest from the following bands?', ['Pink Floyd', 'Rolling Stones', 'Guns and Roses', 'Cool and the Gang'], 1, 1), // calls Q object
        new Q('In which band sings Jean-Paul "Bluey"?', ['Earth Wind and Fire', 'Metallica', 'Incognito', 'The Beatles'], 2, 2), // calls Q object
        new Q('Which band has sold the most albums?', ['Michael Jackson', 'Bee Gees', 'Fleetwood Mac', 'Led Zeppelin'], 0, 3), // calls Q object
        new Q('Which one is the longest song?', ['Bohemian Rhapsody', 'Echoes', 'November Rain', 'Telegraph Road'], 0, 4) // calls Q object
        );

$(document).ready(function() {

    var q1 = questions[0]; //create the first question with the 0'th element of the Array
    q1.toDOM();
    clickAnswer();

    $('.options').on('click', function() {
        if (q1.check($(this).text()) === true) { // q1 check method's actual parameter (the answer which was selected by user), $(this).text()= answer
            $('.answer').append('<h2>Your answer is correct!<br>Rolling Stones was established in 1962.</h2>');
        } else {
            $('.answer').append('<h2>Your answer is incorrect!<br>Rolling Stones was established in 1962.</h2>');
        }
        $('.next-button').show();
    });

    $('.next-button').on('click', function() {
        indicateStep();
        var q2 = questions[1]; //create the second question with the 0'th element of the Array
        q2.toDOM();
        clickAnswer();
        $('.options').on('click', function() {
            if (q2.check($(this).text()) === true) {
                $('.answer').append('<h2>Your answer is correct!<br>Jean-Paul "Bluey" is the singer of Incognito</h2>');
            } else {
                $('.answer').append('<h2>Your answer is incorrect!<br>Jean-Paul "Bluey" is the singer of Incognito</h2>');
            }
            $('.next-button').show();
        });
    });

});


