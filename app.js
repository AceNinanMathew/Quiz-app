let result = null; // Global variable
let indexValue = 0;
let correctOption = null;
let c=0;
let t=0;

(async () => {
    try {
        const response = await fetch("https://opentdb.com/api.php?amount=25");
        if (response.ok) {
            quizData = await response.json(); // Assign data to the global variable
            console.log("Data fetched and stored globally:", quizData);
            result = quizData.results;
            console.log(result[indexValue].question);
        } else {
            console.error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }
})();

const displayQuestion = ()=>{
    correctOption = result[indexValue].correct_answer
    options = [correctOption,...result[indexValue].incorrect_answers]
    console.log(options);
    const shuffledOptions = options.sort(() => Math.random() - 0.5);

    let optionHTML = '';
    shuffledOptions.forEach((option, index) => {
        const optionLabel = String.fromCharCode(97 + index);  // Converts index to 'a', 'b', 'c', 'd', etc.
        optionHTML += `
            <li class="option">
                <label class="custom-radio" id="${option}">
                    <input type="radio" name="answer" value="${option}">
                    <span class="checkmark"></span> ${optionLabel}. ${option}
                </label>
            </li>
        `;
    });


    board.innerHTML = `
    <div>
        <h2>Quiz Master Challenge</h2>
        <p>${result[indexValue].question}</p>
        <form id="quizForm">
            <ul class="optionlist">
                ${optionHTML} <!-- Dynamic list of options -->
            </ul>
            <button type="button" onclick="nextQuestion()" class="btn btn-warning btn1">Next</button>
            <button type="button" onclick="calcResult()" class="btn btn-success btn3">Finish</button>
        </form>
    </div>`;

    
}

const nextQuestion = () =>{
    const quizForm = document.getElementById('quizForm'); 
    const selectedOption = quizForm.querySelector('input[name="answer"]:checked'); 

    if (selectedOption) {
        const selectedValue = selectedOption.value; 
        const correctAnswer = result[indexValue].correct_answer;
        console.log("Selected Option:", selectedOption);

        // Check if it's correct
        if (selectedValue === result[indexValue].correct_answer) {
            console.log(selectedValue);
            c++
        } else {
           
            console.log("Wrong Answer!");
            console.log(selectedValue);
        }
        const correctLabel = document.getElementById(correctAnswer);
        if(correctLabel){
            correctLabel.style.color = "green"
        }
        result[indexValue].incorrect_answers.map(item=>{
            wrongLabel = document.getElementById(item);
            if(wrongLabel){
            wrongLabel.style.color = "red"
            }
        })
        if(indexValue>24){
            calcResult()
        }else{
        indexValue++;
        setTimeout(displayQuestion,2000);
        }
    } else {
        alert("No option selected. Please select an option.");
    }
}

function restartQuiz(){
    indexValue=0;
    c=0;
    displayQuestion();
}

const calcResult = ()=>{
    board.innerHTML = `
    <div class="text-center">
    <h1 style="font-family: 'Brush Script MT', cursive;" class="text-success fw-bolder fs-1">Your Result is ${c} marks out of ${indexValue+1}</h1>
    <button class="btn btn-success my-5" onclick = "restartQuiz()">Restart</button>
    </div>
    `
}