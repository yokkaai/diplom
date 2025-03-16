let cart = []; // Масив для збереження товарів

// Завантаження кошика з LocalStorage при завантаженні сторінки
window.onload = function() {
  loadCartFromLocalStorage();
};

// Оновлення кількості товарів на значку кошика
function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0); // Підрахунок загальної кількості товарів
  $('#cart-count').text(cartCount); // Оновлення індикатора на іконці
}

// Оновлення контенту в модальному вікні
function updateCartModal() {
  const cartContainer = document.getElementById('cartItemsContainer');
  const totalPriceElement = document.getElementById('totalPrice');
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p class="text-center" id="emptyCartMessage">Кошик порожній</p>';
    totalPriceElement.innerText = '0';
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    cartContainer.innerHTML += `
      <div class="d-flex align-items-center justify-content-between border-bottom py-2">
        <img src="${item.image}" alt="${item.name}" class="img-fluid" style="width: 50px; height: 50px;">
        <div class="flex-grow-1 mx-2">
          <p class="mb-1">${item.name}</p>
          <p class="fw-bold">${item.price * item.quantity}₴</p>
        </div>
        <div class="d-flex align-items-center">
          <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${index}, -1)">-</button>
          <span class="mx-2">${item.quantity}</span>
          <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${index}, 1)">+</button>
        </div>
      </div>
    `;
  });

  totalPriceElement.innerText = total;
}

// Оновлення кількості товару в кошику
function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1); // Видаляємо товар, якщо його кількість <= 0
  }
  updateCartCount(); // Оновлюємо кількість на значку кошика
  updateCartModal(); // Оновлюємо контент у модальному вікні
  saveCartToLocalStorage(); // Зберігаємо оновлений кошик в LocalStorage
}

// Додавання товару в кошик
document.querySelectorAll('.addbasket').forEach(button => {
  button.addEventListener('click', function() {
    const productContainer = this.closest('.textprod');
    const productName = productContainer.querySelector('h4').innerText;
    const productPrice = parseInt(productContainer.querySelector('.text-danger').innerText.replace('₴', ''));
    const productImage = productContainer.previousElementSibling.querySelector('img').src;
    
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ name: productName, price: productPrice, quantity: 1, image: productImage });
    }
    
    updateCartCount(); // Оновлюємо кількість на значку кошика
    updateCartModal(); // Оновлюємо модальне вікно
    saveCartToLocalStorage(); // Зберігаємо кошик в LocalStorage
  });
});

// Відкриття модального вікна кошика
document.querySelector('.bi-cart').addEventListener('click', () => {
  updateCartModal(); // Оновлюємо контент модалки перед її відкриттям
  new bootstrap.Modal(document.getElementById('cartModal')).show(); // Відкриваємо модалку
});

// Збереження кошика в LocalStorage
function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart)); // Зберігаємо кошик у LocalStorage
}

// Завантаження кошика з LocalStorage
function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart); // Завантажуємо кошик з LocalStorage
  }
  updateCartCount(); // Оновлюємо кількість товарів на значку кошика
  updateCartModal(); // Оновлюємо контент в модальному вікні
}



// повідомлення про успішний +товар

function showSuccessMessage() {
  // Отримуємо елемент для повідомлення
  var successMessage = document.getElementById("successMessage");
  
  // Показуємо повідомлення
  successMessage.style.display = "block";
  
  // Приховуємо повідомлення через 3 секунди
  setTimeout(function() {
    successMessage.style.display = "none";
  }, 3000);
}

// Зміна поля доставки в залежності від вибору
document.getElementById('deliveryChoice').addEventListener('change', function () {
  if (this.value === 'novaPoshta') {
      document.getElementById('novaPoshtaFields').style.display = 'block';
      document.getElementById('ukrPostFields').style.display = 'none';
  } else if (this.value === 'ukrPost') {
      document.getElementById('novaPoshtaFields').style.display = 'none';
      document.getElementById('ukrPostFields').style.display = 'block';
  } else {
      document.getElementById('novaPoshtaFields').style.display = 'none';
      document.getElementById('ukrPostFields').style.display = 'none';
  }
});

// Обробка підтвердження замовлення
document.getElementById('confirmOrderButton').addEventListener('click', function () {
  var paymentChoice = document.querySelector('input[name="paymentChoice"]:checked').value;
  if (paymentChoice === 'payNow') {
      // Показати модальне вікно успішної оплати
      var paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
      paymentModal.show();
  } else if (paymentChoice === 'payUponReceiving') {
      // Показати модальне вікно підтвердження при отриманні
      var paymentUponReceivingModal = new bootstrap.Modal(document.getElementById('paymentUponReceivingModal'));
      paymentUponReceivingModal.show();
  }
});

// Перехід на головну сторінку
document.getElementById('goToHomePageButton').addEventListener('click', function () {
  window.location.href = 'golovna.html';
});

document.getElementById('goToHomePageUponReceivingButton').addEventListener('click', function () {
  window.location.href = 'golovna.html';
});