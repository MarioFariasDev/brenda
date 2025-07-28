const treinos = [
  {
    dia: "DIA 1 – Inferiores (Glúteo + Posterior)",
    tecnica: "Bi-set + Isometria",
    objetivo: "Ativar profundamente glúteos e posteriores",
    exercicios: [
      ["Mesa flexora + Stiff com halteres", "3", "12 + 12", "Bi-set e controle"],
      ["Glúteo na polia", "3", "15 cada perna", "Isometria 10s na última repetição"],
      ["Cadeira abdutora", "3", "20", "Cadência lenta e constante"],
      ["Elevação pélvica com barra", "4", "12", "Contração máxima + 10s isometria"],
      ["Prancha com elevação de perna", "3", "30s", "Core + glúteo"]
    ]
  },
  {
    dia: "DIA 2 – Superiores (Costas + Ombro + Braços)",
    tecnica: "Drop-set + Cadência",
    objetivo: "Desenvolver resistência e definição",
    exercicios: [
      ["Puxada frente + Remada unilateral", "3", "12 + 12", "Bi-set costas"],
      ["Elevação lateral + Elevação frontal", "3", "15 + 15", "Bi-set ombro"],
      ["Rosca direta barra", "3", "12, 10, 8 + drop", "Foco no controle"],
      ["Tríceps corda", "3", "15", "Descanso curto"],
      ["Prancha isométrica", "3", "40s", "Resistência de core"]
    ]
  },
  {
    dia: "DIA 3 – Inferiores (Quadríceps + Glúteo)",
    tecnica: "Pirâmide crescente",
    objetivo: "Força e volume com foco no quadríceps",
    exercicios: [
      ["Agachamento guiado", "4", "15/12/10/8", "Carga crescente"],
      ["Cadeira extensora", "3", "15", "3s na contração"],
      ["Afundo no Smith", "3", "12 cada perna", "Estabilidade e foco no glúteo"],
      ["Elevação pélvica com peso", "3", "12", "Contração total"],
      ["Abdominal oblíquo", "3", "20", "Core lateral"]
    ]
  },
  {
    dia: "DIA 4 – Full Body HIIT (Cardio + Muscular)",
    tecnica: "Circuito funcional",
    objetivo: "Acelerar metabolismo e manter condicionamento",
    exercicios: [
      ["Agachamento com salto", "3", "15", "Explosão"],
      ["Mountain climber", "3", "30s", "Alta intensidade"],
      ["Flexão de braço no solo", "3", "12", "Resistência"],
      ["Avanço alternado com halteres", "3", "20", "Sem pausa"],
      ["Abdominal bicicleta", "3", "30s", "Ativação core"]
    ]
  },
  {
    dia: "DIA 5 – Glúteos isolados + Core final",
    tecnica: "Foco unilateral + Contração máxima",
    objetivo: "Finalizar a semana com ênfase glútea e abdominal",
    exercicios: [
      ["Glúteo 4 apoios com caneleira", "3", "15 cada", "Amplitude máxima"],
      ["Cadeira abdutora", "3", "15 + isometria 15s", "Contração consciente"],
      ["Extensão de quadril na máquina", "3", "12", "Pausa no pico da contração"],
      ["Abdominal infra com elevação de quadril", "3", "20", "Foco no baixo ventre"],
      ["Prancha com deslocamento lateral", "3", "30s", "Resistência core"]
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
