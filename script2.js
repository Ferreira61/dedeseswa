window.onload = function () {
  const countdownElement = document.getElementById("countdown");
  if (countdownElement) {
    let timeLeft = 300;
    const interval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(interval);
        countdownElement.textContent = "Tempo esgotado!";
      } else {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        countdownElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        timeLeft--;
      }
    }, 1000);
  }

  const cartButton = document.getElementById("cart-button");
  const cartCount = document.getElementById("cart-count");
  const cartList = document.getElementById("cart-list");
  const cartItemsUl = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const paymentLink = document.getElementById("payment-link");
  const copyLinkBtn = document.getElementById("copy-link-btn");
  const notification = document.getElementById("copy-notification");

  const originalCourse = { name: "Curso Principal", price: 30.0, removable: false };
  let cart = [originalCourse];

  const paymentLinks = {
    0: "00020126580014BR.GOV.BCB.PIX013602082fe8-8c36-4c7b-a946-47ddb039fbfa520400005303986540530.005802BR5925Carlos Eduardo Pinheiro d6009SAO PAULO62140510LWZtSG6417630425BE",
    1: "00020126580014BR.GOV.BCB.PIX013602082fe8-8c36-4c7b-a946-47ddb039fbfa520400005303986540540.005802BR5925Carlos Eduardo Pinheiro d6009SAO PAULO62140510nEkmZMOOgc6304D3DA",
    2: "00020126580014BR.GOV.BCB.PIX013602082fe8-8c36-4c7b-a946-47ddb039fbfa520400005303986540550.005802BR5925Carlos Eduardo Pinheiro d6009SAO PAULO62140510Vb2bMXyna263048075",
    3: "00020126580014BR.GOV.BCB.PIX013602082fe8-8c36-4c7b-a946-47ddb039fbfa520400005303986540560.005802BR5925Carlos Eduardo Pinheiro d6009SAO PAULO62140510YmmdUZbjt56304DB18",
  };

  function showNotification() {
    if (notification) {
      notification.classList.add("show");
      setTimeout(() => {
        notification.classList.remove("show");
      }, 2500);
    }
  }

  function updateCart() {
    cartCount.textContent = cart.length;

    cartItemsUl.innerHTML = "";
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "cart-item";

      const itemName = document.createElement("span");
      itemName.className = "item-name";
      itemName.textContent = `${item.name} - R$${item.price.toFixed(2)}`;
      li.appendChild(itemName);

      if (item.removable !== false) {
        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.textContent = "❌";
        removeBtn.title = "Remover do carrinho";

        removeBtn.addEventListener("click", () => {
          cart.splice(index, 1);
          updateCart();
        });

        li.appendChild(removeBtn);
      }

      cartItemsUl.appendChild(li);
    });

    const totalValue = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `Total: R$${totalValue.toFixed(2)}`;

    const adicionaisCount = cart.filter(item => item.removable !== false).length;
    const countForLink = adicionaisCount > 3 ? 3 : adicionaisCount;
    const urlPagamento = paymentLinks[countForLink] || paymentLinks[0];

    if (paymentLink) {
      paymentLink.href = urlPagamento;
      paymentLink.textContent = `Pagar R$${(30 + adicionaisCount * 10).toFixed(2)} com QR Code`;
    }

    // Atualiza função do botão "Copiar link"
    if (copyLinkBtn) {
      copyLinkBtn.onclick = () => {
        navigator.clipboard.writeText(urlPagamento)
          .then(() => showNotification())
          .catch(() => alert("Erro ao copiar a chave Pix."));
      };
    }
  }

  if (cartButton && cartList) {
    cartButton.addEventListener("click", () => {
      cartList.classList.toggle("show");
    });
  }

  const addButtons = document.querySelectorAll(".add-to-cart");
  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const courseItem = btn.closest(".course-item");
      const name = courseItem.getAttribute("data-name");
      const price = parseFloat(courseItem.getAttribute("data-price"));

      const alreadyInCart = cart.some((item) => item.name === name);
      if (alreadyInCart) {
        alert(`"${name}" já está no carrinho!`);
        return;
      }

      cart.push({ name, price, removable: true });
      updateCart();

      alert(`"${name}" adicionado ao carrinho!`);
    });
  });

  updateCart();
};
