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
    const paymentLink = "00020126580014BR.GOV.BCB.PIX013602082fe8-8c36-4c7b-a946-47ddb039fbfa52040000530398654041.005802BR5925Carlos Eduardo Pinheiro d6009SAO PAULO62140510iC2dXdQp4v6304C664"; // seu link de pagamento real aqui
  
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
  