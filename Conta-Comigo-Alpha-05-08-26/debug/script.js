// JavaScript Document/* ===================================================
  // CONFIGURAÃ‡Ã•ES GERAIS E EFEITOS SONOROS
 //  =================================================== */
// PontuaÃ§Ã£o minima necessÃ¡ria para vencer o jogo

const PONTOS_PARA_VENCER = 5;

// Carregamento dos efeitos sonoros
const somAcerto = new Audio('x.mpeg');
const somErro = new Audio('y.mpeg');

/**
 * FunÃ§Ã£o utilitÃ¡ria para reproduzir o som do inÃ­cio
 */
function tocarSom(audio) {
    audio.currentTime = 0; // Reinicia o Ã¡udio se for clicado rapidamente
    audio.play().catch(err => {
        // Trata restriÃ§Ãµes de reproduÃ§Ã£o automÃ¡tica do navegador caso ocorram
        console.warn("Não foi possível reproduzir o áudio, desculpa", err);
    });
}

// Banco de perguntas com suporte opcional para dicas
const perguntas = {
    facil: [
        {
            pergunta: "Qual dessas personalidades teve envolvimento direto com a Guerra de Canudos?",
            alternativas: ["Pedro de Alcântara", "José Joaquim Seabra", "Antônio Conselheiro", "Virgulino Ferreira da Silva"],
            correta: 2 ,
			dica: "A guerra de Canudos ocorreu durante os anos 1896 a 1897, no sertão da Bahia"
        },
        {
            pergunta: "A que órgão compete a proteção de bens, serviços e locais públicos?",
            alternativas: ["Polícia Federal", "Polícia Civil", "Polícia Militar", "Guarda Municipal"],
            correta: 3
        },
        {
            pergunta: "Qual desses locais não é uma atração turística da região de Mata de São João, na Bahia?",
            alternativas: ["Projeto Tamar", "Castelo Garcia D’Ávila", "Reserva da Sapiranga", "Cachoeira da Fumaça"],
            correta: 3
        },
{
            pergunta: "Qual desses compositores nasceu no estado da Bahia?",
            alternativas: ["Luiz Gonzaga", "Alceu Valença", "Claudia Leitte", "Pitty"],
            correta: 3
        },
{
            pergunta: "Quem é o escritor cuja obra se notabilizou por expressar a linguagem do povo?",
            alternativas: ["Machado de Assis", "José de Alencar", "Graciliano Ramos", "Jorge Amado"],
            correta: 3
        },
{
            pergunta: "Bolinho da culinária baiana feito de feijão fradinho e frito no azeite de dendê:",
            alternativas: ["Abará", "Bolinho de estudante", "Cocada", "Acarajé"],
            correta: 3
        },
{
            pergunta: "Qual é o(a) padroeiro(a) da cidade de Salvador/BA?",
            alternativas: ["Santo Antônio", "São Francisco Xavier", "Nossa Senhora da Conceição da Praia", "Senhor do Bonfim"],
            correta: 1 ,
	dica: "Você sabia? Este Padroeiro se consolidou após a grande praga de febre amarela que assolou a cidade em 1686!"
        },
{
            pergunta: "Qual dessas frutas não é nativa do Brasil?",
            alternativas: ["Caju", "Jabuticaba", "Manga", "Goiaba"],
            correta: 2 ,
	dica: "Foi trazida ao Brasil pelos portugueses, durante as grandes navegações de 1500s"
        },
{
            pergunta: "Considerado o pai da psiquiatria no Brasil, revolucionou o tratamento das doenças mentais:",
            alternativas: ["Paulo Amarante", "Milton Santos", "Juliano Moreira", "Luiz Gama"],
            correta: 2 ,
	dica: "Um hospital famoso o homenageia em seu nome."
        },
{
            pergunta: "Animal híbrido e estéril, muito utilizado para transporte de cargas e montaria. Seu nome é dito de forma pejorativa:",
            alternativas: ["Anta", "Cavalo", "Mula", "Cabra"],
            correta: 2
        },
{
            pergunta: "Geógrafo baiano, foi um dos grandes nomes da renovação da geografia no Brasil:",
            alternativas: ["Milton Nascimento", "Camafeu de Oxóssi", "Milton Santos", "Juarez Paraíso"],
            correta: 2
        },
{
            pergunta: "Nasceu na Ilha de Itaparica, liderou um grupo de 200 pessoas na batalha contra os portugueses e inspirou a criação do termo “surra de cansanção”:",
            alternativas: ["Maria Quitéria", "Maria Felipa", "Joana Angélica", "Chica da Silva"],
            correta: 1
        },
{
            pergunta: "Quais desses pratos são típicos da culinária baiana, considerados como “comida de terreiro” e oferecidos aos orixás?",
            alternativas: ["Maniçoba, bolinho de estudante e cuscuz", "Vatapá, caruru e acarajé", "Moqueca, peixe vermelho e feijoada", "Xinxim, beiju e acaçá"],
            correta: 1 , dica: "Debug <a>https://www.tce.ba.gov.br/</a>"
	
        },
{
            pergunta: "Qual dessas criaturas do folclore brasileiro é conhecida por virar as embarcações dos pescadores do rio São Francisco?",
            alternativas: ["Papa-Figo", "Caipora", "Yara", "Nego D’Água"],
            correta: 3
        },
{
            pergunta: "Qual o significado da expressão “Pensar na morte da bezerra”?",
            alternativas: ["Morte", "Perigo", "Teimosia", "Falta de atenção"],
            correta: 3
        },
{
            pergunta: "Na obra “Vidas Secas”, de Graciliano Ramos, que animal representa a personagem “Baleia”?",
            alternativas: ["Papagaio", "Baleia", "Cachorro", "Preá"],
            correta: 2
        },
{
            pergunta: "Qual o significado da expressão nordestina “Cabra da Peste”?",
            alternativas: ["Pessoa medrosa", "Pessoa valente", "Pessoa irritante", "Pessoa doente"],
            correta: 1
        },
{
            pergunta: "Qual destes santos ou santa é brasileiro e nascido no estado da Bahia?",
            alternativas: ["São Félix", "Santo Antônio de Jesus", "São Jorge", "Santa Dulce dos Pobres"],
            correta: 3
        },
		{
            pergunta: "Qual desses animais não pode ser encontrado no estado da Bahia?",
            alternativas: ["Golfinho", "Boto-cor-de-rosa", "Esquilo", "Raposa"],
            correta: 1
        },
{
            pergunta: "Qual setor do TCE recebe as dúvidas, sugestões e manifestações dos cidadãos?",
            alternativas: ["Recepção", "Assessoria de Comunicação", "Ouvidoria", "Escola de Contas"],
            correta: 2
        },
{
            pergunta: "Qual o nome do projeto itinerante do TCE que realiza visitas nas escolas da Bahia?",
            alternativas: ["Conta Comigo!", "Educação na Veia", "Ouvidoria Vai à Escola", "Caminhos de Contas"],
            correta: 2
        },
{
            pergunta: "Cantor baiano, considerado pai do rock brasileiro, famoso por suas músicas contestadoras, com referências místicas:",
            alternativas: ["Tom Zé", "Cazuza", "Raul Seixas", "Marcelo Nova"],
            correta: 2
        },
{
            pergunta: "Qual a sigla da universidade baiana considerada a primeira do Brasil, fundada por Dom João VI em 1808?",
            alternativas: ["UNEB", "UFBA", "UCSAL", "UEFS"],
            correta: 1
        },
{
            pergunta: "Como o cidadão pode fazer uma denúncia de irregularidade ao TCE/BA?",
            alternativas: ["Apenas presencialmente", "Somente por e-mail", "Via protocolo eletrônico", "Por e-mail, correspondência, WhatsApp, telefone ou presencialmente"],
            correta: 3
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
        },
		{
            pergunta: "Qual é a cidade natal da heroína baiana Maria Quitéria?",
            alternativas: ["Xique-Xique", "Feira de Santana", "Itaparica", "Salvador"],
            correta: 1
        },
{
            pergunta: "O Banco do Brasil e a Caixa Econômica Federal são:",
            alternativas: ["Autarquias federais", "Fundações públicas", "Órgãos públicos", "Empresas estatais"],
            correta: 3
        },
{
            pergunta: "Quem foi o responsável pela proposta que deu origem ao Tribunal de Contas da União (TCU)?",
            alternativas: ["Anísio Teixeira", "Marquês de Pombal", "Visconde de Cairu", "Ruy Barbosa"],
            correta: 3
        },
{
            pergunta: "Qual a idade máxima para que crianças tenham acesso a creches e pré-escolas?",
            alternativas: ["6 anos", "5 anos", "4 anos", "12 anos"],
            correta: 1
        },
{
            pergunta: "Qual é o percentual mínimo da receita dos impostos que a Constituição Federal previu para ser aplicado na educação pelos estados e municípios?",
            alternativas: ["12%", "15%", "18%", "25%"],
            correta: 3
        },
{
            pergunta: "Qual dos títulos a seguir não faz parte da obra do escritor baiano Jorge Amado?",
            alternativas: ["Tocaia Grande", "Capitães da Areia", "Corpo Vivo", "Terras do Sem Fim"],
            correta: 2
        },
{
            pergunta: "Quem é conhecido como “O Poeta dos Escravos” e fez parte da geração do Romantismo?",
            alternativas: ["Tobias Barreto", "Castro Alves", "Gonçalves Dias", "Cassiano Ricardo"],
            correta: 1
        },
{
            pergunta: "Cantor e compositor, foi ministro da Cultura:",
            alternativas: ["Caetano Veloso", "Chico Buarque", "Gilberto Gil", "Moraes Moreira"],
            correta: 2
        },
{
            pergunta: "Grande pensador da educação, criou o modelo da Escola Parque:",
            alternativas: ["Paulo Freire", "Anísio Teixeira", "Darcy Ribeiro", "Rubem Alves"],
            correta: 1
        },
{
            pergunta: "Quem é o autor baiano que escreveu várias novelas de sucesso na TV brasileira?",
            alternativas: ["Adonias Filho", "Dias Gomes", "João Ubaldo Ribeiro", "Jorge Amado"],
            correta: 1
        },
{
            pergunta: "Escritor baiano, foi membro da Academia Brasileira de Letras. Escreveu “Viva o Povo Brasileiro”:",
            alternativas: ["João Ubaldo Ribeiro", "Jorge Amado", "Graciliano Ramos", "Ariano Suassuna"],
            correta: 0
        },
{
            pergunta: "Quem é o Patrono dos Tribunais de Contas do Brasil?",
            alternativas: ["Marechal Deodoro da Fonseca", "Ruy Barbosa", "Errada 2", "Errada 3"],
            correta: 1
        },
{
            pergunta: "Qual o ano de inauguração do Centro Administrativo da Bahia (CAB)?",
            alternativas: ["1980", "1950", "1978", "1972"],
            correta: 3
        },
		{
            pergunta: "Qual dessas cidades baianas é conhecida por sua produção de urânio?",
            alternativas: ["Mucugê", "Caetité", "Ourolândia", "Lençóis"],
            correta: 1
        }, 
		{
            pergunta: "Primeiro(a) engenheiro(a) negro(a) a se formar na Escola Militar do Rio de Janeiro, nascido(a) na cidade de Cachoeira/BA. Idealizou e projetou a ferrovia Curitiba/Paranaguá:",
            alternativas: ["Enedina Alves Marques", "Antônio Joaquim de Souza", "Teodoro Sampaio", "André Rebouças"],
            correta: 3
        },
{
            pergunta: "Na obra literária “O Homem que Sabia Javanês”, de Lima Barreto, qual a cidade natal do personagem Castelo?",
            alternativas: ["Canavieiras", "Tucano", "Salvador", "Castro Alves"],
            correta: 0
        },
{
            pergunta: "Em qual ano o Tribunal de Contas do Estado da Bahia foi extinto pela ditadura do Estado Novo?",
            alternativas: ["1939", "1935", "1942", "1964"],
            correta: 2
        },
{
            pergunta: "Em que ano o Tribunal de Contas do Estado da Bahia foi criado?",
            alternativas: ["2000", "1964", "1915", "1922"],
            correta: 2
        },
{
            pergunta: "O que não é da competência dos Tribunais de Contas do Estado?",
            alternativas: ["Aplicar multas", "Calcular as cotas de impostos repassados aos municípios pelo estado", "Emitir pareceres prévios para a Assembleia Legislativa", "Executar a apreensão de administradores estaduais que cometem irregularidades"],
            correta: 3
        },

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
            pergunta: "O que significa a sigla REDA na gestão pública?",
            alternativas: ["Regime Especial de Direito Administrativo", "Regime Especial da Administração", "Regime Diferenciado de Agentes Públicos", "Regime Extraordinário da Administração"],
            correta: 0
        },
		{
            pergunta: "As Normas de Auditoria Governamental (NAGs) aplicáveis ao controle externo brasileiro foram construídas com base:",
            alternativas: ["em práticas internacionais", "em práticas exclusivamente nacionais", "em práticas de auditoria privada", "na jurisprudência do TCU"],
            correta: 0
        },
{
            pergunta: "Quem foi o paraense responsável por implantar o Tribunal de Contas da União (TCU) quando ocupou o cargo de Ministro da Fazenda de 1892 a 1893?",
            alternativas: ["Serzedello Corrêa", "Ruy Barbosa", "Floriano Peixoto", "Alberto Engelhard"],
            correta: 0
        },
{
            pergunta: "Em que documento se materializam as diretrizes, metas e estratégias que devem reger as iniciativas na área da Educação?",
            alternativas: ["Plano Plurianual (PPA)", "Lei de Diretrizes Orçamentárias (LDO)", "Plano Nacional de Educação (PNE)", "Plano Estratégico para Educação e Cultura (PEEC)"],
            correta: 2
        },
{
            pergunta: "Como são conhecidas as unidades de Educação Corporativa no âmbito dos Tribunais de Contas?",
            alternativas: ["Escolas de Governo", "Escolas de Contas", "Escolas de Auditoria Pública", "Escolas Governamentais"],
            correta: 1
        },
{
            pergunta: "Qual das alternativas a seguir consta de uma cláusula pétrea prevista na Constituição Federal de 1988 (CF/88)?",
            alternativas: ["forma republicana", "voto direto, secreto, periódico e universal", "sistema presidencialista", "direitos e garantias coletivas"],
            correta: 1
        },
{
            pergunta: "Qual a idade mínima para se tornar Conselheiro dos Tribunais de Contas?",
            alternativas: ["30 anos", "35 anos", "40 anos", "45 anos"],
            correta: 1
        }, 
		{
            pergunta: "Artista multifacetado, foi diretor da Pinacoteca do Estado de São Paulo e diretor do Museu Afro Brasil:",
            alternativas: ["João Timótheo", "Benedito José de Andrade", "Wilson Tibério", "Emanoel Araújo"],
            correta: 3
        },
		
    ]
};

/* ===================================================
   ESTADO DO JOGO
   =================================================== */
let perguntasAtuais = [];
let indicePerguntaAtual = 0;
let pontuacao = 0;
let tempoRestante = 0;
let tempoLimite = 30; 
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

const hintBtn = document.getElementById('hint-btn');
const hintBox = document.getElementById('hint-box');

const resultTitle = document.getElementById('result-title');
const resultIcon = document.getElementById('result-icon');
const resultMessage = document.getElementById('result-message');
const finalScoreDisplay = document.getElementById('final-score');

/* ===================================================
   FUNÃ‡Ã•ES DO JOGO
   =================================================== */

function shuffle(array) {
    const arrayCopiado = [...array];
    for (let i = arrayCopiado.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayCopiado[i], arrayCopiado[j]] = [arrayCopiado[j], arrayCopiado[i]];
    }
    return arrayCopiado;
}

function startGame(dificuldade) {
    if (dificuldade === 'facil') {
        tempoLimite = 30;
    } else if (dificuldade === 'medio') {
        tempoLimite = 25;
    } else if (dificuldade === 'dificil') {
        tempoLimite = 20;
    }

    perguntasAtuais = shuffle(perguntas[dificuldade]);
    
    indicePerguntaAtual = 0;
    pontuacao = 0;
    scoreDisplay.textContent = pontuacao;

    startScreen.classList.remove('active');
    quizScreen.classList.add('active');

    loadQuestion();
}

function loadQuestion() {
    jaRespondeu = false;
    feedbackMessage.textContent = '';
    feedbackMessage.className = 'feedback';
    nextBtn.classList.add('hidden');

    hintBtn.classList.add('hidden');
    hintBox.classList.add('hidden');
    hintBox.innerHTML = '';

    const perguntaAtual = perguntasAtuais[indicePerguntaAtual];

    if (perguntaAtual.dica) {
        hintBtn.classList.remove('hidden');
    }

    const percentual = ((indicePerguntaAtual) / perguntasAtuais.length) * 100;
    progressBar.style.width = `${percentual}%`;

    questionText.textContent = `${indicePerguntaAtual + 1}. ${perguntaAtual.pergunta}`;

    optionsContainer.innerHTML = '';
    perguntaAtual.alternativas.forEach((opcao, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.textContent = opcao;
        btn.onclick = () => selectOption(index);
        optionsContainer.appendChild(btn);
    });

    startTimer();
}

function toggleHint() {
    const perguntaAtual = perguntasAtuais[indicePerguntaAtual];
    
    if (!perguntaAtual || !perguntaAtual.dica) return;

    if (hintBox.classList.contains('hidden')) {
        hintBox.innerHTML = perguntaAtual.dica;
        hintBox.classList.remove('hidden');
    } else {
        hintBox.classList.add('hidden');
    }
}

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

function handleTimeout() {
    jaRespondeu = true;
    
    // Toca o Ã¡udio de erro no esgotamento do tempo
    tocarSom(somErro);

    pontuacao -= 1;
    scoreDisplay.textContent = pontuacao;

    feedbackMessage.textContent = "O tempo acabou! (-1 ponto)";
    feedbackMessage.classList.add('incorrect');

    highlightAnswers(-1);
    disableOptions();
    nextBtn.classList.remove('hidden');
}

function selectOption(indexSelecionado) {
    if (jaRespondeu) return; 
    jaRespondeu = true;
    clearInterval(timerInterval);

    const perguntaAtual = perguntasAtuais[indicePerguntaAtual];
    const ehCorreta = indexSelecionado === perguntaAtual.correta;

    if (ehCorreta) {
        pontuacao += 1;
        feedbackMessage.textContent = "Resposta Correta! (+1 ponto)";
        feedbackMessage.classList.add('correct');
        tocarSom(somAcerto); // Toca o som x.mp3
    } else {
        pontuacao -= 1;
        feedbackMessage.textContent = "Resposta Incorreta! (-1 ponto)";
        feedbackMessage.classList.add('incorrect');
        tocarSom(somErro); // Toca o som y.mp3
    }

    scoreDisplay.textContent = pontuacao;

    highlightAnswers(indexSelecionado);
    disableOptions();
    nextBtn.classList.remove('hidden');
}

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

function disableOptions() {
    const botoes = optionsContainer.children;
    Array.from(botoes).forEach(btn => {
        btn.disabled = true;
    });
}

function nextQuestion() {
    indicePerguntaAtual++;

    if (indicePerguntaAtual < perguntasAtuais.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timerInterval);
    
    progressBar.style.width = '100%';

    quizScreen.classList.remove('active');
    endScreen.classList.add('active');

    finalScoreDisplay.textContent = pontuacao;

    if (pontuacao >= PONTOS_PARA_VENCER) {
        resultTitle.textContent = "Você Venceu!";
        resultIcon.textContent = "Imagem feliz";
        resultMessage.textContent = `Parabéns! Você alcançou o objetivo atingindo ${pontuacao} ponto(s).`;
    } else {
        resultTitle.textContent = "Você Perdeu!";
        resultIcon.textContent = "Sad";
        resultMessage.textContent = `Você fez ${pontuacao} ponto(s). Eram necessários pelo menos ${PONTOS_PARA_VENCER} pontos para vencer.`;
    }
}

function restartGame() {
    endScreen.classList.remove('active');
    startScreen.classList.add('active');
}