// --- INTERATIVIDADE COMPLETA E PERSISTENTE ---

document.addEventListener('DOMContentLoaded', () => {
    atualizarProgressoVisual();
    carregarQuiz();
});

// 1. Modal da ONG (HomePage)
const modal = document.getElementById('ongModal');
if (document.getElementById('btnOng')) {
    document.getElementById('btnOng').addEventListener('click', () => modal.style.display = 'flex');
    document.getElementById('closeOng').addEventListener('click', () => modal.style.display = 'none');
}

// 2. Acordeão do FAQ
document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.nextElementSibling;
        if (answer.style.maxHeight && answer.style.maxHeight !== '0px') {
            answer.style.maxHeight = '0px';
            answer.style.padding = '0 20px';
        } else {
            answer.style.maxHeight = answer.scrollHeight + '20px';
            answer.style.padding = '20px';
        }
    });
});

// 3. Mecânica do Minicurso (Expansão e Armazenamento Local)
function alternarConteudo(numAula) {
    const conteudo = document.getElementById(`conteudo-${numAula}`);
    if (conteudo) conteudo.classList.toggle('ativo');
}

function marcarConcluido(numAula) {
    localStorage.setItem(`etec_aula_${numAula}`, 'concluida');
    atualizarProgressoVisual();
}

function atualizarProgressoVisual() {
    let concluidas = 0;
    const totalAulas = 3;

    for (let i = 1; i <= totalAulas; i++) {
        const status = localStorage.getItem(`etec_aula_${i}`);
        const cardElemento = document.getElementById(`card-aula-${i}`);
        const btnCheck = document.getElementById(`btn-check-${i}`);

        if (status === 'concluida') {
            concluidas++;
            if (cardElemento) cardElemento.classList.add('concluido');
            if (btnCheck) {
                btnCheck.innerText = "✓ Módulo Concluído";
                btnCheck.classList.add('feito');
                btnCheck.style.backgroundColor = "#10b981";
            }
        }
    }

    const porcentagem = (concluidas / totalAulas) * 100;
    const barra = document.getElementById('progress-bar');
    const textoProgresso = document.getElementById('texto-progresso');

    if (barra && textoProgresso) {
        barra.style.width = `${porcentagem}%`;
        textoProgresso.innerText = `Você concluiu ${concluidas} de ${totalAulas} módulos (${Math.round(porcentagem)}%)`;
    }
}

function resetarCurso() {
    for (let i = 1; i <= 3; i++) {
        localStorage.removeItem(`etec_aula_${i}`);
        const cardElemento = document.getElementById(`card-aula-${i}`);
        const btnCheck = document.getElementById(`btn-check-${i}`);
        if (cardElemento) cardElemento.classList.remove('concluido');
        if (btnCheck) {
            btnCheck.innerText = "Marcar como Lido";
            btnCheck.style.backgroundColor = "#2563eb";
        }
    }
    atualizarProgressoVisual();
}

// 4. Simulador de Golpes (Quiz com Feedbacks Reais)
const quizDados = [
    {
        pergunta: "Você recebe um e-mail urgente dizendo ser do seu banco, informando que sua conta será bloqueada caso não clique no link fornecido. O que fazer?",
        alternativas: [
            { texto: "Clicar imediatamente para verificar o problema.", correta: false },
            { texto: "Ignorar e entrar em contato com o banco pelos canais oficiais.", correta: true },
            { texto: "Preencher apenas os dados parciais para testar o site.", correta: false }
        ],
        feedback: "Bancos não enviam links urgentes de bloqueio por e-mail. Isso é Phishing por Engenharia Social!"
    },
    {
        pergunta: "Ao configurar o roteador Wi-Fi da sua casa, qual ação traz segurança verdadeira contra invasores?",
        alternativas: [
            { texto: "Manter as credenciais padrões de administração (admin/admin).", correta: false },
            { texto: "Esconder o nome da rede (SSID), mantendo-a aberta sem criptografia.", correta: false },
            { texto: "Alterar a senha administrativa de fábrica e ativar o protocolo WPA2 ou WPA3.", correta: true }
        ],
        feedback: "Senhas de fábrica são conhecidas publicamente. Alterar o painel administrativo blinda sua rede doméstica."
    },
    {
        pergunta: "Um amigo envia uma promoção imperdível no WhatsApp solicitando que você compartilhe o link com 10 contatos para liberar um prêmio em Pix. Como agir?",
        alternativas: [
            { texto: "Não clicar no link e alertar o amigo sobre a possibilidade de golpe.", correta: true },
            { texto: "Testar o link imediatamente, pois veio de um contato confiável.", correta: false },
            { texto: "Compartilhar apenas com grupos arquivados para liberar o prêmio.", correta: false }
        ],
        feedback: "Golpistas costumam clonar contas ou usar engenharia social para espalhar links maliciosos via conhecidos."
    },
    {
        pergunta: "Qual das opções abaixo descreve a criação de uma credencial/senha genuinamente forte?",
        alternativas: [
            { texto: "Usar sua data de nascimento ou sequências simples (ex: 12345678).", correta: false },
            { texto: "Mesclar letras maiúsculas e minúsculas formando uma palavra simples (ex: Seguranca).", correta: false },
            { texto: "Utilizar uma frase longa (passphrase) combinando letras, números e caracteres especiais (ex: C@valo#Azul$2026).", correta: true }
        ],
        feedback: "Passphrases longas e complexas barram ataques automatizados de força bruta com eficácia."
    },
    {
        pergunta: "Você recebe uma mensagem informando que ganhou um prêmio, mas precisa pagar uma taxa antecipada para recebê-lo. O que fazer?",
        alternativas: [
            { texto: "Pagar a taxa para garantir o prêmio.", correta: false },
            { texto: "Desconfiar da oferta e não realizar nenhum pagamento.", correta: true },
            { texto: "Negociar um valor menor para a taxa.", correta: false }
        ],
        feedback: "Prêmios legítimos não exigem pagamento antecipado. Esse é um golpe muito comum."
    },
    {
        pergunta: "Ao criar uma conta em um novo site, qual é a melhor prática de segurança?",
        alternativas: [
            { texto: "Usar a mesma senha de outras contas para facilitar o acesso.", correta: false },
            { texto: "Criar uma senha única e forte para esse serviço.", correta: true },
            { texto: "Anotar a senha em um comentário público do navegador.", correta: false }
        ],
        feedback: "Utilizar senhas únicas impede que o comprometimento de uma conta afete as demais."
    },
    {
        pergunta: "Você encontra um pendrive desconhecido no estacionamento da escola. O que deve fazer?",
        alternativas: [
            { texto: "Conectar ao computador para descobrir o dono.", correta: false },
            { texto: "Levar para casa e verificar os arquivos.", correta: false },
            { texto: "Entregar ao responsável sem conectá-lo a nenhum dispositivo.", correta: true }
        ],
        feedback: "Pendrives desconhecidos podem conter malware projetado para infectar computadores."
    },
    {
        pergunta: "Qual é a principal vantagem da autenticação em dois fatores (2FA)?",
        alternativas: [
            { texto: "Deixar a internet mais rápida.", correta: false },
            { texto: "Adicionar uma camada extra de proteção além da senha.", correta: true },
            { texto: "Eliminar a necessidade de criar senhas.", correta: false }
        ],
        feedback: "O 2FA reduz significativamente o risco de invasões mesmo que a senha seja descoberta."
    },
    {
        pergunta: "Ao utilizar um computador público, qual atitude é mais segura?",
        alternativas: [
            { texto: "Salvar a senha no navegador para facilitar o próximo acesso.", correta: false },
            { texto: "Encerrar a sessão e limpar os dados ao terminar o uso.", correta: true },
            { texto: "Deixar a conta aberta caso volte mais tarde.", correta: false }
        ],
        feedback: "Sempre faça logout em computadores compartilhados para evitar acesso indevido."
    },
    {
        pergunta: "Qual sinal pode indicar que um site é falso?",
        alternativas: [
            { texto: "Endereço com erros de escrita ou domínio estranho.", correta: true },
            { texto: "Possuir certificado HTTPS válido.", correta: false },
            { texto: "Ter design moderno e organizado.", correta: false }
        ],
        feedback: "Golpistas costumam criar endereços muito parecidos com os originais para enganar usuários."
    },
    {
        pergunta: "Por que é importante manter o sistema operacional atualizado?",
        alternativas: [
            { texto: "Para corrigir falhas de segurança conhecidas.", correta: true },
            { texto: "Apenas para mudar a aparência do sistema.", correta: false },
            { texto: "Somente para liberar novos papéis de parede.", correta: false }
        ],
        feedback: "Atualizações frequentemente corrigem vulnerabilidades exploradas por criminosos."
    },
    {
        pergunta: "Você recebe um código de verificação por SMS sem ter solicitado. O que fazer?",
        alternativas: [
            { texto: "Enviar o código para quem pedir.", correta: false },
            { texto: "Ignorar e não compartilhar o código com ninguém.", correta: true },
            { texto: "Publicar o código para descobrir quem enviou.", correta: false }
        ],
        feedback: "Códigos de verificação são pessoais e podem ser usados para invadir suas contas."
    }
        
    ];

let perguntaAtual = 0;
let score = 0;

function carregarQuiz() {
    const container = document.getElementById('quiz-box');
    if (!container) return;

    if (perguntaAtual >= quizDados.length) {
        container.innerHTML = `<h2>Simulação Concluída! 🎉</h2>
                               <p style="margin: 15px 0;">Sua classificação de resiliência digital foi de <strong>${score} acertos em ${quizDados.length} cenários</strong>.</p>
                               <button class="btn" onclick="reiniciarQuiz()">Reiniciar Simulador</button>`;
        return;
    }

    const item = quizDados[perguntaAtual];
    container.innerHTML = `
        <h3>Cenário ${perguntaAtual + 1}: ${item.pergunta}</h3>
        <div class="options-container" id="options"></div>
        <p id="feedback" style="margin-top:15px; font-weight:bold; display:none; padding:10px; border-radius:5px; background:#f1f5f9;"></p>
        <button class="btn" id="btnProxima" style="display:none; margin-top:15px; max-width:220px;">Próximo Cenário</button>
    `;

    const optionsContainer = document.getElementById('options');
    item.alternativas.forEach(alt => {
        const btn = document.createElement('button');
        btn.innerText = alt.texto;
        btn.classList.add('option-btn');
        btn.addEventListener('click', () => verificarResposta(btn, alt.correta, item.feedback));
        optionsContainer.appendChild(btn);
    });
}

function verificarResposta(btnElemento, itemCorreto, textoFeedback) {
    const botoes = document.querySelectorAll('.option-btn');
    botoes.forEach(b => b.disabled = true);

    if (itemCorreto) {
        btnElemento.classList.add('correct');
        score++;
    } else {
        btnElemento.classList.add('wrong');

    }

    const fdb = document.getElementById('feedback');
    fdb.innerText = textoFeedback;
    fdb.style.display = 'block';

    const btnProx = document.getElementById('btnProxima');
    btnProx.style.display = 'inline-block';
    btnProx.addEventListener('click', () => {
        perguntaAtual++;
        carregarQuiz();
    });
}

function reiniciarQuiz() {
    perguntaAtual = 0;
    score = 0;
    carregarQuiz();
}