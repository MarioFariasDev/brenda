// Função para iniciar o timer de 60s por exercício
function iniciarTimer(id) {
    let seconds = 60;
    const timerDiv = document.getElementById(`timer-${id}`);
    timerDiv.textContent = `⏳ Tempo restante: ${seconds}s`;

    const countdown = setInterval(() => {
        seconds--;
        if (seconds <= 0) {
            clearInterval(countdown);
            timerDiv.textContent = "✅ Tempo finalizado!";
        } else {
            timerDiv.textContent = `⏳ Tempo restante: ${seconds}s`;
        }
    }, 1000);
}

// Função para marcar o exercício como concluído
function marcarConcluido(id) {
    const linha = document.getElementById(`ex-${id}`);
    linha.classList.add("concluido");
    const statusSpan = linha.querySelector(".status");
    if (statusSpan) {
        statusSpan.textContent = "✔️ Concluído";
        statusSpan.style.color = "#0f0";
    }
}

// Envio de relatório via WhatsApp
function enviarRelatorio() {
    const mensagem = `Treino semanal concluído! Semana 1 - Matheus Vinícius`;
    const url = `https://wa.me/5592984413665?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}
