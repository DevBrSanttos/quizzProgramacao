const scoreContainer = document.querySelector(".score-container");
const quizzContainer = document.querySelector("#quizz-container");
const questao = document.querySelector("#question");
const boxAlternativas = document.querySelector("#answers-box");
const botaoRefazer = document.querySelector("#restart");
const letraAlternativa = ['a', 'b', 'c', 'd'];
let questaoAtual = 0;
let pontos = 0;

// Perguntas
const questoes = [
    {
      "question": "PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
  ]

//função para iniciar o quiz;
function init(){
    //criar questao
    criarQuestao(questaoAtual);
}

function criarQuestao(questaoAtual){
    //limpar botoes alternativa
    const botoes = boxAlternativas.querySelectorAll('button');
    botoes.forEach(btn =>{
        btn.remove();
    });

    //alterar texto e numero da pergunta
    const numeroPergunta = questao.querySelector("#question-number");
    const textoPergunta = questao.querySelector("#question-text");
    numeroPergunta.textContent = (questaoAtual + 1);    
    textoPergunta.textContent = questoes[questaoAtual].question;


    questoes[questaoAtual].answers.forEach(function(alternativa, indexAlternativa){
        //criar botoes
        const botaoPadrao = document.querySelector(".answer-template").cloneNode(true);
        const textoBotao = botaoPadrao.querySelector(".question-asnswer");
        const letraBotao = botaoPadrao.querySelector(".btn-letter");
        //adicionar letra botao        
        letraBotao.textContent = letraAlternativa[indexAlternativa];
        //adicionar texto alternativa 
        textoBotao.textContent = alternativa["answer"];

        //remover classe hide e answer-template
        botaoPadrao.classList.remove("hide");
        botaoPadrao.classList.remove("answer-template");

        //adicionar a tela
        boxAlternativas.appendChild(botaoPadrao);

        botaoPadrao.addEventListener("click", function(){
            //verificar se acertou a pergunta
            checarPergunta(textoBotao, questaoAtual);
        });
        
    });
    
}

function checarPergunta(textoBotao, questaoAtual){
    
    const botoes = boxAlternativas.querySelectorAll("button");
    botoes.forEach(function(btn, indexBtn){
        //adicionar classe mudar a cor das alternativas verdadeira e falsa
        if(questoes[questaoAtual].answers[indexBtn].correct){
          btn.classList.add("correct-answer");
          
          //verificar se acertou
          if(textoBotao.textContent === questoes[questaoAtual].answers[indexBtn].answer){
                pontos++;
          }

        }else{
            btn.classList.add("wrong-answer")  
        }       
    });
    
    proximaPergunta(questaoAtual);
    
}


function proximaPergunta(questaoAtual){
    questaoAtual++;
    setTimeout(function(){
        //verificar se é a ultima pergunta
        if(questaoAtual >= questoes.length){
            exibirTelaResultado();
        }else{               
            criarQuestao(questaoAtual);
        }
    }, 700);
    

}

function exibirTelaResultado(){
    //mostrar ou esconder Quizz
    mostrarEsconder();

    //alterar dados da tela de sucesso
    const porcentagem = ((pontos / questoes.length) * 100).toFixed(2);
    const spanDisplayScore = scoreContainer.querySelector("#display-score span");
    spanDisplayScore.textContent = porcentagem.toString();

    //alterar quantidade de acertos
    const displayAcertos = scoreContainer.querySelector("#correct-answers");
    displayAcertos.textContent = pontos.toString();

    //alterar quantidade de questos
    const displayQtdQuestos = scoreContainer.querySelector("#questions-qty");
    displayQtdQuestos.textContent = questoes.length;



}

//mostrar e esconder containers
function mostrarEsconder(){    
    quizzContainer.classList.toggle('hide');
    scoreContainer.classList.toggle('hide');
}

//refazer quizz
botaoRefazer.addEventListener("click", function(){
    questaoAtual = 0;
    pontos = 0;
    mostrarEsconder();
    init();
})


init();
