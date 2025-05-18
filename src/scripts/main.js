//pills section tema

const azulBtn = document.querySelector('.pill--blue');
const redBtn = document.querySelector('.pill--red');
const body = document.body;

azulBtn.addEventListener('click', () => {
  if (body.classList.contains('tema-azul')) {
    body.classList.remove('tema-azul');
  } else {
    body.classList.remove('tema-vermelho');
    body.classList.add('tema-azul');
    mostrarMensagem('Você escolheu permanecer na ilusão.');
  }
});

redBtn.addEventListener('click', () => {
  if (body.classList.contains('tema-vermelho')) {
    body.classList.remove('tema-vermelho');
  } else {
    body.classList.remove('tema-azul');
    body.classList.add('tema-vermelho');
    mostrarMensagem('Você escolheu a verdade.');
    mostrarSmith();
  }
});

//mensagem pills

function mostrarMensagem(texto) {
  const msg = document.createElement('div');
  msg.className = 'mensagem-pilula';
  msg.textContent = texto;
  document.body.appendChild(msg);

  setTimeout(() => {
    msg.classList.add('fade-out');
    setTimeout(() => {
      msg.remove();
    }, 800);
  }, 2000);
}

//easter egg - aparece após 5 segundos

function mostrarSmith() {
  const smith = document.querySelector('.agent-smith');
  if (!smith) return;

  smith.classList.remove('hidden');
  smith.classList.add('show');

  setTimeout(() => {
    smith.classList.remove('show');
    setTimeout(() => {
      smith.classList.add('hidden');
    }, 1000);
  }, 4000);
}

function atacarComSmith() {
  const smith = document.getElementById('smith');
  const tiro = document.createElement('div');
  tiro.id = 'tiro';
  document.body.appendChild(tiro);

  smith.classList.add('ativo');

  setTimeout(() => {
    tiro.style.opacity = 1;

    setTimeout(() => {
      tiro.style.opacity = 0;
      smith.classList.remove('ativo');
      document.body.removeChild(tiro);
    }, 300);
  }, 1200); // tempo de "chegada" do Smith
}

const atores = document.querySelectorAll('.ator');

atores.forEach((ator) => {
  const personagem = ator.querySelector(
    '.ator__personagem'
  );
  let timeoutId;

  ator.addEventListener('click', () => {
    const estaAtivo =
      personagem.classList.contains('ativo');

    // Se já está ativo, remove
    if (estaAtivo) {
      personagem.classList.remove('ativo');
      clearTimeout(timeoutId);
      return;
    }

    // Remove de todos os outros
    document
      .querySelectorAll('.ator__personagem')
      .forEach((el) => {
        el.classList.remove('ativo');
      });

    // Adiciona no clicado
    personagem.classList.add('ativo');

    // Some depois de 5 segundos
    timeoutId = setTimeout(() => {
      personagem.classList.remove('ativo');
    }, 5000);
  });
});

// Alternância de abas da seção Cenas dos Filmes
const tabButtons = document.querySelectorAll('.cenas .tab');
const contentGalleries = document.querySelectorAll(
  '.cenas__galeria'
);

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.tab;

    // Remove classes ativas de todas as abas e galerias
    tabButtons.forEach((btn) =>
      btn.classList.remove('ativo')
    );
    contentGalleries.forEach((gallery) =>
      gallery.classList.add('hidden')
    );

    // Ativa o botão clicado e mostra a galeria correspondente
    button.classList.add('ativo');
    const selectedGallery = document.querySelector(
      `[data-content="${target}"]`
    );
    selectedGallery.classList.remove('hidden');
  });
});

const botoesAcordeao = document.querySelectorAll(
  '.acordeao__cabecalho'
);

botoesAcordeao.forEach((btn) => {
  btn.addEventListener('click', () => {
    const acordeao = btn.parentElement;
    const aberto = acordeao.classList.contains('ativo');

    // Fecha todos
    document
      .querySelectorAll('.acordeao')
      .forEach((el) => el.classList.remove('ativo'));

    // Abre só se não estiver aberto
    if (!aberto) {
      acordeao.classList.add('ativo');
    }
  });
});

//background rain matrix
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// 1. Expande para o tamanho real do documento, não só da janela
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
}

resizeCanvas();

// 2. Atualiza se a janela for redimensionada
window.addEventListener('resize', resizeCanvas);

// 3. Efeito Matrix
const letters =
  'アァイイウエカキクケコサシスセソタチツナニハヒフヘホマミムメモラリルレロワンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(
    ''
  );
const fontSize = 14;
let columns = canvas.width / fontSize;
let drops = new Array(Math.floor(columns)).fill(1);

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0F0';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text =
      letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (
      drops[i] * fontSize > canvas.height &&
      Math.random() > 0.975
    ) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(draw, 33);
