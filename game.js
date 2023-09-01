console.log("gamereal");
import questions from './question.js';


// Boc tat ca file trong khoi su kien nay
document.addEventListener("DOMContentLoaded", function () {
    // All code here
    var $ = function (id) {
        return document.getElementById(id);
    };
    //Khai báo biến Dom    

    const questionField = $("questionField");
    const answerButtons = document.querySelectorAll(".btn-action button");
    const startBtn = $("start");

    // Khai bao bộ câu hỏi
    // const questions = [
    //     {
    //         question: "What is the closest star to Earth?",
    //         options: ["The Moon", "Mars", "Venus", "The Sun"],
    //         correctAnswer: 3,
    //     },
    //     {
    //         question: "Which planet is known as the 'Red Planet'?",
    //         options: ["Earth", "Venus", "Jupiter", "Mars"],
    //         correctAnswer: 3,
    //     },
    //     {
    //         question: "What is the largest moon in the solar system?",
    //         options: ["Ganymede", "Titan", "Io", "The Moon"],
    //         correctAnswer: 0,
    //     },
    //     {
    //         question:
    //             "Which planet has the Great Red Spot, a giant storm system?",
    //         options: ["Neptune", "Saturn", "Jupiter", "Uranus"],
    //         correctAnswer: 2,
    //     },
    //     {
    //         question: "Which planet is known for its beautiful ring system?",
    //         options: ["Saturn", "Jupiter", "Mars", "Uranus"],
    //         correctAnswer: 0,
    //     },
    //     {
    //         question: "What is the smallest planet in our solar system?",
    //         options: ["Mercury", "Venus", "Earth", "Mars"],
    //         correctAnswer: 0,
    //     },
    //     {
    //         question:
    //             "Which planet is often referred to as the 'Evening Star' or 'Morning Star'?",
    //         options: ["Mars", "Jupiter", "Venus", "Saturn"],
    //         correctAnswer: 2,
    //     },
    //     {
    //         question:
    //             "What is the farthest dwarf planet from the Sun in our solar system?",
    //         options: ["Pluto", "Eris", "Ceres", "Haumea"],
    //         correctAnswer: 1,
    //     },
    //     {
    //         question:
    //             "Which planet has the most extensive system of planetary rings?",
    //         options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
    //         correctAnswer: 0,
    //     },
    //     {
    //         question: "What is the hottest planet in our solar system?",
    //         options: ["Mercury", "Venus", "Earth", "Mars"],
    //         correctAnswer: 1,
    //     },
    // ];

    // Khai bao bien
    let currentCorrectAnswerIndex;
    let currentQuestionIndex = 0;
    let playerName = "";
    let selectedAnswerIndex = -1;

    // Button Support
    let skipButtonUsed = false;
    let hideButtonUsed = false;
    // ======= FUNCTION HANDLER =====
    // Xáo trộn mảng câu hỏi:

    function shuffleArray(array) {
        const n = array.length;
        for (let i = 0; i < n; i++) {
            const j = Math.floor(Math.random() * n);
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    //Kiem tra ten
    function isValidName(name) {
        return /^[A-Za-z]{5,10}$/.test(name);
    }
    // Ham lay câu hỏi :
    function loadQuestion(index) {
        console.log(index);
        const currentQuestion = questions[index];
        console.log(currentQuestion.question);
        questionField.textContent = currentQuestion.question;
        for (let i = 0; i < answerButtons.length; i++) {
            answerButtons[i].textContent = currentQuestion.options[i];
        }
        currentCorrectAnswerIndex = currentQuestion.correctAnswer;
    }

    function showAlert(message) {
        alertText.textContent = message;
        alertBlock.style.display = "block";
    }

    function hideAlert() {
        alertBlock.style.display = "none";
    }
    // Ham chon đáp án
    answerButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            checkAnswer(index);
        });
    });
    function checkAnswer(selectedIndex) {
        selectedAnswerIndex = selectedIndex;
    }

    // Hàm Check Nhập Tên Player và bắt đàu câu hỏi đầu tiên :
    document.getElementById("start").addEventListener("click", () => {
        let validNameEntered = false;

        while (!validNameEntered) {
            playerName = prompt(
                "Enter player's name (5-10 characters, no digits or special characters):"
            );

            if (isValidName(playerName)) {
                validNameEntered = true;
                alert(`Welcome, ${playerName}, to the game! Let's start.`);
                shuffleArray(questions);
                currentQuestionIndex = 0;
                loadQuestion(currentQuestionIndex);
                hideAlert();
                selectedAnswerIndex = -1;
            } else {
                showAlert("Invalid name. Please try again.");
            }
        }
    });

    // Sự kiện bâm chọn đáp án
    document.getElementById("checkAnswer").addEventListener("click", () => {
        if (selectedAnswerIndex === -1) {
            showAlert("Please select an answer before checking.");
        } else {
            console.log(selectedAnswerIndex); // Test đáp án đã chọn

            const correctAnswerIndex =
                questions[currentQuestionIndex].correctAnswer;
            console.log(correctAnswerIndex); // Test đáp án đúng
            if (selectedAnswerIndex === correctAnswerIndex) {
                alert("Correct! Moving to the next question.");
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    loadQuestion(currentQuestionIndex);
                    hideAlert();
                    selectedAnswerIndex = -1;
                } else {
                    alert("Congratulations! You've completed the game.");
                }
            } else {
                showAlert("Incorrect. The game is over.");
            }
        }
    });

    document.getElementById("skipQuestion").addEventListener("click", () => {
        if (!skipButtonUsed) {
            skipButtonUsed = true;
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion(currentQuestionIndex);
                hideAlert();
                selectedAnswerIndex = -1;
                document.getElementById("skipQuestion").disabled = true;
            } else {
                alert("Congratulations! You've completed the game.");
            }
        }
    });
    // Sự kiện bấm nút Hide đáp án sai :
    document.getElementById("hideQuestion").addEventListener("click", () => {
        if (!hideButtonUsed) {
            hideButtonUsed = true;
            const correctAnswerIndex =
                questions[currentQuestionIndex].correctAnswer;
            const options = document.querySelectorAll(".btn-action button");

            let hiddenCount = 0;
            for (let i = 0; i < options.length; i++) {
                if (i !== correctAnswerIndex && options[i].textContent !== "") {
                    options[i].style.display = "none";
                    hiddenCount++;
                    if (hiddenCount === 2) {
                        break;
                    }
                }
            }

            document.getElementById("hideQuestion").disabled = true;
        }
    });
});
