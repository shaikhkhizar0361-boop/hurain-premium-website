// ==========================================
// HURAIN - WEBSITE SCRIPT
// ==========================================

let cart = [];

let activeCategory = "all";


// ==========================================
// DEMO PRODUCTS
// ==========================================

const products = [

  {
    id: 1,
    name: "Luxury Jewellery Set",
    category: "Jewellery",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 2,
    name: "Premium Beauty Collection",
    category: "Cosmetics",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 3,
    name: "Elegant Bangles Set",
    category: "Bangles",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 4,
    name: "Luxury Perfume",
    category: "Perfumes",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 5,
    name: "Premium Hand Bag",
    category: "Hand Bags",
    price: 1799,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 6,
    name: "Luxury Accessories",
    category: "Accessories",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80"
  }

];


// ==========================================
// LOAD PRODUCTS
// ==========================================

function loadProducts() {

  const productGrid =
    document.getElementById("product-grid");

  if (!productGrid) return;


  let filteredProducts = products;


  if (activeCategory !== "all") {

    filteredProducts =
      products.filter(
        product =>
          product.category === activeCategory
      );

  }


  if (filteredProducts.length === 0) {

    productGrid.innerHTML = `

      <div class="empty-products">

        <div>✨</div>

        <h3>
          No Products Available
        </h3>

        <p>
          Products in this category will appear here.
        </p>

      </div>

    `;

    return;

  }


  productGrid.innerHTML = "";


  filteredProducts.forEach(product => {

    const card =
      document.createElement("div");

    card.className =
      "product-card";


    card.innerHTML = `

      <img
        src="${product.image}"
        alt="${escapeHtml(product.name)}"
        loading="lazy"
      >

      <div class="product-info">

        <div class="product-category">
          ${escapeHtml(product.category)}
        </div>

        <h3>
          ${escapeHtml(product.name)}
        </h3>

        <div class="product-price">
          ₹${formatPrice(product.price)}
        </div>

        <button
          type="button"
          class="add-cart"
          onclick="addToCart(${product.id})"
        >
          ADD TO CART
        </button>

      </div>

    `;


    productGrid.appendChild(card);

  });

}


// ==========================================
// FILTER PRODUCTS
// ==========================================

function filterProducts(category) {

  activeCategory =
    category || "all";


  const filterText =
    document.getElementById("category-filter");


  if (filterText) {

    if (activeCategory === "all") {

      filterText.textContent =
        "Showing All Products";

    } else {

      filterText.textContent =
        "Showing " +
        activeCategory +
        " Products";

    }

  }


  loadProducts();


  const productsSection =
    document.getElementById("products");


  if (productsSection) {

    setTimeout(() => {

      productsSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }, 50);

  }

}


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(productId) {

  const product =
    products.find(
      item => item.id === productId
    );


  if (!product) {

    alert("Product not found.");

    return;

  }


  const existing =
    cart.find(
      item => item.id === productId
    );


  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({

      id: product.id,

      name: product.name,

      category: product.category,

      price: product.price,

      image: product.image,

      quantity: 1

    });

  }


  updateCart();


  openCart();

}


// ==========================================
// INCREASE QUANTITY
// ==========================================

function increaseQuantity(productId) {

  const item =
    cart.find(
      product => product.id === productId
    );


  if (!item) return;


  item.quantity += 1;


  updateCart();

}


// ==========================================
// DECREASE QUANTITY
// ==========================================

function decreaseQuantity(productId) {

  const item =
    cart.find(
      product => product.id === productId
    );


  if (!item) return;


  if (item.quantity > 1) {

    item.quantity -= 1;

  } else {

    removeFromCart(productId);

    return;

  }


  updateCart();

}


// ==========================================
// REMOVE FROM CART
// ==========================================

function removeFromCart(productId) {

  cart =
    cart.filter(
      item => item.id !== productId
    );


  updateCart();

}


// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {

  const cartCount =
    document.getElementById("cart-count");

  const cartItems =
    document.getElementById("cart-items");

  const cartTotal =
    document.getElementById("cart-total");


  const totalQuantity =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );


  const totalPrice =
    cart.reduce(
      (total, item) =>
        total +
        item.price *
        item.quantity,
      0
    );


  if (cartCount) {

    cartCount.textContent =
      totalQuantity;

  }


  if (cartTotal) {

    cartTotal.textContent =
      formatPrice(totalPrice);

  }


  if (!cartItems) return;


  if (cart.length === 0) {

    cartItems.innerHTML = `

      <div class="empty-cart">

        <p>
          Your cart is empty.
        </p>

      </div>

    `;

    return;

  }


  cartItems.innerHTML = "";


  cart.forEach(item => {

    const cartItem =
      document.createElement("div");


    cartItem.className =
      "cart-item";


    cartItem.innerHTML = `

      <div class="cart-item-info">

        <strong>
          ${escapeHtml(item.name)}
        </strong>

        <small>
          ₹${formatPrice(item.price)}
        </small>

      </div>


      <div class="cart-item-actions">

        <button
          type="button"
          onclick="decreaseQuantity(${item.id})"
          aria-label="Decrease quantity"
        >
          −
        </button>

        <span>
          ${item.quantity}
        </span>

        <button
          type="button"
          onclick="increaseQuantity(${item.id})"
          aria-label="Increase quantity"
        >
          +
        </button>

      </div>


      <button
        type="button"
        onclick="removeFromCart(${item.id})"
      >
        Remove
      </button>

    `;


    cartItems.appendChild(cartItem);

  });

}


// ==========================================
// OPEN CART
// ==========================================

function openCart() {

  const overlay =
    document.getElementById("cart-overlay");


  if (!overlay) return;


  overlay.classList.add("active");


  document.body.style.overflow =
    "hidden";

}


// ==========================================
// CLOSE CART
// ==========================================

function closeCart() {

  const overlay =
    document.getElementById("cart-overlay");


  if (!overlay) return;


  overlay.classList.remove("active");


  document.body.style.overflow =
    "";

}


// ==========================================
// WHATSAPP ORDER
// ==========================================

function orderOnWhatsApp() {

  if (cart.length === 0) {

    alert(
      "Your cart is empty. Please add a product first."
    );

    return;

  }


  let message =
    "HURAIN NEW ORDER\n\n";


  cart.forEach(item => {

    message +=
      "Product: " +
      item.name +
      "\n";

    message +=
      "Quantity: " +
      item.quantity +
      "\n";

    message +=
      "Product Total: ₹" +
      formatPrice(
        item.price *
        item.quantity
      ) +
      "\n\n";

  });


  const grandTotal =
    cart.reduce(
      (total, item) =>
        total +
        item.price *
        item.quantity,
      0
    );


  message +=
    "Delivery: To Be Confirmed\n";

  message +=
    "Grand Total: ₹" +
    formatPrice(grandTotal);


  const encodedMessage =
    encodeURIComponent(message);


  const whatsappNumber =
    "919921181213";


  const whatsappURL =
    "https://wa.me/" +
    whatsappNumber +
    "?text=" +
    encodedMessage;


  window.open(
    whatsappURL,
    "_blank",
    "noopener,noreferrer"
  );

}


// ==========================================
// CLOSE CART WHEN CLICKING OUTSIDE
// ==========================================

document.addEventListener(
  "click",
  function(event) {

    const overlay =
      document.getElementById(
        "cart-overlay"
      );


    const panel =
      document.querySelector(
        ".cart-panel"
      );


    const cartButton =
      document.querySelector(
        ".cart-button"
      );


    if (!overlay || !panel) return;


    if (
      overlay.classList.contains("active") &&
      !panel.contains(event.target) &&
      (!cartButton ||
        !cartButton.contains(event.target))
    ) {

      closeCart();

    }

  }
);


// ==========================================
// ESCAPE KEY CLOSE CART
// ==========================================

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Escape") {

      closeCart();

    }

  }
);


// ==========================================
// FORMAT PRICE
// ==========================================

function formatPrice(price) {

  return Number(price || 0)
    .toLocaleString("en-IN");

}


// ==========================================
// BASIC HTML ESCAPE
// ==========================================

function escapeHtml(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


// ==========================================
// INITIALIZE WEBSITE
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  function() {

    loadProducts();

    updateCart();

  }
);
