// ====== VARIÁVEIS GLOBAIS E ELEMENTOS DO DOM ======
const startButton = document.getElementById('start-button');
const startScreen = document.getElementById('start-screen');
const mazeLevel1 = document.getElementById('maze-level-1');
const mazeLevel2 = document.getElementById('maze-level-2');
const mazeLevel3 = document.getElementById('maze-level-3');
const jumpscareScreen = document.getElementById('jumpscare-screen');
const jumpscareAudio = document.getElementById('jumpscare-audio');
const cupGameScreen = document.getElementById('cup-game-screen');

// Variáveis do jogador
let currentPlayer = null; // O elemento DOM do jogador ativo no nível atual
let playerX = 0; // Posição X do jogador em pixels
let playerY = 0; // Posição Y do jogador em pixels
const playerSpeed = 5; // Velocidade de movimento do jogador

// Constantes do Labirinto
const TILE_SIZE = 40; // Tamanho de cada "quadrado" do labirinto em pixels
let currentMazeData = null; // Armazena dados do labirinto atual (início, fim)

// Estados do jogo
let currentLevel = 0; // 0 = start, 1 = maze1, 2 = maze2, 3 = maze3, 4 = jumpscare, 5 = cup game

// ====== MAPAS DOS LABIRINTOS ======
// *** Certifique-se de que seus mapas estejam definidos aqui ***
const mazeMap1 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 , 1, 1, 1, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 1, 3, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1]

];

const mazeMap2 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 3, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1]

];

const mazeMap3 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 3, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1]

];


// ====== FUNÇÕES AUXILIARES ======

function showScreen(screenId) {
    document.querySelectorAll('.game-screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}
function changeLevelIfCheckpointReached() {
    if (checkEndOfLevel(playerX, playerY, currentMazeData)) {
        currentLevel++; // Avança para o próximo nível
        console.log("Passou de nível! Agora no nível " + currentLevel);

        // Aqui você pode definir qual labirinto será mostrado
        if (currentLevel === 2) {
            showScreen("maze-level-2"); // Exibe o próximo nível
            currentMazeData = createMaze(mazeMap2, "maze-level-2");
        } else if (currentLevel === 3) {
            showScreen("maze-level-3"); // Exibe o último nível
            currentMazeData = createMaze(mazeMap3, "maze-level-3");
        }
    }
}

document.addEventListener("keydown", (event) => {
    // Atualiza posição do jogador
    let newX = playerX;
    let newY = playerY;

    if (event.key === "ArrowUp") newY -= playerSpeed;
    if (event.key === "ArrowDown") newY += playerSpeed;
    if (event.key === "ArrowLeft") newX -= playerSpeed;
    if (event.key === "ArrowRight") newX += playerSpeed;

    // Verifica se não colidiu com paredes
    if (!checkCollision(newX, newY, currentMazeData)) {
        playerX = newX;
        playerY = newY;
        currentPlayer.style.left = playerX + "px";
        currentPlayer.style.top = playerY + "px";
    }

    // 🚀 Verifica se chegou ao checkpoint
    changeLevelIfCheckpointReached();
});

/**
 * Cria o labirinto no HTML com base na matriz do mapa.
 * Retorna as posições de início e fim do jogador.
 */
function createMaze(mazeMap, mazeWallsContainerId) {
    const mazeWallsContainer = document.getElementById(mazeWallsContainerId);
    if (!mazeWallsContainer) {
        console.error(`Container de paredes '${mazeWallsContainerId}' não encontrado.`);
        return { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } }; // Retorna valores padrão para evitar erros
    }
    mazeWallsContainer.innerHTML = ''; // Limpa qualquer parede ou end-point anterior

    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    for (let row = 0; row < mazeMap.length; row++) {
        for (let col = 0; col < mazeMap[row].length; col++) {
            const cellType = mazeMap[row][col];

            if (cellType === 1) { // É uma parede
                const wall = document.createElement('div');
                wall.classList.add('wall');
                wall.style.width = `${TILE_SIZE}px`;
                wall.style.height = `${TILE_SIZE}px`;
                wall.style.left = `${col * TILE_SIZE}px`;
                wall.style.top = `${row * TILE_SIZE}px`;
                mazeWallsContainer.appendChild(wall);
            } else if (cellType === 2) { // Ponto de início do jogador
                startX = col * TILE_SIZE;
                startY = row * TILE_SIZE;
            } else if (cellType === 3) { // Ponto de chegada (fim do labirinto)
                endX = col * TILE_SIZE;
                endY = row * TILE_SIZE;

                const endPoint = document.createElement('div');
                endPoint.classList.add('end-point');
                endPoint.style.width = `${TILE_SIZE}px`;
                endPoint.style.height = `${TILE_SIZE}px`;
                endPoint.style.left = `${endX}px`;
                endPoint.style.top = `${endY}px`;
                endPoint.textContent = 'nivel2'; // Adiciona texto ao portal
                mazeWallsContainer.appendChild(endPoint); // ADICIONA O PORTAL AO DOM
            }
        }
    }
    return { start: { x: startX, y: startY }, end: { x: endX, y: endY } };
}

/**
 * Verifica se a nova posição do jogador colide com alguma parede.
 * Se houver colisão, retorna true.
 */
function checkCollision(newX, newY, currentMazeMap) {
    if (!currentPlayer) {
        console.warn("currentPlayer é nulo em checkCollision. Ignorando colisão.");
        return false;
    }

    const playerWidth = currentPlayer.offsetWidth;
    const playerHeight = currentPlayer.offsetHeight;

    const corners = [
        { x: newX, y: newY }, // Top-left
        { x: newX + playerWidth - 1, y: newY }, // Top-right
        { x: newX, y: newY + playerHeight - 1 }, // Bottom-left
        { x: newX + playerWidth - 1, y: newY + playerHeight - 1 } // Bottom-right
    ];

    for (const corner of corners) {
        const gridX = Math.floor(corner.x / TILE_SIZE);
        const gridY = Math.floor(corner.y / TILE_SIZE);

        if (gridY >= 0 && gridY < currentMazeMap.length &&
            gridX >= 0 && gridX < currentMazeMap[0].length) {
            if (currentMazeMap[gridY][gridX] === 1) {
                return true; // Colisão detectada!
            }
        }
    }
    return false; // Nenhuma colisão
}

/**
 * Verifica se o jogador chegou ao ponto final do nível.
 */
function checkEndOfLevel(playerX, playerY, currentMazeData) {
    if (!currentPlayer || !currentMazeData || !currentMazeData.end) {
        console.warn("Dados de fim de nível incompletos ou jogador nulo.");
        return false;
    }

    const playerCenterX = playerX + currentPlayer.offsetWidth / 2;
    const playerCenterY = playerY + currentPlayer.offsetHeight / 2;

    const endPointLeft = currentMazeData.end.x;
    const endPointTop = currentMazeData.end.y;
    const endPointRight = currentMazeData.end.x + TILE_SIZE;
    const endPointBottom = currentMazeData.end.y + TILE_SIZE;

    // Se o CENTRO do jogador está DENTRO da área do end-point (portal)
    if (playerCenterX >= endPointLeft && playerCenterX < endPointRight &&
        playerCenterY >= endPointTop && playerCenterY < endPointBottom) {
        return true;
    }
    return false;
}

// ====== LÓGICA PRINCIPAL DO JOGO ======

startButton.addEventListener('click', () => {
    currentLevel = 1;
    showScreen('maze-level-1');
    // Pegue o ÚNICO elemento do jogador
    currentPlayer = document.getElementById('player-1');

    if (!currentPlayer) {
        console.error("Elemento do jogador 'player-1' não encontrado. Verifique seu HTML.");
        return; // Impede que o jogo continue sem o jogador
    }

    // Mova o player para a tela inicial do labirinto (maze-level-1)
    const initialMazeContainer = document.getElementById('maze-level-1');
    if (initialMazeContainer) {
        initialMazeContainer.appendChild(currentPlayer);
    } else {
        console.error("Container 'maze-level-1' não encontrado.");
        return;
    }

    currentMazeData = createMaze(mazeMap1, 'level-1-walls');

    if (!currentMazeData || !currentMazeData.start) {
        console.error("Dados de início do labirinto 1 não foram carregados corretamente.");
        return; // Impede que o jogo continue sem os dados de início
    }

    playerX = currentMazeData.start.x;
    playerY = currentMazeData.start.y;
    currentPlayer.style.left = `${playerX}px`;
    currentPlayer.style.top = `${playerY}px`;
    console.log(`Jogo iniciado. Nível 1. Jogador em: (${playerX}, ${playerY})`);
});

document.addEventListener('keydown', (e) => {
    if (!currentPlayer || currentLevel < 1 || currentLevel > 3) return;

    let newPlayerX = playerX;
    let newPlayerY = playerY;

    const currentMazeMap = (currentLevel === 1) ? mazeMap1 :
        (currentLevel === 2) ? mazeMap2 : mazeMap3;

    if (!currentMazeData || !currentMazeData.start || !currentMazeData.end) {
        console.error("currentMazeData não está definido para o nível atual!");
        return;
    }

    switch (e.key) {
        case 'ArrowUp':
        case 'w':
            newPlayerY -= playerSpeed;
            break;
        case 'ArrowDown':
        case 's':
            newPlayerY += playerSpeed;
            break;
        case 'ArrowLeft':
        case 'a':
            newPlayerX -= playerSpeed;
            break;
        case 'ArrowRight':
        case 'd':
            newPlayerX += playerSpeed;
            break;
        default:
            return; // Ignora outras teclas
    }

    const mazeContainer = document.getElementById(`maze-level-${currentLevel}`);
    if (mazeContainer) {
        const maxX = mazeContainer.offsetWidth - currentPlayer.offsetWidth;
        const maxY = mazeContainer.offsetHeight - currentPlayer.offsetHeight;
        newPlayerX = Math.max(0, Math.min(newPlayerX, maxX));
        newPlayerY = Math.max(0, Math.min(newPlayerY, maxY));
    } else {
        console.warn(`Container do labirinto 'maze-level-${currentLevel}' não encontrado.`);
        return;
    }

    // LÓGICA DE COLISÃO E RETORNO AO INÍCIO
    if (checkCollision(newPlayerX, newPlayerY, currentMazeMap)) {
        playerX = currentMazeData.start.x;
        playerY = currentMazeData.start.y;
        currentPlayer.style.left = `${playerX}px`;
        currentPlayer.style.top = `${playerY}px`;
        console.log(`Colisão no Nível ${currentLevel}! Voltando ao início: (${playerX}, ${playerY})`);
    } else {
        playerX = newPlayerX;
        playerY = newPlayerY;
        currentPlayer.style.left = `${playerX}px`;
        currentPlayer.style.top = `${playerY}px`;

        // LÓGICA DE FIM DE NÍVEL (PORTAL)
        if (checkEndOfLevel(playerX, playerY, currentMazeData)) {
            console.log(`Fim do Nível ${currentLevel} alcançado!`);
            advanceLevel();
        }
    }
});

function advanceLevel() {
    currentLevel++;
    let nextMazeMap;
    let nextMazeContainerId;

    if (currentLevel === 2) {
        nextMazeMap = mazeMap2;
        nextMazeContainerId = 'level-2-walls';
        showScreen('maze-level-2');
    } else if (currentLevel === 3) {
        nextMazeMap = mazeMap3;
        nextMazeContainerId = 'level-3-walls';
        showScreen('maze-level-3');
        if (currentLevel === 4) {
            showScreen("jumpscare-screen");
            jumpscareAudio.play();
            setTimeout(() => {
                showScreen("cup-game-screen");
                currentLevel = 5;
                setupCupGame();
            }, 3000);
            return;
        }

        setTimeout(() => {
            showScreen('cup-game-screen');
            currentLevel = 5;
            setupCupGame(); // Inicia a lógica do jogo dos copos
        }, 3000); // Exibe o jumpscare por 3 segundos
        return; // Sai da função para não tentar criar um novo labirinto
    } else {
        console.warn("Tentou avançar para um nível desconhecido ou após o fim dos labirintos.");
        return;
    }

    // Mova o elemento do jogador para o novo contêiner do labirinto
    const newMazeContainer = document.getElementById(`maze-level-${currentLevel}`);
    if (newMazeContainer) {
        newMazeContainer.appendChild(currentPlayer);
    } else {
        console.error(`Container do labirinto 'maze-level-${currentLevel}' não encontrado.`);
        return;
    }

    currentMazeData = createMaze(nextMazeMap, nextMazeContainerId);
    if (!currentMazeData || !currentMazeData.start || !currentMazeData.end) {
        console.error(`Dados do labirinto não puderam ser carregados para o Nível ${currentLevel}.`);
        return;
    }

    playerX = currentMazeData.start.x;
    playerY = currentMazeData.start.y;
    currentPlayer.style.left = `${playerX}px`;
    currentPlayer.style.top = `${playerY}px`;
    console.log(`Início do Nível ${currentLevel}. Jogador em: (${playerX}, ${playerY})`);
}


// ====== LÓGICA DO JOGO DOS COPOS ======
const cups = document.querySelectorAll('.cup');
const ball = document.getElementById('ball');
const cupGameMessage = document.getElementById('cup-game-message');
let correctCup = null;

function setupCupGame() {
    cups.forEach(cup => cup.style.transform = 'none');
    ball.style.transform = 'translateX(-50%)';
    cupGameMessage.textContent = '';

    const randomIndex = Math.floor(Math.random() * cups.length);
    correctCup = cups[randomIndex];

    const cupRect = correctCup.getBoundingClientRect();
    const containerRect = cupGameScreen.getBoundingClientRect();
    ball.style.left = `${cupRect.left - containerRect.left + cupRect.width / 2}px`;
    ball.style.top = `${cupRect.bottom - containerRect.top - 10}px`;
    ball.style.display = 'none';

    setTimeout(() => {
        shuffleCupsAnimation();
    }, 1000);
}

function shuffleCupsAnimation() {
    ball.style.display = 'none';
    setTimeout(() => {
        cups.forEach(cup => {
            cup.onclick = () => revealCup(cup);
        });
        cupGameMessage.textContent = 'Onde está o objeto?';
    }, 2000);
}

function revealCup(clickedCup) {
    const cupRect = clickedCup.getBoundingClientRect();
    const containerRect = cupGameScreen.getBoundingClientRect();

    ball.style.left = `${cupRect.left - containerRect.left + cupRect.width / 2}px`;
    ball.style.top = `${cupRect.bottom - containerRect.top - 10}px`;
    ball.style.display = 'block';

    if (clickedCup === correctCup) {
        cupGameMessage.textContent = 'Parabéns! Você acertou!';
        cups.forEach(cup => cup.onclick = null);
    } else {
        cupGameMessage.textContent = 'Que pena! Tente novamente.';
        setTimeout(setupCupGame, 1500);
    }
}
