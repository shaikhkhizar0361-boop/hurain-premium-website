// ===============================
// HURAIN WEBSITE - MAIN SCRIPT
// ===============================

let cart = [];


// -------------------------------
// DEMO PRODUCTS
// -------------------------------
// अभी ये demo products हैं.
// बाद में इन्हें Supabase/Admin products से replace करेंगे.

const products = [
  {
    id: 1,
    name: "Luxury Jewellery Set",
    category: "Jewellery",
    price: 1499,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Premium Beauty Collection",
    category: "Cosmetics",
    price: 999,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Elegant Bangles Set",
    category: "Bangles",
    price: 799,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Luxury Perfume",
    category: "Perfumes",
    price: 1299,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Premium Hand Bag",
    category: "Hand Bags",
    price: 1799,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Luxury Accessories",
    category: "Accessories",
    price: 699,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80"
  }
];


// -------------------------------
// LOAD PRODUCTS
// -------------------------------

function loadProducts() {

  const productGrid = document.getElementById("product-grid");

  if (!productGrid) return;

  productGrid.innerHTML = "";

  products.forEach(product => {

    const productCard = document.createElement("div");

    productCard.className = "product-card";

    productCard.innerHTML = `
      <img
        src="${product.image}"
        alt="${product.name}"
        loading="lazy"
      >

      <div class="product-info">

        <div class="product-category">
          ${product.category}
        </div>

        <h3>${product.name}</h3>

        <div class="product-price">
          ₹${product.price.toLocaleString("en-IN")}
        </div>

        <button
          class="add-cart"
          onclick="addToCart(${product.id})"
        >
          ADD TO CART
        </button>

      </div>
    `;

    productGrid.appendChild(productCard);

  });
}


// -------------------------------
// ADD TO CART
// -------------------------------

function addToCart(productId) {

  const product = products.find(
    item => item.id === productId
  );

  if (!product) return;

  const existingProduct = cart.find(
    item => item.id === productId
  );

  if (existingProduct) {

    existingProduct.quantity += 1;

  } else {

    cart.push({
      ...product,
      quantity: 1
    });

  }

  updateCart();

  openCart();

}


// -------------------------------
// UPDATE CART
// -------------------------------

function updateCart() {

  const cartCount =
    document.getElementById("cart-count");

  const cartItems =
    document.getElementById("cart-items");

  const cartTotal =
    document.getElementById("cart-total");


  const totalQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );


  const totalPrice = cart.reduce(
    (total, item) =>
      total + (item.price * item.quantity),
    0
  );


  if (cartCount) {
    cartCount.textContent = totalQuantity;
  }


  if (cartTotal) {
    cartTotal.textContent =
      totalPrice.toLocaleString("en-IN");
  }


  if (!cartItems) return;


  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p>Your cart is empty.</p>
    `;

    return;
  }


  cartItems.innerHTML = "";


  cart.forEach(item => {

    const cartItem =
      document.createElement("div");

    cartItem.className = "cart-item";


    cartItem.innerHTML = `

      <div>

        <strong>${item.name}</strong>

        <br>

        <small>
          ₹${item.price.toLocaleString("en-IN")}
          × ${item.quantity}
        </small>

      </div>

      <button
        onclick="removeFromCart(${item.id})"
        style="
          background:none;
          border:none;
          color:#d6ad55;
          cursor:pointer;
        "
      >
        Remove
      </button>

    `;


    cartItems.appendChild(cartItem);

  });

}


// -------------------------------
// REMOVE FROM CART
// -------------------------------

function removeFromCart(productId) {

  cart = cart.filter(
    item => item.id !== productId
  );

  updateCart();

}


// -------------------------------
// OPEN CART
// -------------------------------

function openCart() {

  const overlay =
    document.getElementById("cart-overlay");

  if (overlay) {
    overlay.classList.add("active");
  }

}


// -------------------------------
// CLOSE CART
// -------------------------------

function closeCart() {

  const overlay =
    document.getElementById("cart-overlay");

  if (overlay) {
    overlay.classList.remove("active");
  }

}


// -------------------------------
// WHATSAPP ORDER
// -------------------------------

function orderOnWhatsApp() {

  if (cart.length === 0) {

    alert("Your cart is empty.");

    return;
  }


  let message =
    "Assalamualaikum HURAIN,%0A%0A";

  message +=
    "I want to place an order:%0A%0A";


  cart.forEach(item => {

    message +=
      `• ${item.name} × ${item.quantity} - ₹${item.price * item.quantity}%0A`;

  });


  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );


  message +=
    `%0ATotal: ₹${total}%0A%0A`;

  message +=
    "Please confirm my order.";


  const whatsappNumber =
    "919921181213";


  const url =
    `https://wa.me/${whatsappNumber}?text=${message}`;


  window.open(url, "_blank");

}


// -------------------------------
// CLOSE CART WHEN CLICKING OUTSIDE
// -------------------------------

document.addEventListener(
  "click",
  function(event) {

    const overlay =
      document.getElementById("cart-overlay");

    const panel =
      document.querySelector(".cart-panel");

    const cartButton =
      document.querySelector(".cart-button");


    if (
      overlay &&
      overlay.classList.contains("active") &&
      !panel.contains(event.target) &&
      !cartButton.contains(event.target)
    ) {

      closeCart();

    }

  }
);


// -------------------------------
// START WEBSITE
// -------------------------------

document.addEventListener(
  "DOMContentLoaded",
  function() {

    loadProducts();

    updateCart();

  }
);
