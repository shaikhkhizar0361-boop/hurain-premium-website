// ======================================================
// HURAIN WEBSITE - FINAL SCRIPT
// ======================================================

const WHATSAPP_NUMBER = "919921181213";
const DELIVERY_CHARGE = 100;


// ======================================================
// DEMO PRODUCTS
// ======================================================

const products = [
  {
    id: 1,
    name: "Luxury Jewellery Set",
    category: "Jewellery",
    price: 1499,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
    description: "Beautiful premium imitation jewellery set for an elegant luxury look.",
    stock: true
  },
  {
    id: 2,
    name: "Premium Beauty Collection",
    category: "Cosmetics",
    price: 999,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
    description: "Premium beauty and cosmetics collection selected by HURAIN.",
    stock: true
  },
  {
    id: 3,
    name: "Elegant Bangles Set",
    category: "Bangles",
    price: 799,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80",
    description: "Elegant bangles collection designed for your special occasions.",
    stock: true
  },
  {
    id: 4,
    name: "Luxury Perfume",
    category: "Perfumes",
    price: 1299,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80",
    description: "A premium fragrance collection with a luxurious finish.",
    stock: true
  },
  {
    id: 5,
    name: "Premium Hand Bag",
    category: "Hand Bags",
    price: 1799,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
    description: "Stylish premium handbag suitable for everyday and special occasions.",
    stock: true
  },
  {
    id: 6,
    name: "Luxury Accessories",
    category: "Accessories",
    price: 699,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80",
    description: "Premium accessories to complete your luxury style.",
    stock: true
  }
];


// ======================================================
// STORAGE
// ======================================================

function getStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);

    if (!value) return fallback;

    const parsed = JSON.parse(value);

    return parsed ?? fallback;
  } catch (error) {
    console.error("Storage error:", error);
    return fallback;
  }
}

function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Storage save error:", error);
  }
}


let cart = getStorage("hurain_cart", []);
let wishlist = getStorage("hurain_wishlist", []);
let orders = getStorage("hurain_orders", []);

let activeCategory = "all";
let searchText = "";


// ======================================================
// HELPERS
// ======================================================

function money(value) {
  return Number(value || 0).toLocaleString("en-IN");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function stopEvent(event) {
  if (!event) return;

  event.preventDefault();
  event.stopPropagation();
}


// ======================================================
// PRODUCT LIST
// ======================================================

function loadProducts() {
  const grid = document.getElementById("product-grid");

  if (!grid) return;

  let visibleProducts = [...products];

  if (activeCategory !== "all") {
    visibleProducts = visibleProducts.filter(
      product => product.category === activeCategory
    );
  }

  if (searchText) {
    visibleProducts = visibleProducts.filter(product =>
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText)
    );
  }

  if (!visibleProducts.length) {
    grid.innerHTML = `
      <div class="empty-products">
        <div>✨</div>
        <h3>No Products Found</h3>
        <p>Please try another category or search.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = "";

  visibleProducts.forEach(product => {
    const cartItem = cart.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;
    const favourite = wishlist.includes(product.id);

    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div
        class="product-image-wrapper"
        style="position:relative; cursor:pointer;"
        onclick="openProductDetails(event, ${product.id})"
      >

        <img
          src="${product.image}"
          alt="${escapeHtml(product.name)}"
          loading="lazy"
        >

        <button
          type="button"
          class="wishlist-button"
          onclick="toggleWishlist(event, ${product.id})"
          aria-label="Favourite"
          style="
            position:absolute;
            top:10px;
            right:10px;
            z-index:5;
            border:0;
            background:#fff;
            border-radius:50%;
            width:42px;
            height:42px;
            cursor:pointer;
            font-size:21px;
          "
        >
          ${favourite ? "❤️" : "♡"}
        </button>
      </div>

      <div class="product-info">

        <div class="product-category">
          ${escapeHtml(product.category)}
        </div>

        <h3
          onclick="openProductDetails(event, ${product.id})"
          style="cursor:pointer;"
        >
          ${escapeHtml(product.name)}
        </h3>

        <div class="product-price">
          ₹${money(product.price)}
        </div>

        <div
          class="product-cart-control"
          style="margin-top:12px;width:100%;"
        >

          ${
            quantity === 0
              ? `
                <button
                  type="button"
                  class="add-cart"
                  onclick="addToCart(event, ${product.id})"
                >
                  ADD TO CART
                </button>
              `
              : `
                <div
                  class="quantity-control"
                  style="
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    gap:20px;
                    width:100%;
                  "
                >

                  <button
                    type="button"
                    onclick="decreaseQuantity(event, ${product.id})"
                  >
                    −
                  </button>

                  <strong>${quantity}</strong>

                  <button
                    type="button"
                    onclick="increaseQuantity(event, ${product.id})"
                  >
                    +
                  </button>

                </div>
              `
          }

        </div>

      </div>
    `;

    grid.appendChild(card);
  });
}


// ======================================================
// CATEGORY / SEARCH
// ======================================================

function filterProducts(category) {
  activeCategory = category || "all";
  searchText = "";

  loadProducts();

  document.getElementById("products")?.scrollIntoView({
    behavior: "smooth"
  });
}

function showAllProducts() {
  activeCategory = "all";
  searchText = "";
  loadProducts();

  document.getElementById("products")?.scrollIntoView({
    behavior: "smooth"
  });
}

function searchProducts(value) {
  searchText = String(value || "").trim().toLowerCase();

  const grid = document.getElementById("search-results");

  loadProducts();

  if (grid) {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText)
    );

    if (!searchText) {
      grid.innerHTML = "";
      return;
    }

    grid.innerHTML = results.length
      ? results.map(product => `
          <button
            type="button"
            onclick="openProductDetails(event, ${product.id}); closeSearch();"
            style="
              display:block;
              width:100%;
              padding:12px;
              margin:8px 0;
              text-align:left;
              cursor:pointer;
            "
          >
            ${escapeHtml(product.name)}
            — ₹${money(product.price)}
          </button>
        `).join("")
      : `<p>No products found.</p>`;
  }
}


// ======================================================
// PRODUCT DETAILS
// ======================================================

function openProductDetails(event, productId) {
  stopEvent(event);

  const product = products.find(item => item.id === productId);

  if (!product) return;

  const modal = document.getElementById("product-modal");
  const content = document.getElementById("product-detail-content");

  if (!modal || !content) return;

  const cartItem = cart.find(item => item.id === productId);
  const quantity = cartItem ? cartItem.quantity : 0;
  const favourite = wishlist.includes(productId);

  content.innerHTML = `
    <div
      class="product-detail"
      style="
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:25px;
      "
    >

      <div>
        <img
          src="${product.image}"
          alt="${escapeHtml(product.name)}"
          style="
            width:100%;
            max-height:500px;
            object-fit:cover;
            border-radius:12px;
          "
        >
      </div>

      <div>

        <small>
          ${escapeHtml(product.category)}
        </small>

        <h2>
          ${escapeHtml(product.name)}
        </h2>

        <h3>
          ₹${money(product.price)}
        </h3>

        <p>
          ${escapeHtml(product.description)}
        </p>

        <button
          type="button"
          onclick="toggleWishlist(event, ${product.id})"
          style="
            padding:10px 15px;
            cursor:pointer;
          "
        >
          ${favourite ? "❤️ Favourite" : "♡ Add to Favourite"}
        </button>

        <div style="margin-top:20px;">

          <strong>Quantity</strong>

          <div
            style="
              display:flex;
              align-items:center;
              gap:18px;
              margin:12px 0;
            "
          >

            <button
              type="button"
              onclick="decreaseQuantity(event, ${product.id}); openProductDetails(event, ${product.id})"
            >
              −
            </button>

            <strong>
              ${quantity}
            </strong>

            <button
              type="button"
              onclick="increaseQuantity(event, ${product.id}); openProductDetails(event, ${product.id})"
            >
              +
            </button>

          </div>

        </div>

        <div
          style="
            display:flex;
            gap:10px;
            flex-wrap:wrap;
          "
        >

          <button
            type="button"
            class="add-cart"
            onclick="addToCart(event, ${product.id}); openProductDetails(event, ${product.id})"
          >
            ADD TO CART
          </button>

          <button
            type="button"
            class="btn primary"
            onclick="orderNow(${product.id})"
          >
            ORDER NOW
          </button>

        </div>

      </div>

    </div>
  `;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}

function closeProductDetails() {
  const modal = document.getElementById("product-modal");

  if (!modal) return;

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}


// ======================================================
// ORDER NOW
// ======================================================

function orderNow(productId) {
  const product = products.find(item => item.id === productId);

  if (!product) return;

  const existing = cart.find(item => item.id === productId);

  if (!existing) {
    cart.push({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      quantity: 1
    });

    setStorage("hurain_cart", cart);
  }

  updateCart();
  loadProducts();

  closeProductDetails();

  goToCheckout();
}


// ======================================================
// CART
// ======================================================

function addToCart(event, productId) {
  stopEvent(event);

  const product = products.find(item => item.id === productId);

  if (!product) return;

  const existing = cart.find(item => item.id === productId);

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

  setStorage("hurain_cart", cart);

  updateCart();
  loadProducts();
}

function increaseQuantity(event, productId) {
  stopEvent(event);

  const item = cart.find(item => item.id === productId);

  if (!item) {
    addToCart(null, productId);
    return;
  }

  item.quantity += 1;

  setStorage("hurain_cart", cart);

  updateCart();
  loadProducts();
}

function decreaseQuantity(event, productId) {
  stopEvent(event);

  const item = cart.find(item => item.id === productId);

  if (!item) return;

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart = cart.filter(item => item.id !== productId);
  }

  setStorage("hurain_cart", cart);

  updateCart();
  loadProducts();
}

function removeFromCart(event, productId) {
  stopEvent(event);

  cart = cart.filter(item => item.id !== productId);

  setStorage("hurain_cart", cart);

  updateCart();
  loadProducts();

  // IMPORTANT:
  // Cart stays open. No page redirect.
}

function getCartQuantity() {
  return cart.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );
}

function getCartSubtotal() {
  return cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
      Number(item.quantity || 0),
    0
  );
}

function updateCart() {
  const count = document.getElementById("cart-count");
  const total = document.getElementById("cart-total");
  const items = document.getElementById("cart-items");

  if (count) {
    count.textContent = getCartQuantity();
  }

  if (total) {
    total.textContent = money(getCartSubtotal());
  }

  if (!items) return;

  if (!cart.length) {
    items.innerHTML = `
      <div class="empty-cart">
        <p>Your cart is empty.</p>
      </div>
    `;
    return;
  }

  items.innerHTML = cart.map(item => `
    <div
      class="cart-item"
      style="
        display:grid;
        grid-template-columns:70px 1fr auto;
        gap:12px;
        align-items:center;
      "
    >

      <img
        src="${item.image}"
        alt="${escapeHtml(item.name)}"
        style="
          width:65px;
          height:65px;
          object-fit:cover;
          border-radius:8px;
        "
      >

      <div>
        <strong>
          ${escapeHtml(item.name)}
        </strong>

        <div>
          ₹${money(item.price)}
        </div>

        <div
          style="
            display:flex;
            align-items:center;
            gap:12px;
            margin-top:7px;
          "
        >

          <button
            type="button"
            onclick="decreaseQuantity(event, ${item.id})"
          >
            −
          </button>

          <strong>${item.quantity}</strong>

          <button
            type="button"
            onclick="increaseQuantity(event, ${item.id})"
          >
            +
          </button>

        </div>
      </div>

      <button
        type="button"
        onclick="removeFromCart(event, ${item.id})"
      >
        Remove
      </button>

    </div>
  `).join("");
}

function openCart() {
  updateCart();

  const overlay = document.getElementById("cart-overlay");

  if (!overlay) return;

  overlay.classList.add("active");
  overlay.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}

function closeCart() {
  const overlay = document.getElementById("cart-overlay");

  if (!overlay) return;

  overlay.classList.remove("active");
  overlay.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}


// ======================================================
// WISHLIST
// ======================================================

function toggleWishlist(event, productId) {
  stopEvent(event);

  const index = wishlist.indexOf(productId);

  if (index === -1) {
    wishlist.push(productId);
  } else {
    wishlist.splice(index, 1);
  }

  setStorage("hurain_wishlist", wishlist);

  loadProducts();

  const modal = document.getElementById("wishlist-modal");

  if (modal && modal.classList.contains("active")) {
    renderWishlist();
  }
}

function openWishlist() {
  renderWishlist();

  const modal = document.getElementById("wishlist-modal");

  if (!modal) return;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}

function closeWishlist() {
  const modal = document.getElementById("wishlist-modal");

  if (!modal) return;

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}

function renderWishlist() {
  const container = document.getElementById("wishlist-items");

  if (!container) return;

  const favourites = products.filter(product =>
    wishlist.includes(product.id)
  );

  if (!favourites.length) {
    container.innerHTML = `
      <p>
        Your favourite products will appear here.
      </p>
    `;
    return;
  }

  container.innerHTML = favourites.map(product => `
    <div
      style="
        display:flex;
        align-items:center;
        gap:12px;
        margin:12px 0;
      "
    >

      <img
        src="${product.image}"
        alt="${escapeHtml(product.name)}"
        style="
          width:65px;
          height:65px;
          object-fit:cover;
          border-radius:8px;
        "
      >

      <div style="flex:1;">
        <strong>
          ${escapeHtml(product.name)}
        </strong>

        <div>
          ₹${money(product.price)}
        </div>
      </div>

      <button
        type="button"
        onclick="removeFavourite(${product.id})"
      >
        Remove
      </button>

    </div>
  `).join("");
}

function removeFavourite(productId) {
  wishlist = wishlist.filter(id => id !== productId);

  setStorage("hurain_wishlist", wishlist);

  loadProducts();
  renderWishlist();
}


// ======================================================
// CHECKOUT
// ======================================================

function goToCheckout() {
  if (!cart.length) {
    alert("Your cart is empty. Please add a product first.");
    return;
  }

  closeCart();
  closeProductDetails();

  const checkout = document.getElementById("checkout-page");

  if (!checkout) return;

  checkout.style.display = "block";

  renderCheckout();

  setTimeout(() => {
    checkout.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 100);

  document.body.style.overflow = "";
}

function closeCheckout() {
  const checkout = document.getElementById("checkout-page");

  if (!checkout) return;

  checkout.style.display = "none";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function renderCheckout() {
  const items = document.getElementById("checkout-items");
  const subtotalElement =
    document.getElementById("checkout-product-total");
  const deliveryElement =
    document.getElementById("checkout-delivery");
  const totalElement =
    document.getElementById("checkout-grand-total");

  const subtotal = getCartSubtotal();
  const delivery = cart.length ? DELIVERY_CHARGE : 0;
  const grandTotal = subtotal + delivery;

  if (items) {
    items.innerHTML = cart.map(item => `
      <div
        class="summary-item"
        style="
          display:flex;
          justify-content:space-between;
          gap:15px;
          padding:10px 0;
        "
      >

        <span>
          ${escapeHtml(item.name)}
          × ${item.quantity}
        </span>

        <strong>
          ₹${money(item.price * item.quantity)}
        </strong>

      </div>
    `).join("");
  }

  if (subtotalElement) {
    subtotalElement.textContent = money(subtotal);
  }

  if (deliveryElement) {
    deliveryElement.textContent = money(delivery);
  }

  if (totalElement) {
    totalElement.textContent = money(grandTotal);
  }
}


// ======================================================
// FORM ERRORS
// ======================================================

function clearFormErrors() {
  const ids = [
    "customer-name-error",
    "customer-mobile-error",
    "customer-address-error",
    "customer-area-error",
    "customer-city-error",
    "customer-state-error",
    "customer-pincode-error"
  ];

  ids.forEach(id => {
    const element = document.getElementById(id);

    if (element) {
      element.textContent = "";
    }
  });
}

function showFormError(id, message) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = message;
  }
}


// ======================================================
// WHATSAPP ORDER
// ======================================================

function handleCheckoutSubmit(event) {
  stopEvent(event);

  clearFormErrors();

  if (!cart.length) {
    alert("Your cart is empty.");
    return;
  }

  const name =
    document.getElementById("customer-name")?.value.trim() || "";

  const mobile =
    document.getElementById("customer-mobile")
      ?.value.replace(/\D/g, "") || "";

  const address =
    document.getElementById("customer-address")
      ?.value.trim() || "";

  const area =
    document.getElementById("customer-area")
      ?.value.trim() || "";

  const city =
    document.getElementById("customer-city")
      ?.value.trim() || "";

  const state =
    document.getElementById("customer-state")
      ?.value.trim() || "";

  const pincode =
    document.getElementById("customer-pincode")
      ?.value.replace(/\D/g, "") || "";

  const note =
    document.getElementById("delivery-note")
      ?.value.trim() || "";

  let valid = true;

  if (name.length < 2) {
    showFormError(
      "customer-name-error",
      "Please enter your full name."
    );
    valid = false;
  }

  if (!/^[6-9]\d{9}$/.test(mobile)) {
    showFormError(
      "customer-mobile-error",
      "Please enter a valid 10-digit mobile number."
    );
    valid = false;
  }

  if (address.length < 3) {
    showFormError(
      "customer-address-error",
      "Please enter your house or flat number."
    );
    valid = false;
  }

  if (area.length < 3) {
    showFormError(
      "customer-area-error",
      "Please enter your area or street."
    );
    valid = false;
  }

  if (city.length < 2) {
    showFormError(
      "customer-city-error",
      "Please enter your city."
    );
    valid = false;
  }

  if (!state) {
    showFormError(
      "customer-state-error",
      "Please select your state."
    );
    valid = false;
  }

  if (!/^\d{6}$/.test(pincode)) {
    showFormError(
      "customer-pincode-error",
      "Please enter a valid 6-digit pincode."
    );
    valid = false;
  }

  if (!valid) return;

  placeWhatsAppOrder({
    name,
    mobile,
    address,
    area,
    city,
    state,
    pincode,
    note
  });
}


// ======================================================
// PLACE ORDER
// ======================================================

function placeWhatsAppOrder(customer) {
  const orderId =
    "HURAIN-" +
    Date.now().toString().slice(-8);

  const subtotal = getCartSubtotal();
  const delivery = DELIVERY_CHARGE;
  const total = subtotal + delivery;

  const order = {
    id: orderId,
    date: new Date().toISOString(),
    status: "Order Placed",
    customer,
    items: cart.map(item => ({ ...item })),
    subtotal,
    delivery,
    total
  };

  orders.unshift(order);

  setStorage("hurain_orders", orders);

  let message = "";

  message += "🛍️ *HURAIN NEW ORDER*\n";
  message += "━━━━━━━━━━━━━━━━━━\n\n";

  message += "🧾 *ORDER ID:* " + orderId + "\n\n";

  message += "👤 *CUSTOMER DETAILS*\n";
  message += "Name: " + customer.name + "\n";
  message += "Mobile: " + customer.mobile + "\n\n";

  message += "📍 *DELIVERY ADDRESS*\n";
  message += customer.address + "\n";
  message += customer.area + "\n";
  message += customer.city + ", " + customer.state + "\n";
  message += "Pincode: " + customer.pincode + "\n";

  if (customer.note) {
    message += "Note: " + customer.note + "\n";
  }

  message += "\n";
  message += "🛒 *PRODUCT DETAILS*\n";
  message += "━━━━━━━━━━━━━━━━━━\n";

  cart.forEach((item, index) => {
    message += "\n";
    message += (index + 1) + ". " + item.name + "\n";
    message += "Category: " + item.category + "\n";
    message += "Quantity: " + item.quantity + "\n";
    message += "Price: ₹" + money(item.price) + "\n";
    message +=
      "Product Total: ₹" +
      money(item.price * item.quantity) +
      "\n";

    message +=
      "Product Link: " +
      window.location.origin +
      window.location.pathname +
      "#product-" +
      item.id +
      "\n";
  });

  message += "\n";
  message += "━━━━━━━━━━━━━━━━━━\n";
  message += "Product Total: ₹" + money(subtotal) + "\n";
  message += "Delivery: ₹" + money(delivery) + "\n";
  message += "💰 *GRAND TOTAL: ₹" + money(total) + "*\n\n";
  message += "Thank you for shopping with HURAIN ❤️";

  const url =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank");

  // Save order first, then clear cart
  cart = [];

  setStorage("hurain_cart", cart);

  updateCart();
  loadProducts();

  closeCheckout();

  alert(
    "Order " +
    orderId +
    " is ready on WhatsApp."
  );
}


// ======================================================
// ACCOUNT
// ======================================================

function openAccount() {
  const modal = document.getElementById("account-modal");

  if (!modal) return;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}

function closeAccount() {
  const modal = document.getElementById("account-modal");

  if (!modal) return;

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}

function mobileLogin() {
  const input = document.getElementById("login-mobile");

  if (!input) return;

  const mobile =
    input.value.replace(/\D/g, "");

  if (!/^[6-9]\d{9}$/.test(mobile)) {
    alert(
      "Please enter a valid 10-digit mobile number."
    );
    return;
  }

  localStorage.setItem(
    "hurain_customer_mobile",
    mobile
  );

  alert(
    "Mobile number saved. OTP login can be connected later."
  );

  closeAccount();
}


// ======================================================
// SEARCH MODAL
// ======================================================

function openSearch() {
  const modal = document.getElementById("search-modal");

  if (!modal) return;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  setTimeout(() => {
    document.getElementById("search-input")?.focus();
  }, 100);
}

function closeSearch() {
  const modal = document.getElementById("search-modal");

  if (!modal) return;

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}


// ======================================================
// BACKDROP CLICK
// ======================================================

document.addEventListener("click", function(event) {

  if (event.target === document.getElementById("product-modal")) {
    closeProductDetails();
  }

  if (event.target === document.getElementById("search-modal")) {
    closeSearch();
  }

  if (event.target === document.getElementById("account-modal")) {
    closeAccount();
  }

  if (event.target === document.getElementById("wishlist-modal")) {
    closeWishlist();
  }

  if (event.target === document.getElementById("cart-overlay")) {
    closeCart();
  }

});


// ======================================================
// ESC KEY
// ======================================================

document.addEventListener("keydown", function(event) {

  if (event.key !== "Escape") return;

  closeProductDetails();
  closeSearch();
  closeAccount();
  closeWishlist();
  closeCart();

});


// ======================================================
// CHECKOUT FORM
// ======================================================

document.addEventListener("DOMContentLoaded", function() {

  const form =
    document.getElementById("checkout-form");

  if (form) {
    form.addEventListener(
      "submit",
      handleCheckoutSubmit
    );
  }

  const mobile =
    document.getElementById("customer-mobile");

  if (mobile) {
    mobile.addEventListener(
      "input",
      function() {
        this.value =
          this.value
            .replace(/\D/g, "")
            .slice(0, 10);
      }
    );
  }

  const pincode =
    document.getElementById("customer-pincode");

  if (pincode) {
    pincode.addEventListener(
      "input",
      function() {
        this.value =
          this.value
            .replace(/\D/g, "")
            .slice(0, 6);
      }
    );
  }

  const loginMobile =
    document.getElementById("login-mobile");

  if (loginMobile) {
    loginMobile.addEventListener(
      "input",
      function() {
        this.value =
          this.value
            .replace(/\D/g, "")
            .slice(0, 10);
      }
    );
  }

  loadProducts();
  updateCart();

});
