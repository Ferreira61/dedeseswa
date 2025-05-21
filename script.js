// script.js

const cartButton = document.getElementById("cart-button");
const cartCount = document.getElementById("cart-count");
const cartContainer = document.getElementById("cart-container");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const notification = document.getElementById("notification");

const baseCourse = {
  name: "Curso principal: Python para iniciantes",
  price: 30,
};

let cart = [
  { ...baseCourse } // O curso principal sempre no carrinho, sem remoção
];

// Função para formatar preço em BRL
function formatPrice(value) {
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

// Atualiza a contagem no botão do carrinho
function updateCartCount() {
  // 1 + quantidade de adicionais
  cartCount.textContent = cart.length;
}

// Atualiza o total no rodapé do carrinho
function updateCartTotal() {
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  cartTotal.textContent = `Total: ${formatPrice(total)}`;
}

// Atualiza a lista no carrinho
function renderCartItems() {
  // Limpa a lista
  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.dataset.name = item.name;
    li.dataset.price = item.price;
    // Span com nome
    const spanName = document.createElement("span");
    spanName.textContent = item.name;
    li.appendChild(spanName);

    // Span com preço
    const spanPrice = document.createElement("span");
    spanPrice.textContent = formatPrice(item.price);
    li.appendChild(spanPrice);

    // Só adiciona botão remover para itens adicionais
    if (index !== 0) {
      const removeBtn = document.createElement("button");
      removeBtn.classList.add("remove-btn");
      removeBtn.textContent = "Remover";
      removeBtn.setAttribute("aria-label", `Remover ${item.name} do carrinho`);
      removeBtn.onclick = () => {
        removeFromCart(index);
      };
      li.appendChild(removeBtn);
    }
    cartItems.appendChild(li);
  });
}

// Remove um item do carrinho pelo índice
function removeFromCart(index) {
  const removed = cart.splice(index, 1)[0];
  renderCartItems();
  updateCartCount();
  updateCartTotal();
  showNotification(`Removido: ${removed.name}`, false);
}

// Adiciona um item no carrinho
function addToCart(name, price) {
  // Verifica se já está no carrinho
  if (cart.some(item => item.name === name)) {
    showNotification(`Já está no carrinho: ${name}`, true);
    return;
  }
  cart.push({ name, price });
  renderCartItems();
  updateCartCount();
  updateCartTotal();
  showNotification(`Adicionado: ${name}`, true);

  // Anima botão
  cartButton.classList.remove("bump");
  void cartButton.offsetWidth; // Trigger reflow para reiniciar a animação
  cartButton.classList.add("bump");
}

// Mostra notificação com mensagem
function showNotification(message, success = true) {
  notification.textContent = message;
  notification.style.backgroundColor = success ? "#27ae60" : "#e74c3c";
  notification.style.opacity = "1";

  clearTimeout(notification.timeout);
  notification.timeout = setTimeout(() => {
    notification.style.opacity = "0";
  }, 3000);
}

// Alterna visibilidade do carrinho ao clicar no botão
cartButton.addEventListener("click", () => {
  if (cartContainer.style.display === "flex") {
    cartContainer.style.display = "none";
  } else {
    cartContainer.style.display = "flex";
  }
});

// Adiciona evento aos botões "Adicionar"
document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", () => {
    const courseItem = btn.closest(".course-item");
    const name = courseItem.dataset.name;
    const price = parseFloat(courseItem.dataset.price);
    addToCart(name, price);
  });
});

// Inicializa carrinho e UI
renderCartItems();
updateCartCount();
updateCartTotal();
