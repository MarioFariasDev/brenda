const treinos = [
    {
        dia: "DIA 1 – Full Body",
        tecnica: "Bi-set",
        objetivo: "Gasto calórico com ativação total",
        exercicios: [
            ["Agachamento com halteres", "3", "15", "Bi-set", "Junto com flexão de braços"],
            ["Flexão de braços", "3", "10", "Bi-set", "-"],
            ["Avanço alternado", "3", "10 cada perna", "Bi-set", "Junto com remada curvada"],
            ["Remada curvada", "3", "12", "Bi-set", "-"],
            ["Elevação pélvica", "3", "15", "Bi-set", "Junto com prancha com toques"],
            ["Prancha com toques no ombro", "3", "30 seg", "Bi-set", "-"],
            ["Abdominal infra", "3", "15", "Bi-set", "Junto com prancha lateral"],
            ["Prancha lateral alternada", "3", "20 seg", "Bi-set", "-"]
        ],
        cardio: "5–10min de escada ou caminhada leve"
    },
    {
        dia: "DIA 2 – Inferiores e Core",
        tecnica: "Bi-set",
        objetivo: "Foco em glúteos, pernas e abdômen",
        exercicios: [
            ["Agachamento sumô com halteres", "3", "15", "Bi-set", "Junto com stiff"],
            ["Stiff", "3", "12", "Bi-set", "-"],
            ["Passada no lugar", "3", "12", "Bi-set", "Junto com abdominal canivete"],
            ["Abdominal canivete", "3", "15", "Bi-set", "-"],
            ["Elevação de quadril unilateral", "3", "10 cada", "Bi-set", "Com elevação de perna deitada"],
            ["Elevação de perna deitada", "3", "15", "Bi-set", "-"],
            ["Prancha com elevação de perna alternada", "2", "20 seg", "Bi-set", "Com prancha frontal"],
            ["Prancha frontal", "2", "30 seg", "Bi-set", "-"]
        ],
        cardio: "5min de caminhada ou bike leve"
    },
    {
        dia: "DIA 3 – Superiores e Abdômen",
        tecnica: "Bi-set",
        objetivo: "Definição e resistência muscular",
        exercicios: [
            ["Desenvolvimento com halteres", "3", "12", "Bi-set", "Com rosca direta"],
            ["Rosca direta", "3", "12", "Bi-set", "-"],
            ["Tríceps banco", "3", "12", "Bi-set", "Com remada unilateral"],
            ["Remada unilateral", "3", "12", "Bi-set", "-"],
            ["Elevação lateral", "3", "15", "Bi-set", "Com rosca martelo"],
            ["Rosca martelo", "3", "12", "Bi-set", "-"],
            ["Abdominal remador", "3", "20", "Bi-set", "Com prancha com deslocamento"],
            ["Prancha com deslocamento", "3", "30 seg", "Bi-set", "-"]
        ],
        cardio: "5min de escada ou escadaria"
    },
    {
        dia: "DIA 4 – Cardio HIIT",
        tecnica: "Intervalado (HIIT)",
        objetivo: "Acelerar metabolismo e queima de gordura",
        exercicios: [
            ["Polichinelo", "-", "30 seg", "-", "-"],
            ["Corrida no lugar (joelho alto)", "-", "30 seg", "-", "-"],
            ["Burpee sem salto", "-", "30 seg", "-", "-"],
            ["Agachamento com salto", "-", "30 seg", "-", "-"],
            ["Mountain climber", "-", "30 seg", "-", "-"]
        ],
        cardio: "3 rodadas com 2min de descanso entre elas"
    },
    {
        dia: "DIA 5 – Funcional Full Body + Core",
        tecnica: "Bi-set",
        objetivo: "Encerrar a semana com estímulo completo e core",
        exercicios: [
            ["Agachamento com halteres", "3", "15", "Bi-set", "Com desenvolvimento com halteres"],
            ["Desenvolvimento com halteres", "3", "12", "Bi-set", "-"],
            ["Flexão com joelhos", "3", "12", "Bi-set", "Com remada baixa"],
            ["Remada baixa", "3", "15", "Bi-set", "-"],
            ["Avanço com rotação de tronco", "3", "10 cada", "Bi-set", "Com prancha com remada"],
            ["Prancha com remada alternada", "3", "12", "Bi-set", "-"],
            ["Abdominal bicicleta", "3", "20", "Bi-set", "Com prancha com toques"],
            ["Prancha com toques laterais", "3", "30 seg", "Bi-set", "-"]
        ],
        cardio: "Opcional: caminhada leve ou alongamento ativo"
    }
];


const treinoContainer = document.getElementById("treinoContainer");
const progresso = JSON.parse(localStorage.getItem("progresso") || "{}");

treinos.forEach((treino, i) => {
    const card = document.createElement("div");
    card.className = "card";

    let html = `
    <h2>${treino.dia}</h2>
    <p><strong>Técnica:</strong> ${treino.tecnica}</p>
    <p><strong>Objetivo:</strong> ${treino.objetivo}</p>
    <table class="exercise-table">
      <thead>
        <tr>
          <th>✔</th>
          <th>Exercício</th>
          <th>Séries</th>
          <th>Reps</th>
          <th>Técnica</th>
          <th>Obs</th>
          <th>Descanso</th>
        </tr>
      </thead>
      <tbody>
  `;

    treino.exercicios.forEach((ex, j) => {
        const key = `d${i}_e${j}`;
        const checked = progresso[key]?.feito ? "checked" : "";
        const doneClass = progresso[key]?.feito ? "done" : "";

        html += `
      <tr class="exercise-row ${doneClass}" data-key="${key}">
        <td><input type="checkbox" ${checked}></td>
        <td>${ex[0]}</td>
        <td>${ex[1]}</td>
        <td>${ex[2]}</td>
        <td>${ex[3]}</td>
        <td>${ex[4]}</td>
        <td>
          <button class="timer-btn" onclick="iniciarTimer(this)">⏱️</button>
          <span class="timer-display">00:00</span>
        </td>
      </tr>
    `;
    });

    html += `</tbody></table>`;
    if (treino.cardio) html += `<p><strong>Cardio:</strong> ${treino.cardio}</p>`;
    card.innerHTML = html;
    treinoContainer.appendChild(card);
});

document.querySelectorAll(".exercise-row input[type='checkbox']").forEach(input => {
    input.addEventListener("change", function () {
        const row = this.closest(".exercise-row");
        const key = row.dataset.key;
        const feito = this.checked;
        row.classList.toggle("done", feito);
        progresso[key] = { feito };
        localStorage.setItem("progresso", JSON.stringify(progresso));
    });
});

function iniciarTimer(btn) {
    const span = btn.nextElementSibling;
    let tempo = 60;
    span.textContent = formatar(tempo);
    btn.disabled = true;

    const intervalo = setInterval(() => {
        tempo--;
        span.textContent = formatar(tempo);
        if (tempo <= 0) {
            clearInterval(intervalo);
            btn.disabled = false;
            span.textContent = "✔️";
        }
    }, 1000);
}

function formatar(s) {
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${m}:${sec}`;
}

const feedback = document.getElementById("feedback");
const feedbackSalvo = localStorage.getItem("feedbackGlobal");
if (feedbackSalvo) feedback.value = feedbackSalvo;

document.getElementById("salvarFeedback").addEventListener("click", () => {
    localStorage.setItem("feedbackGlobal", feedback.value);
    alert("Feedback salvo com sucesso!");
});

document.getElementById("darkToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
