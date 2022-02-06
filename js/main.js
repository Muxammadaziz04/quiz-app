const card = document.getElementById('quiz')
const title = document.querySelector('.quiz__title')
const quizList = document.querySelector('#list')
const btn = document.querySelector('#submit')

const modal = document.getElementById('modal')
let modalTitle = modal.querySelector('h2')
let modalDesc = modal.querySelector('.answer__status')
let modalScore = modal.querySelector('.answer__score')

const template = document.getElementById('template').content;

let score = 0;
let correctAnswer = null;
let counter = 1


renderQuize(quiz)


card.addEventListener('click', (event) => {
    let checkRadio = quizList.querySelector('input[type="radio"]:checked')
    if(event.target.dataset.quiz === 'btn' && checkRadio){
        if(counter === quiz.length) showResult()

        counter++
        title.textContent = null
        quizList.innerHTML = null
        
        if(checkRadio.dataset.correct === correctAnswer) score += 1

        renderQuize(quiz)
    }
})


function renderQuize(arr){
    arr = arr.slice((counter-1), counter)
    title.textContent = arr[0].queastion
    
    arr[0].variants.forEach((item, index)=> {
        cloneTemplate = document.importNode(template, true);
        cloneTemplate.querySelector('input').dataset.correct = index+1

        cloneTemplate.querySelector('.quiz__span').textContent = item
        quizList.appendChild(cloneTemplate)
    });

    correctAnswer = arr[0].correct
}


function showResult(){
    title.remove()
    quizList.remove()
    modal.style.display="block"
    
    if(score === quiz.length){
        modalTitle.innerHTML = 'Поздравляем &#128079'
        modalDesc.innerHTML = 'Вы ответили верно на все вопросы &#129299'
        modalScore.textContent = `${score} из ${quiz.length}`
    }
    else if(score > quiz.length/2){
        modalTitle.innerHTML = 'Поздравляем &#128079'
        modalDesc.innerHTML = 'Вы ответили верно больше чем на половину вопросов &#129299'
        modalScore.textContent = `${score} из ${quiz.length}`
    }
    else if(score === quiz.length/2){
        modalTitle.innerHTML = 'Поздравляем &#128079'
        modalDesc.innerHTML = 'Вы ответили верно на половину вопросов &#129299'
        modalScore.textContent = `${score} из ${quiz.length}`
    }
    else if(score < quiz.length/2){
        modalTitle.innerHTML = 'Нужно постараться'
        modalDesc.innerHTML = 'Вы ответили верно меньше чем на половину вопросов &#129299'
        modalScore.textContent = `${score} из ${quiz.length}`
    }
}
