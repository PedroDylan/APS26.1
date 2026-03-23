/*BOOK SPINES*/

const COLORS = [
  '#8b6914','#5a3e28','#3d5c3a','#7a2e1e','#2e4a5c',
  '#6e4a1e','#4a3a5c','#2e5c4a','#8b3a2a','#4a5c2e',
  '#1e3a5c','#5c4a1e','#3a5c3a','#6e2e3a','#2e3a5c'
];

/**
 * Gera as lombadas de livros decorativas na base da tela.
 * Calcula quantas cabem na largura da janela e cria uma <div>
 * para cada uma com cor, altura e opacidade aleatórias.
 */
function generateSpines() {
  const spinesEl = document.getElementById('spines');
  const count    = Math.floor(window.innerWidth / 22);

  for (let i = 0; i < count; i++) {
    const spine   = document.createElement('div');
    spine.className = 'spine';

    const height  = 60  + Math.random() * 120;
    const width   = 14  + Math.random() * 12;
    const color   = COLORS[Math.floor(Math.random() * COLORS.length)];
    const opacity = 0.25 + Math.random() * 0.35;

    spine.style.cssText = `height:${height}px;width:${width}px;background:${color};opacity:${opacity}`;
    spinesEl.appendChild(spine);
  }
}


/*TOGGLE DE SENHA*/

/**
 * Alterna a visibilidade do campo de senha entre tipo "password" e "text".
 * Também troca o ícone do botão (olho aberto / olho riscado).
 */
function initPasswordToggle() {
  const toggleBtn = document.getElementById('togglePw');
  const pwInput   = document.getElementById('password');
  const eyeIcon   = document.getElementById('eyeIcon');

  const EYE_OPEN = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
  const EYE_OFF  = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`;

  toggleBtn.addEventListener('click', () => {
    const isHidden     = pwInput.type === 'password';
    pwInput.type       = isHidden ? 'text' : 'password';
    eyeIcon.innerHTML  = isHidden ? EYE_OFF : EYE_OPEN;
  });
}


/*AUTENTICAÇÃO*/

/*Credenciais de demonstração (mock de banco de dados)*/
const USERS = {
  'admin':         'biblioteca123',
  'bibliotecario': 'livros2024',
  'usuario':       'senha123',
};

/**
 * Exibe a caixa de erro com a mensagem fornecida.
 * @param {string} msg - Texto do erro a ser exibido.
 */
function showError(msg) {
  const errorBox = document.getElementById('errorBox');
  const errorMsg = document.getElementById('errorMsg');
  errorMsg.textContent = msg;
  errorBox.classList.add('show');
}

/**
 * Retorna uma Promise que resolve após o tempo especificado.
 * Usada para simular latência de rede.
 * @param {number} ms - Milissegundos de espera.
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Reinicia a animação CSS de shake no elemento fornecido.
 * Remove a animação por um frame e a readiciona, forçando o browser
 * a executar o efeito mesmo em tentativas repetidas.
 * @param {HTMLElement} el - Elemento que deve tremer.
 */
function shake(el) {
  el.style.animation = 'none';
  requestAnimationFrame(() => { el.style.animation = ''; });
}

/**
 * Inicializa o listener de submit do formulário de login.
 * Fluxo:
 *  1. Previne o comportamento padrão (recarregar página)
 *  2. Valida campos obrigatórios
 *  3. Ativa estado de carregamento no botão
 *  4. Simula chamada ao servidor (delay)
 *  5. Verifica credenciais e exibe sucesso ou erro
 */
function initLoginForm() {
  const form     = document.getElementById('loginForm');
  const btn      = document.getElementById('submitBtn');
  const errorBox = document.getElementById('errorBox');
  const overlay  = document.getElementById('successOverlay');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorBox.classList.remove('show');

    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value;

    // Validação básica de campos vazios
    if (!user || !pass) {
      showError('Preencha usuário e senha.');
      return;
    }

    // Ativa spinner e desabilita botão durante a requisição
    btn.classList.add('loading');
    btn.disabled = true;

    await delay(1200); // simula latência do servidor

    if (USERS[user] && USERS[user] === pass) {
      // Login bem-sucedido: exibe overlay e redireciona após 2s
      overlay.classList.add('show');
      setTimeout(() => {
        alert('✅ Login realizado! Aqui você redirecionaria para o painel principal.');
        overlay.classList.remove('show');
        btn.classList.remove('loading');
        btn.disabled = false;
      }, 2000);
    } else {
      // Credenciais inválidas: exibe erro e anima o formulário
      btn.classList.remove('loading');
      btn.disabled = false;
      showError('Usuário ou senha incorretos.');
      shake(form);
    }
  });
}


/*INICIALIZAÇÃO*/
document.addEventListener('DOMContentLoaded', () => {
  generateSpines();
  initPasswordToggle();
  initLoginForm();
});
