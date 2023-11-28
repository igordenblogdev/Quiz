// Создаем пустой массив
const arrayQuestions = [];

// переменные для всплывающего окна
const startBtn = document.querySelector('.startBtn');
const main = document.querySelector(".main");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");



// Нажатие кнопки сложение
document.querySelector('.additionBtn').onclick = function() {
    quizSection.classList.add('active');
    main.classList.remove('active');
    addition();
}

// Нажатие кнопки вычитание
document.querySelector('.subtractionBtn').onclick = function() {
    quizSection.classList.add('active');
    main.classList.remove('active');
    subtraction();
}


// Нажатие кнопки умножение
document.querySelector('.multiplicationBtn').onclick = function() {
    quizSection.classList.add('active');
    main.classList.remove('active');
    multiplication();
}


// Нажатие кнопки деление
document.querySelector('.divisionsBtn').onclick = function() {
    quizSection.classList.add('active');
    main.classList.remove('active');
    divisions();
}


document.querySelector('.btnEnd').onclick = function() {
    quizSection.classList.remove('active');
}


// Функция получения случайных чисел в диапазоне от 10 до 100
function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}



// Функция сложения 
function addition() {
    // пустой массив
    // const arrayQuestions = [];
    // заполняем массив 
    for (let i = 0; i < 20; i++) {
        let numberOne = getRandomInRange(10, 99);
        let numberTwo = getRandomInRange(10, 99);
        const sum = numberOne + numberTwo
        const elementArray = {
            question: `Выполните сложениие ${numberOne} + ${numberTwo}`,
            answer: sum,
            answerOptions: [
                sum + 2,
                sum,
                sum + 3,
                sum - 2,
            ]
        }
        arrayQuestions.push(elementArray);
    }
    showQuetions(0)
}

// Функция вычитания
function subtraction() {
    // заполняем массив 
    for (let i = 0; i < 100; i++) {
        let numberOne = getRandomInRange(10, 90);
        let numberTwo = getRandomInRange(10, 90);
        if (numberOne > numberTwo) {
            const sum = numberOne - numberTwo
            const elementArray = {
                question: `Выполните вычитание ${numberOne} - ${numberTwo}`,
                answer: sum,
                answerOptions: [
                    sum - 2,
                    sum,
                    sum + 3,
                    sum - 1,
                ]
            }
            if (arrayQuestions.length < 20) {
                arrayQuestions.push(elementArray);
            }

        }
    }
    showQuetions(0)
}

// Функция умножения
function multiplication() {
    //заполняем массив 
    for (let i = 0; i < 20; i++) {
        let numberOne = getRandomInRange(1, 9);
        let numberTwo = getRandomInRange(1, 9);
        const sum = numberOne * numberTwo
        const elementArray = {
            question: `Выполните умножение ${numberOne} * ${numberTwo}`,
            answer: sum,
            answerOptions: [
                sum+ 6,
                sum,
                sum + 3,
                sum - 2,
            ]
        }
        arrayQuestions.push(elementArray);
    }
    showQuetions(0)
}


// Функция деления
function divisions() {
    // заполняем массив 
    for (let i = 0; i < 100; i++) {
        let numberOne = getRandomInRange(10, 90);
        let numberTwo = getRandomInRange(2, 9);
        if (numberOne % numberTwo === 0) {
            const sum = numberOne / numberTwo;
            const elementArray = {
                question: `Выполните деление ${numberOne} / ${numberTwo}`,
                answer: sum,
                answerOptions: [
                    sum - 2,
                    sum,
                    sum + 3,
                    sum - 3,
                ]
            }
            if (arrayQuestions.length < 20) {
                arrayQuestions.push(elementArray);
            }

        }
    }
    showQuetions(0)
}



// ? переменные
// переменная вопроса 
const titleQuetion = document.querySelector(".question-text");
// переменная списка ответов
const listAnswerOptions = document.querySelector(".option-list");
// переменная на каком сейчас вопросе
const totalQuetion = document.querySelector(".question-total");
// переменная правильных ответов
const headerScore = document.querySelector(".header-score");
// переменная результата
const textResult = document.querySelector(".textResult");
//переменная кнопки (перехода на следующий вопрос)
const btnNext = document.querySelector(".nextBtn");
// переменные для красивого заполнения
const circularProgress = document.querySelector('.circularProgress');
const progressValue = document.querySelector('.progressValue');
// индекс нашего массива с вопросами
let count = 0;
// переменная правильных ответов пользователя
let userScore = 0

// функция для отображения вопросов
function showQuetions(index) {
    // выводим на экран сам вопрос
    titleQuetion.innerHTML = `${arrayQuestions[index].question}`;
    // выводим на экран список ответов
    listAnswerOptions.innerHTML = '';
    arrayQuestions[index].answerOptions.forEach(item => {
        const text = `<div class="option"><span>${item}</span></div>`;
        listAnswerOptions.insertAdjacentHTML('beforeend', text);
    });
    headerScore.innerHTML = `Результат ${userScore} / ${arrayQuestions.length}`;
    totalQuetion.innerHTML = `${index + 1} из  ${arrayQuestions.length}`;
    correctAnswer()
}

// showQuetions(0)

// функция для отображения следующего вопроса
function nextQuestion() {
    // проверяем наличие класса disabled
    const option = document.querySelector(".option");
    //console.log(option)
    // когда закончились вопросы
    if ((count + 1) === arrayQuestions.length) {
        // console.log((count + 1) === arrayQuestions.length)
        if (option.classList.contains('disabled') === true) {
            // высчитываем проценты ответа
            const interestResult = (userScore / arrayQuestions.length) * 100;
            // функция показа процентов
            resultCircular(interestResult);
            // всплывает окошко с результатом
            document.querySelector(".windowResult").classList.add('active');
            textResult.innerHTML = `Правильных ответов: ${userScore} из ${arrayQuestions.length}`;
            document.querySelector(".btnResult").onclick = function () {
                document.querySelector(".windowResult").classList.remove('active');
                count = 0;
                userScore = 0
                showQuetions(count);
            }
            document.querySelector('.btnEnd').onclick = function () {
                document.querySelector(".windowResult").classList.remove('active');
                quizSection.classList.remove('active');
                count = 0;
                userScore = 0;
                showQuetions(count);
            }
            return
        }

    }
    if (option.classList.contains('disabled')) {
        // увеличиваем индекс массива
        count = count + 1
        // перемешиваем массив
        shuffle(arrayQuestions[count].answerOptions);
        showQuetions(count);
    } else {
        document.querySelector(".textAlert").innerHTML = "Чтобы перейти к следующему вопросу, необходимо выбрать ответ"
        document.querySelector(".windowPopupAlert").classList.add('active')
        document.querySelector(".btnClose").onclick = function () {
            document.querySelector(".windowPopupAlert").classList.remove('active')
        }
    }


}

// функция правильного ответа
function correctAnswer() {
    listAnswerOptions.onclick = function (event) {
        // каждый ответ
        const options = document.querySelectorAll(".option");
        if (arrayQuestions[count].answer === Number(event.target.textContent)) {
            // записываем, одно очко за правильный ответ
            userScore += 1;
            setTimeout(() => {
                event.target.classList.add('correctAnswer');
            }, 100);
        } else {
            setTimeout(() => {
                event.target.classList.add('incorrectAnswer');
            }, 100);
        }
        options.forEach(item => item.classList.add("disabled"));
    }

}

// Функция оценки результата
function resultCircular(index) {
    let progressStartValue = 0;
    let progressEndValue = index;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        // console.log(progressStartValue)
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255,255,0.1) 0deg)`;
        if (progressEndValue === 0) {
            clearInterval(progress);
        }
        if (progressStartValue === progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}



// мешать массив с ответами
function shuffle(arr) {
    var j, temp;
    for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

btnNext.addEventListener("click", nextQuestion);