function startCountdown(duration, display) {
    let timer = duration, minutes, seconds;
    const countdownInterval = setInterval(function () {
      minutes = Math.floor(timer / 60);
      seconds = timer % 60;
  
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
  
      display.textContent = minutes + ":" + seconds;
  
      if (--timer < 0) {
        clearInterval(countdownInterval);
        display.textContent = "00:00";
      }
    }, 1000);
  }
  
  window.onload = function () {
    const tenMinutes = 60 * 10;
    const display = document.getElementById('countdown');
    startCountdown(tenMinutes, display);
  
    const copyBtn = document.getElementById('copy-btn');
    const notification = document.getElementById('notification');
    const paymentLink = "https://seulinkdepagamento.com/pague-agora"; // seu link de pagamento real aqui
  
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(paymentLink).then(() => {
        notification.classList.add('show');
  
        setTimeout(() => {
          notification.classList.remove('show');
        }, 2500);
      }).catch(err => {
        alert('Erro ao copiar o link. Tente manualmente.');
      });
    });
  };
  