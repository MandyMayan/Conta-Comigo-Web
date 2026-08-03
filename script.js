/* ===================================================
   CONFIGURAÃ‡Ã•ES GERAIS E BANCO DE DADOS DE PERGUNTAS
   =================================================== */

// PontuaÃ§Ã£o mÃ­nima necessÃ¡ria para vencer o jogo [cite: 13]
const PONTOS_PARA_VENCER = 3;

// Banco de perguntas categorizado por dificuldade [cite: 9, 10, 11]
const perguntas = {
    facil: [
        {
            pergunta: "Qual dessas personalidades teve envolvimento direto com a Guerra de Canudos?",
            alternativas: ["Pedro de Alcântara", "José Joaquim Seabra", "Antônio Conselheiro", "Virgulino Ferreira da Silva"],
            correta: 2
        },
        {
            pergunta: "A que órgão compete a proteção de bens, serviços e logradouros públicos?",
            alternativas: ["Polícia Federal", "Polícia Civil", "Polícia Militar", "Guarda Municipal"],
            correta: 3
        },
        {
            pergunta: "Qual é a cor resultante da mistura de azul com amarelo?",
            alternativas: ["Verde", "Roxo", "Laranja", "Marrom"],
            correta: 0
        },
        {
            pergunta: "Qual  o maior planeta do Sistema Solar?",
            alternativas: ["Terra", "Marte", "Saturno", "JÃºpiter"],
            correta: 3
        },
        {
            pergunta: "Qual animal é conhecido como o 'Rei da Selva'?",
            alternativas: ["Tigre", "LeÃ£o", "Elefante", "Uso"],
            correta: 1
        }
    ],
    medio: [
        {
            pergunta: "Qual é a forma de Estado adotada pelo Brasil?",
            alternativas: ["Presidencialista", "Federativa", "Parlamentarista", "Republicana"],
            correta: 1
        },
        {
            pergunta: "Qual dessas pessoas jurídicas pode se enquadrar no conceito de administração pública direta?",
            alternativas: ["Autarquias", "Agências reguladoras", "Órgãos públicos", "Empresas públicas"],
            correta: 2
        },
        {
            pergunta: "O abuso de poder na gestão pública que ocorre quando o servidor público age sem a devida competência recebe o nome de:",
            alternativas: ["Excesso de poder", "Desvio de Finalidade", "Falsidade ideológica", "Prevaricação"],
            correta: 0
        },
        {
            pergunta: "Qual dessas atribuições não é da competência dos Tribunais de Contas?",
            alternativas: ["Julgar as contas dos chefes do Poder Executivo", "Apreciar a legalidade dos atos de admissão de pessoal", "Sustar a execução de atos impugnados", "Disponibilizar à Justiça Eleitoral a relação dos gestores com contas desaprovadas para fins de inelegibilidade"],
            correta: 0
        },
        {
            pergunta: "Qual desses órgãos pode ser considerado o antecessor dos Tribunais de Contas do Brasil?",
            alternativas: ["Diretoria de Documentação Histórica", "Casa de Arrecadação dos Direitos", "Conselho da Fazenda", "Casa da Moeda"],
            correta: 2
        }
    ],
    dificil: [
        {
            pergunta: "Qual dessas ações adotadas pelos Tribunais de Contas não pode ser considerada como de cunho preventivo e orientador?",
            alternativas: ["Auditorias Operacionais", "Termos de Ajustamento de Gestão", "Alertas aos gestores sobre limites da Lei de Responsabilidade Fiscal (LRF)", "Emissão de Parecer Prévio sobre as Contas do Governo"],
            correta: 3
        },
        {
            pergunta: "No processo de julgamento de uma conta pública no TCE, qual setor é responsável por iniciar a instrução ou por produzir o relatório inicial?",
            alternativas: ["Coordenadoria de Controle Externo (CCE)", "Procuradoria-Geral do Estado (PGE)", "Ministério Público de Contas (MPC)", "Gabinetes de Conselheiro"],
            correta: 0
        },
        {
            pergunta: "A Constituição Federal de 1988 (CF/88) determina que os Poderes Legislativo, Executivo e Judiciário manterão, de forma integrada:",
            alternativas: ["O sistema de controle interno", "O sistema de controle externo", "O sistema de controladorias", "O sistema de corregedorias"],
            correta: 0
        },
        {
            pergunta: "São considerados como agentes políticos:",
            alternativas: ["Ministros de Estado", "Auditores Fiscais", "Procuradores Federais", "Controladores Gerais da União"],
            correta: 0
        },
        {
            pergunta: "Qual Ã© a montanha mais alta do mundo fora da Ãsia?",
            alternativas: ["K2", "Mont Blanc", "Monte McKinley (Denali)", "AconcÃ¡gua"],
            correta: 3
        },
		{
            pergunta: "O que significa a sigla REDA na gestão pública?",
            alternativas: ["Regime Especial de Direito Administrativo", "Regime Especial da Administração", "Regime Diferenciado de Agentes Públicos", "Regime Extraordinário da Administração"],
            correta: 0
        },
		{
            pergunta: "Base Pergunta Hard",
            alternativas: ["Correta", "Errada 1", "Errada 2", "Errada 3"],
            correta: 0
        },
    ]
};

/* ===================================================
   ESTADO DO JOGO (VARIÃVEIS DE CONTROLE)
   =================================================== */
let perguntasAtuais = [];
let indicePerguntaAtual = 0;
let pontuacao = 0;
let tempoRestante = 0;
let tempoLimite = 30; // PadrÃ£o
let timerInterval = null;
let jaRespondeu = false;

/* ===================================================
   ELEMENTOS DO DOM
   =================================================== */
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');

const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');
const progressBar = document.getElementById('progress-bar');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackMessage = document.getElementById('feedback-message');
const nextBtn = document.getElementById('next-btn');

const resultTitle = document.getElementById('result-title');
const resultIcon = document.getElementById('result-icon');
const resultMessage = document.getElementById('result-message');
const finalScoreDisplay = document.getElementById('final-score');

/* ===================================================
   FUNÃ‡Ã•ES DO JOGO
   =================================================== */

/**
 * FunÃ§Ã£o utilitÃ¡ria para embaralhar um array (Algoritmo Fisher-Yates) [cite: 18]
 */
function shuffle(array) {
    const arrayCopiado = [...array];
    for (let i = arrayCopiado.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayCopiado[i], arrayCopiado[j]] = [arrayCopiado[j], arrayCopiado[i]];
    }
    return arrayCopiado;
}

/**
 * Inicia o jogo com a dificuldade selecionada [cite: 9, 10]
 */
function startGame(dificuldade) {
    // Configura o tempo por pergunta de acordo com a dificuldade
    if (dificuldade === 'facil') {
        tempoLimite = 20;
    } else if (dificuldade === 'medio') {
        tempoLimite = 20;
    } else if (dificuldade === 'dificil') {
        tempoLimite = 20;
    }

    // Seleciona e embaralha as perguntas da dificuldade escolhida [cite: 18]
    perguntasAtuais = shuffle(perguntas[dificuldade]);
    
    // Reseta as variÃ¡veis de estado
    indicePerguntaAtual = 0;
    pontuacao = 0;
    scoreDisplay.textContent = pontuacao;

    // TransiÃ§Ã£o de telas
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');

    // Carrega a primeira pergunta
    loadQuestion();
}

/**
 * Carrega a pergunta atual na tela
 */
function loadQuestion() {
    jaRespondeu = false;
    feedbackMessage.textContent = '';
    feedbackMessage.className = 'feedback';
    nextBtn.classList.add('hidden');

    const perguntaAtual = perguntasAtuais[indicePerguntaAtual];

    // Atualiza barra de progresso [cite: 17]
    const percentual = ((indicePerguntaAtual) / perguntasAtuais.length) * 100;
    progressBar.style.width = `${percentual}%`;

    // Exibe o texto da pergunta
    questionText.textContent = `${indicePerguntaAtual + 1}. ${perguntaAtual.pergunta}`;

    // Renderiza as alternativas
    optionsContainer.innerHTML = '';
    perguntaAtual.alternativas.forEach((opcao, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.textContent = opcao;
        btn.onclick = () => selectOption(index);
        optionsContainer.appendChild(btn);
    });

    // Inicia o temporizador
    startTimer();
}

/**
 * Inicia a contagem regressiva do tempo
 */
function startTimer() {
    clearInterval(timerInterval);
    tempoRestante = tempoLimite;
    timerDisplay.textContent = `${tempoRestante}s`;

    timerInterval = setInterval(() => {
        tempoRestante--;
        timerDisplay.textContent = `${tempoRestante}s`;

        if (tempoRestante <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
}

/**
 * Trata o cenÃ¡rio onde o tempo acaba sem resposta
 */
function handleTimeout() {
    jaRespondeu = true;
    
    // Desconta ponto por esgotamento de tempo [cite: 5]
    pontuacao -= 1;
    scoreDisplay.textContent = pontuacao;

    feedbackMessage.textContent = "O tempo acabou! (-1 ponto)";
    feedbackMessage.classList.add('incorrect');

    highlightAnswers(-1); // Destaca apenas a correta
    disableOptions();
    nextBtn.classList.remove('hidden');
}

/**
 * Processa a escolha de uma alternativa pelo jogador
 */

function selectOption(indexSelecionado) {
    if (jaRespondeu) return; // Impede responder mais de uma vez [cite: 6]
    jaRespondeu = true;
    clearInterval(timerInterval);

    const perguntaAtual = perguntasAtuais[indicePerguntaAtual];
    const ehCorreta = indexSelecionado === perguntaAtual.correta;

    // Atualiza pontuaÃ§Ã£o em tempo real (+1 acerto, -1 erro) [cite: 5, 6]
    if (ehCorreta) {
        pontuacao += 1;
        feedbackMessage.textContent = "Resposta Correta! (+1 ponto)";
        feedbackMessage.classList.add('correct');
    } else {
        pontuacao -= 1;
        feedbackMessage.textContent = "Resposta Incorreta! (-1 ponto)";
        feedbackMessage.classList.add('incorrect');
    }

    scoreDisplay.textContent = pontuacao;

    highlightAnswers(indexSelecionado);
    disableOptions();
    nextBtn.classList.remove('hidden');
}

/**
 * Aplica as classes CSS visuais para resposta correta/incorreta [cite: 18]
 */
function highlightAnswers(indexSelecionado) {
    const perguntaAtual = perguntasAtuais[indicePerguntaAtual];
    const botoes = optionsContainer.children;

    Array.from(botoes).forEach((btn, idx) => {
        if (idx === perguntaAtual.correta) {
            btn.classList.add('correct');
        } else if (idx === indexSelecionado) {
            btn.classList.add('incorrect');
        }
    });
}

/**
 * Desabilita os botÃµes apÃ³s uma resposta [cite: 6]
 */
function disableOptions() {
    const botoes = optionsContainer.children;
    Array.from(botoes).forEach(btn => {
        btn.disabled = true;
    });
}

/**
 * AvanÃ§a para a prÃ³xima pergunta ou finaliza o jogo
 */
function nextQuestion() {
    indicePerguntaAtual++;

    if (indicePerguntaAtual < perguntasAtuais.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

/**
 * Finaliza a partida e exibe a tela de resultado [cite: 14, 15]
 */
function endGame() {
    clearInterval(timerInterval);
    
    // Atualiza a barra de progresso para 100%
    progressBar.style.width = '100%';

    quizScreen.classList.remove('active');
    endScreen.classList.add('active');

    finalScoreDisplay.textContent = pontuacao;

    // CondiÃ§Ã£o de vitÃ³ria com base na variÃ¡vel PONTOS_PARA_VENCER [cite: 13, 14]
    if (pontuacao >= PONTOS_PARA_VENCER) {
        resultTitle.textContent = "Você Venceu!";
        resultIcon.textContent = "Troféu.png";
        resultMessage.textContent = `Parabéns! Você alcançou o objetivo atingindo ${pontuacao} ponto(s).`;
    } else {
        resultTitle.textContent = "Você Perdeu!";
        resultIcon.textContent = "Cara triste do Luís Felipe.png";
        resultMessage.textContent = `Você fez ${pontuacao} ponto(s). Eram necessários pelo menos ${PONTOS_PARA_VENCER} pontos para vencer.`;
    }
}

/**
 * Reinicia o jogo voltando para a tela inicial [cite: 17]
 */
function restartGame() {
    endScreen.classList.remove('active');
    startScreen.classList.add('active');
}// JavaScript Document