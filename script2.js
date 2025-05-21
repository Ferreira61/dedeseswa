// Função para o contador regressivo
function startCountdown(duration, display) {
  let timer = duration,
    minutes,
    seconds;
  const countdownInterval = setInterval(function () {
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(countdownInterval);
      display.textContent = "00:00";
    }
  }, 1000);
}

window.onload = function () {
  // Contador
  const tenMinutes = 60 * 10;
  const display = document.getElementById("countdown");
  startCountdown(tenMinutes, display);

  // Copiar link
  const copyBtn = document.getElementById("copy-btn");
  const notification = document.getElementById("notification");
  const paymentLink =
    "00020126580014BR.GOV.BCB.PIX013602082fe8-8c36-4c7b-a946-47ddb039fbfa52040000530398654041.005802BR5925Carlos Eduardo Pinheiro d6009SAO PAULO62140510iC2dXdQp4v6304C664"; // seu link real aqui

  copyBtn.addEventListener("click", () => {
    navigator.clipboard
      .writeText(paymentLink)
      .then(() => {
        notification.classList.add("show");
        setTimeout(() => {
          notification.classList.remove("show");
        }, 2500);
      })
      .catch((err) => {
        alert("Erro ao copiar o link. Tente manualmente.");
      });
  });

  // === CARRINHO ===

  // Elementos do carrinho
  const cartButton = document.getElementById("cart-button");
  const cartCount = document.getElementById("cart-count");
  const cartList = document.getElementById("cart-list");
  const cartItemsUl = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  let cart = [];

  // Função para atualizar o carrinho na tela
  function updateCart() {
    // Atualiza contador no botão
    cartCount.textContent = cart.length;

    // Limpa lista
    cartItemsUl.innerHTML = "";

    // Preenche lista de itens
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - R$${item.price.toFixed(2)}`;

      // Botão remover
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "❌";
      removeBtn.title = "Remover do carrinho";
      removeBtn.style.marginLeft = "10px";
      removeBtn.style.cursor = "pointer";
      removeBtn.style.background = "none";
      removeBtn.style.border = "none";
      removeBtn.style.color = "#e74c3c";
      removeBtn.style.fontSize = "1.1rem";

      removeBtn.addEventListener("click", () => {
        cart.splice(index, 1);
        updateCart();
      });

      li.appendChild(removeBtn);
      cartItemsUl.appendChild(li);
    });

    // Atualiza total
    const totalValue = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `Total: R$${totalValue.toFixed(2)}`;

    // Se vazio, esconde lista
    if (cart.length === 0) {
      cartList.classList.add("hidden");
      cartCount.textContent = "0";
    }
  }

  // Mostrar/ocultar carrinho ao clicar no botão flutuante
  cartButton.addEventListener("click", () => {
    cartList.classList.toggle("hidden");
  });

  // Adicionar itens ao carrinho - pega todos os botões com .add-to-cart
  const addButtons = document.querySelectorAll(".add-to-cart");
  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const courseItem = btn.closest(".course-item");
      const name = courseItem.getAttribute("data-name");
      const price = parseFloat(courseItem.getAttribute("data-price"));

      cart.push({ name, price });
      updateCart();

      // Mostrar notificação simples
      alert(`"${name}" adicionado ao carrinho!`);
    });
  });

  // Inicializa carrinho
  updateCart();
};
