const treinos = [
  {
    dia: "DIA 1 – Inferiores (Glúteos + Posterior)",
    tecnica: "Drop-set + Isometria",
    objetivo: "Estímulo profundo em glúteos e posteriores",
    exercicios: [
      ["Cadeira flexora", "3", "10 + drop de 10 + isometria 15s", "Isolado posterior"],
      ["Stiff com halteres", "3", "12", "Cadência 3s descida"],
      ["Elevação pélvica com barra", "4", "12", "Última com isometria 20s"],
      ["Cadeira abdutora", "3", "15 + 15", "Drop-set"],
      ["Glúteo no cabo", "3", "12 cada perna", "Concentração total"]
    ]
  },
  {
    dia: "DIA 2 – Superiores (Costas + Ombros + Braços)",
    tecnica: "Bi-set + Cadência",
    objetivo: "Trabalhar força e resistência com volume moderado",
    exercicios: [
      ["Puxada frente aberta + Remada baixa", "3", "12 + 12", "Bi-set costas"],
      ["Desenvolvimento com halteres + Elevação lateral", "3", "10 + 12", "Bi-set ombros"],
      ["Rosca direta barra + Rosca martelo alternada", "3", "10 + 12", "Bi-set bíceps"],
      ["Tríceps testa + Tríceps corda", "3", "12 + 12", "Bi-set tríceps"],
      ["Prancha isométrica", "3", "40s", "Core"]
    ]
  },
  {
    dia: "DIA 3 – Quadríceps + Core",
    tecnica: "Pirâmide crescente",
    objetivo: "Foco total em quadríceps com intensidade progressiva",
    exercicios: [
      ["Agachamento Smith", "4", "15/12/10/8", "Carga progressiva"],
      ["Cadeira extensora", "3", "15/12/10", "Cadência 2s subida"],
      ["Avanço com halteres", "3", "12 cada perna", "Estabilidade e controle"],
      ["Abdominal canivete", "3", "20", "Core reto"],
      ["Prancha com elevação alternada", "3", "30s", "Core lateral"]
    ]
  },
  {
    dia: "DIA 4 – Full Body Metabólico + Glúteos",
    tecnica: "Circuito",
    objetivo: "Ativação total com gasto calórico e resistência",
    exercicios: [
      ["Agachamento com halteres", "3", "15", "Sem descanso"],
      ["Flexão de braço", "3", "12", "Controle"],
      ["Remada curvada halter", "3", "15", "Respiração"],
      ["Stiff com halter", "3", "15", "Foco posterior"],
      ["Abdominal prancha escalador", "3", "30s", "Core + cardio"]
    ]
  },
  {
    dia: "DIA 5 – Inferiores ênfase Glúteos",
    tecnica: "Rest-pause + Contração máxima",
    objetivo: "Isolamento e ativação final potente de glúteos",
    exercicios: [
      ["Cadeira abdutora", "3", "15 + 10 + 10 (rest)", "Contração máxima"],
      ["Elevação pélvica unilateral", "3", "12 cada perna", "Foco total glúteo"],
      ["Glúteo 4 apoios caneleira", "3", "15 cada perna", "Amplitude total"],
      ["Extensão de quadril na máquina", "3", "12 + isometria 15s", "Fechamento intenso"],
      ["Abdominal infra solo", "3", "20", "Core final"]
    ]
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
