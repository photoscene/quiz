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
        $('.next-button').hide();
        for (var i = 0; i < this.answers.length; i++) { //prints the answers and puts them in .options
            $('.options-panel').append('<div class="options"><p>' + this.answers[i] + '</p></div>');
        }
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
        new Q('Which one is the oldest from the following bands?', ['Pink Floyd', 'Rolling Stones', 'Guns and Roses', 'Cool and the Gang'], 1), // calls Q object
        new Q('In which band sings Jean-Paul "Bluey"?', ['Earth Wind and Fire', 'Metallica', 'Incognito', 'The Beatles'], 2), // calls Q object
        new Q('Which band has sold the most albums?', ['Michael Jackson', 'Bee Gees', 'Fleetwood Mac', 'Led Zeppelin'], 0), // calls Q object
        new Q('Which one is the longest song?', ['Bohemian Rhapsody', 'Echoes', 'November Rain', 'Telegraph Road'], 0) // calls Q object
        );

    var q1 = questions[0]; //create the first question with the 0'th element of the Array
    var q2 = questions[0];
    var q3 = questions[0];
    var q4 = questions[0];

$(document).ready(function() {

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
        
        console.log('question2');
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
        event.preventDefault;
    });
   
    
    $('.next-button').on('click', function() {
        console.log('question3');
        indicateStep();
        var q3 = questions[2]; //create the second question with the 0'th element of the Array
        q3.toDOM();
        clickAnswer();
        $('.options').on('click', function() {
            if (q3.check($(this).text()) === true) {
                $('.answer').append('<h2>Your answer is correct!<br>Michael Jackson sold 42.4 million albűlbums from Thriller</h2>');
            } else {
                $('.answer').append('<h2>Your answer is incorrect!<br>Michael Jackson sold 42.4 million albűlbums from Thriller</h2>');
            }
            $('.next-button').show();
        });
    });
    
});


