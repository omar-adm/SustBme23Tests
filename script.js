document.addEventListener('DOMContentLoaded', (event) => {
    // Adding event listeners to all input fields to update the counter live
    var form = document.forms['testForm'];
    var inputs = form.querySelectorAll('input[type="text"], textarea, input[type="radio"]');
    
    inputs.forEach(function(input) {
        input.addEventListener('input', updateCounter);
        if (input.type === 'radio') {
            input.addEventListener('change', updateCounter);
        }
    });
    
    updateCounter(); // Initial call to set the counter
});

function updateCounter() {
    var form = document.forms['testForm'];
    var textInputs = form.querySelectorAll('input[type="text"], textarea');
    var radioGroups = {};

    // Count answered text inputs and textareas
    var answered = 0;
    textInputs.forEach(function(input) {
        if (input.value.trim() !== '') {
            answered++;
        }
    });

    // Group radio buttons by their name attribute
    var radioInputs = form.querySelectorAll('input[type="radio"]');
    radioInputs.forEach(function(input) {
        if (!radioGroups[input.name]) {
            radioGroups[input.name] = [];
        }
        radioGroups[input.name].push(input);
    });

    // Count answered radio groups
    Object.keys(radioGroups).forEach(function(groupName) {
        var group = radioGroups[groupName];
        var groupAnswered = group.some(function(input) {
            return input.checked;
        });
        if (groupAnswered) {
            answered++;
        }
    });

    document.getElementById('counter').innerText = 'Answered: ' + answered +" of 20";
}

function submitForm() {
    var score = 0;
    var form = document.forms['testForm'];
    var results = document.getElementById('results');
    var scoreText = document.getElementById('score');

    // Clear previous results
    results.innerHTML = '<h2>Results</h2>';
    
    // Multiple Choice Answers
    var answers = ['c', 'b', 'a', 'd', 'd', 'd', 'c', 'b', 'd', 'a'];

    for (var i = 0; i < answers.length; i++) {
        var userAnswer = form['q' + (i + 1)].value;
        var feedback = document.createElement('p');
        if (userAnswer === answers[i]) {
            score++;
            feedback.innerText = "Question " + (i + 1) + ": Correct";
            feedback.style.color = 'green';
        } else {
            feedback.innerText = "Question " + (i + 1) + ": Incorrect. The correct answer is " + answers[i].toUpperCase();
            feedback.style.color = 'red';
        }
        results.appendChild(feedback);
    }

    // Matching Answers
    var matchingAnswers = ['c', 'a', 'b', 'e', 'j', 'i', 'd', 'f', 'g', 'h'];

    for (var i = 0; i < matchingAnswers.length; i++) {
        var userAnswer = form['match' + (i + 1)].value.toLowerCase();
        var feedback = document.createElement('p');
        if (userAnswer === matchingAnswers[i]) {
            score++;
            feedback.innerText = "Match " + (i + 1) + ": Correct";
            feedback.style.color = 'green';
        } else {
            feedback.innerText = "Match " + (i + 1) + ": Incorrect. The correct answer is " + matchingAnswers[i].toUpperCase();
            feedback.style.color = 'red';
        }
        results.appendChild(feedback);
    }

    // Display score
    scoreText.innerText = 'Your score is: ' + score + ' | 20';
    results.style.display = 'block';
    updateCounter();
    document.getElementById("testForm").reset();
}
