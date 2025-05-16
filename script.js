// Timer de 10 minutos
let timer = 10 * 60;
const countdown = document.getElementById('countdown');

function updateTimer() {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  countdown.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (timer > 0) {
    timer--;
  } else {
    countdown.textContent = "Oferta Expirada";
    document.querySelector(".pay-button").disabled = true;
    document.querySelector(".pay-button").innerText = "Tempo esgotado";
  }
}

updateTimer();
setInterval(updateTimer, 1000);
