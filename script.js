document.addEventListener("DOMContentLoaded", () => {
    const div = document.body;
    const toggleSwitch = document.getElementById("themeToggle");

    // Aplica automaticamente o tema salvo no localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        div.classList.add(savedTheme);
        if (toggleSwitch) toggleSwitch.checked = (savedTheme === "dark-mode");
    } else {
        div.classList.add("light-mode"); // Define o tema claro por padrão
    }

    // Alternar tema ao clicar no botão
    if (toggleSwitch) {
        toggleSwitch.addEventListener("change", () => {
            if (toggleSwitch.checked) {
                div.classList.remove("light-mode");
                div.classList.add("dark-mode");
                localStorage.setItem("theme", "dark-mode");
            } else {
                div.classList.remove("dark-mode");
                div.classList.add("light-mode");
                localStorage.setItem("theme", "light-mode");
            }
        });
    }

    // Carrega ranking salvo
    loadRanking();
});

let secretNumber;
let attempts;
let currentPlayer = "";
let ranking = [];

function startGame() {
    const startSound = document.getElementById('startSound');
    startSound.play(); // 🎬 toca som de início

    const nameInput = document.getElementById('playerName');
    const name = nameInput.value.trim();

    if (name === "") {
        alert("Digite um nome válido.");
        return;
    }

    currentPlayer = name;
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;

    document.getElementById('nameSection').style.display = 'none';
    document.getElementById('gameSection').style.display = 'block';
    document.getElementById('endSection').style.display = 'none';
    document.getElementById('message').textContent = '';
    document.getElementById('attempts').textContent = '';
    document.getElementById('guessInput').value = '';
}

function checkGuess() {
    const guess = parseInt(document.getElementById('guessInput').value);
    const message = document.getElementById('message');
    const attemptsDisplay = document.getElementById('attempts');
    const winSound = document.getElementById('winSound');
    const errorSound = document.getElementById('errorSound');

    if (isNaN(guess) || guess < 1 || guess > 100) {
        message.innerHTML = "⚠️ <span style='color:red;'>Digite um número válido entre 1 e 100.</span>";
        return;
    }

    attempts++;

    const diff = Math.abs(secretNumber - guess);

    if (guess === secretNumber) {
        message.textContent = "";
        attemptsDisplay.textContent = "";

        document.getElementById('gameSection').style.display = 'none';
        document.getElementById('endSection').style.display = 'block';
        document.getElementById('endMessage').innerHTML = `🎉 <strong>${currentPlayer}</strong>, você acertou o número <strong>${secretNumber}</strong> em <strong>${attempts}</strong> tentativa(s)!`;

        let playerData = ranking.find(p => p.name === currentPlayer);
        if (playerData) {
            playerData.gamesPlayed += 1;

            // Atualiza melhor tentativa
            if (attempts < playerData.bestScore) {
                playerData.bestScore = attempts;
            }

            // Atualiza pior tentativa
            if (playerData.worstScore === undefined || attempts > playerData.worstScore) {
                playerData.worstScore = attempts;
            }

        } else {
            ranking.push({
                name: currentPlayer,
                bestScore: attempts,
                worstScore: attempts,
                gamesPlayed: 1
            });
        }

        updateRanking();

        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });

        winSound.play();

    } else {
        errorSound.play();

        let hint = "";
        if (diff <= 5) {
            hint = "🔥 Tá pegando fogo!";
        } else if (diff <= 15) {
            hint = "🌡️ Tá quente!";
        } else if (diff <= 30) {
            hint = "🧊 Tá frio!";
        } else {
            hint = "🥶 Congelou!";
        }

        message.innerHTML = `${guess < secretNumber ? "🔼 Tente um número maior." : "🔽 Tente um número menor."} <br><span style='color:blue;'>${hint}</span>`;
        attemptsDisplay.textContent = `Tentativas: ${attempts}`;
    }
}


function playAgainSame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;

    document.getElementById('gameSection').style.display = 'block';
    document.getElementById('endSection').style.display = 'none';
    document.getElementById('message').textContent = '';
    document.getElementById('attempts').textContent = '';
    document.getElementById('guessInput').value = '';
}

function playAgainNew() {
    document.getElementById('nameSection').style.display = 'block';
    document.getElementById('gameSection').style.display = 'none';
    document.getElementById('endSection').style.display = 'none';
    document.getElementById('playerName').value = '';
}

function updateRanking() {
    localStorage.setItem("ranking", JSON.stringify(ranking));

    const list = document.getElementById('rankingList');
    list.innerHTML = "";

    ranking.sort((a, b) => a.bestScore - b.bestScore);

    ranking.forEach((entry, index) => {
        if (entry.name.trim() !== "") {
            const worst = entry.worstScore ?? "–"; // usa "–" se o campo estiver indefinido
            const li = document.createElement('li');
            li.innerHTML = `
                ${index + 1}. <strong>${entry.name}</strong><br>
                🏅 Melhor: ${entry.bestScore} tentativa(s)<br>
                😬 Pior: ${worst} tentativa(s)<br>
                🎮 Partidas: ${entry.gamesPlayed}
            `;
            list.appendChild(li);
        }
    });
}
function loadRanking() {
    const saved = localStorage.getItem("ranking");
    if (saved) {
        ranking = JSON.parse(saved).map(player => {
            // Garante que bestScore está correto
            if (!player.bestScore || typeof player.bestScore !== "number") {
                player.bestScore = Infinity;
            }

            // Corrige worstScore se estiver ausente ou inválido
            if (
                player.worstScore === undefined ||
                player.worstScore === null ||
                typeof player.worstScore !== "number"
            ) {
                player.worstScore = player.bestScore; // assume o bestScore como pior
            }

            return player;
        });
    } else {
        ranking = [];
    }

    ranking = ranking.filter(player => player.name.trim() !== "");
    updateRanking();
}

// Enter automático nos campos
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const activeElement = document.activeElement;

        if (activeElement.id === 'playerName') {
            event.preventDefault();
            document.querySelector('#nameSection button').click();
        }

        if (activeElement.id === 'guessInput') {
            event.preventDefault();
            document.querySelector('#gameSection button').click();
        }

        if (activeElement.tagName === 'BUTTON') {
            activeElement.click();
        }
    }
});
function adicionarAoRanking(nome, pontuacao) {
    if (
        typeof nome !== "string" ||
        nome.trim() === "" ||
        typeof pontuacao !== "number" ||
        isNaN(pontuacao) ||
        pontuacao <= 0
    ) {
        alert("Nome ou pontuação inválida.");
        return;
    }

    nome = nome.trim().toLowerCase();

    let jogadorExistente = ranking.find(p => p.name === nome);

    if (jogadorExistente) {
        alert("Este nome já está no ranking. Use um nome diferente.");
        return;
    }

    // ✅ Cria novo jogador com pontuação atual
    ranking.push({
        name: nome,
        bestScore: pontuacao,
        worstScore: pontuacao,
        gamesPlayed: 1
    });

    localStorage.setItem("ranking", JSON.stringify(ranking));
    updateRanking();
}

function apagarRanking() {
    if (confirm("Tem certeza que deseja apagar todo o ranking?")) {
        localStorage.removeItem("ranking");
        ranking = [];
        updateRanking();
    }
}

