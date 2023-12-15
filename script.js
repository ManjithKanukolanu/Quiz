const questions = [
    {
        question: "Which is largest animal in world?",
        answers: [
            {text: "Shark",correct:false},
            {text: "Blue Whale",correct:true},
            {text: "Ant",correct:false},
            {text: "Tiger",correct:false},
        ]
    },
    {
        question: "What year was the United Nations established?",
        answers: [
            {text: "1999",correct:false},
            {text: "1945",correct:true},
            {text: "1923",correct:false},
            {text: "1879",correct:false},
        ]
    },
    {
        question: "How many faces does a Dodecahedron have?",
        answers: [
            {text: "6",correct:false},
            {text: "12",correct:true},
            {text: "2",correct:false},
            {text: "10",correct:false},
        ]
    }
];


const questionelement = document.getElementById("question");
const answerbutton = document.getElementById("answer-buttons");
const nextbtn = document.getElementById("next-btn");

let currentquestionindex=0;
let score=0;

function startQuiz()
{
    currentquestionindex=0;
    score=0;
    nextbtn.innerHTML="Next";
    showquestion();
}


function showquestion()
{
    resetstate();
    let Current = questions[currentquestionindex];
    let questionno = currentquestionindex + 1;
    questionelement.innerHTML = questionno + ". " + Current.question;

    Current.answers.forEach(answer =>{
        const nextcall = document.createElement("button");
        nextcall.innerHTML = answer.text;
        nextcall.classList.add("btn");
        answerbutton.appendChild(nextcall)
        if(answer.correct)
        {
            nextcall.dataset.correct = answer.correct;
        }
        nextcall.addEventListener("click",selectAnswer);
    });
};


function selectAnswer(e)
{
  
   const selectedbtn = e.target;
   const iscorrect = selectedbtn.dataset.correct === 'true';
   if(iscorrect)
   {
      selectedbtn.classList.add("correct");
      score++;
   }
   else
   {
      selectedbtn.classList.add("incorrect");
   }
   Array.from(answerbutton.children).forEach(button =>{
       if(button.dataset.correct === "true")
       {
        button.classList.add("correct");
       }
       button.disabled = true;
   });
   nextbtn.style.display = "block";
}

nextbtn.addEventListener("click",()=>{
    if(currentquestionindex < questions.length)
    {
        handelnext();
    }
    else
    {
      startQuiz();
    }
});


function handelnext()
{
    currentquestionindex++;
    if(currentquestionindex < questions.length)
    {
        showquestion();
    }
    else
    {
        showscore();
    }
}

startQuiz();

function resetstate(){
      nextbtn.style.display = "none"
      while(answerbutton.firstChild)
      {
        answerbutton.removeChild(answerbutton.firstChild);
      }
     
}

function showscore()
{
    resetstate();
    questionelement.innerHTML = `You Scored ${score} Out Of ${questions.length}`;
    nextbtn.innerHTML = "Play Again";
    nextbtn.style.display="block";
}