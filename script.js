// ==========================================
// HURAIN FINAL WEBSITE SCRIPT
// ==========================================

const WHATSAPP_NUMBER = "919921181213";

const DELIVERY_CHARGE = 100;


// ==========================================
// DEMO PRODUCTS
// Later these can be replaced by Supabase
// ==========================================

const products = [

  {
    id: 1,
    name: "Luxury Jewellery Set",
    category: "Jewellery",
    price: 1499,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 2,
    name: "Premium Beauty Collection",
    category: "Cosmetics",
    price: 999,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 3,
    name: "Elegant Bangles Set",
    category: "Bangles",
    price: 799,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 4,
    name: "Luxury Perfume",
    category: "Perfumes",
    price: 1299,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 5,
    name: "Premium Hand Bag",
    category: "Hand Bags",
    price: 1799,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 6,
    name: "Luxury Accessories",
    category: "Accessories",
    price: 699,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80"
  }

];


let cart = loadStorage(
  "hurain_cart",
  []
);

let wishlist = loadStorage(
  "hurain_wishlist",
  []
);

let orders = loadStorage(
  "hurain_orders",
  []
);

let activeCategory = "all";

let searchText = "";


// ==========================================
// STORAGE
// ==========================================

function loadStorage(key, fallback) {

  try {

    const data =
      localStorage.getItem(key);

    if (!data) {
      return fallback;
    }

    const parsed =
      JSON.parse(data);

    return parsed ?? fallback;

  } catch (error) {

    console.error(
      "Storage error:",
      error
    );

    return fallback;

  }

}


function saveStorage(key, value) {

  try {

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );

  } catch (error) {

    console.error(
      "Storage save error:",
      error
    );

  }

}


// ==========================================
// PRICE
// ==========================================

function formatPrice(value) {

  return Number(value || 0)
    .toLocaleString("en-IN");

}


// ==========================================
// HTML SAFETY
// ==========================================

function escapeHtml(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


// ==========================================
// SHOP
// ==========================================

function showAllProducts() {

  activeCategory = "all";

  searchText = "";

  const search =
    document.getElementById(
      "product-search"
    );

  if (search) {
    search.value = "";
  }

  loadProducts();

}


function filterProducts(category) {

  activeCategory =
    category || "all";

  loadProducts();

}


function searchProducts(value) {

  searchText =
    String(value || "")
      .trim()
      .toLowerCase();

  loadProducts();

}


function loadProducts() {

  const grid =
    document.getElementById(
      "product-grid"
    );

  if (!grid) {
    return;
  }


  let visible =
    [...products];


  if (activeCategory !== "all") {

    visible =
      visible.filter(
        product =>
          product.category ===
          activeCategory
      );

  }


  if (searchText) {

    visible =
      visible.filter(
        product =>
          product.name
            .toLowerCase()
            .includes(searchText) ||

          product.category
            .toLowerCase()
            .includes(searchText)
      );

  }


  const filterLabel =
    document.getElementById(
      "category-filter"
    );

  if (filterLabel) {

    filterLabel.textContent =
      activeCategory === "all"
        ? "Showing All Products"
        : "Showing " +
          activeCategory +
          " Products";

  }


  if (!visible.length) {

    grid.innerHTML = `

      <div class="empty-products">

        <div>✨</div>

        <h3>
          No Products Found
        </h3>

        <p>
          Please try another category or search.
        </p>

      </div>

    `;

    return;

  }


  grid.innerHTML = "";


  visible.forEach(
    product => {

      const cartItem =
        cart.find(
          item =>
            item.id === product.id
        );


      const quantity =
        cartItem
          ? cartItem.quantity
          : 0;


      const favourite =
        wishlist.includes(
          product.id
        );


      const card =
        document.createElement(
          "div"
        );


      card.className =
        "product-card";


      card.innerHTML = `

        <div
          class="product-image-wrapper"
          style="position:relative;"
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
            aria-label="Favourite product"
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

          <h3>
            ${escapeHtml(product.name)}
          </h3>

          <div class="product-price">
            ₹${formatPrice(product.price)}
          </div>


          <div
            class="product-cart-control"
            style="
              margin-top:12px;
              width:100%;
            "
          >

            ${
              quantity === 0

              ?

              `
                <button
                  type="button"
                  class="add-cart"
                  onclick="addToCart(event, ${product.id})"
                >
                  ADD TO CART
                </button>
              `

              :

              `
                <div
                  class="quantity-control"
                  style="
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    gap:20px;
                    width:100%;
                    box-sizing:border-box;
                  "
                >

                  <button
                    type="button"
                    onclick="decreaseQuantity(event, ${product.id})"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <strong>
                    ${quantity}
                  </strong>

                  <button
                    type="button"
                    onclick="increaseQuantity(event, ${product.id})"
                    aria-label="Increase quantity"
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

    }
  );

}


// ==========================================
// CART
// ==========================================

function addToCart(event, productId) {

  stopEvent(event);


  const product =
    products.find(
      item =>
        item.id === productId
    );


  if (!product) {
    return;
  }


  const existing =
    cart.find(
      item =>
        item.id === productId
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


  saveStorage(
    "hurain_cart",
    cart
  );


  updateCart();

  loadProducts();

}


function increaseQuantity(
  event,
  productId
) {

  stopEvent(event);


  const item =
    cart.find(
      product =>
        product.id === productId
    );


  if (!item) {

    addToCart(
      null,
      productId
    );

    return;

  }


  item.quantity += 1;


  saveStorage(
    "hurain_cart",
    cart
  );


  updateCart();

  loadProducts();

}


function decreaseQuantity(
  event,
  productId
) {

  stopEvent(event);


  const item =
    cart.find(
      product =>
        product.id === productId
    );


  if (!item) {
    return;
  }


  item.quantity -= 1;


  if (item.quantity <= 0) {

    cart =
      cart.filter(
        product =>
          product.id !== productId
      );

  }


  saveStorage(
    "hurain_cart",
    cart
  );


  updateCart();

  loadProducts();

}


function removeFromCart(
  event,
  productId
) {

  stopEvent(event);


  cart =
    cart.filter(
      item =>
        item.id !== productId
    );


  saveStorage(
    "hurain_cart",
    cart
  );


  updateCart();

  loadProducts();

}


function getCartQuantity() {

  return cart.reduce(
    (sum, item) =>
      sum + Number(item.quantity || 0),
    0
  );

}


function getCartSubtotal() {

  return cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
      Number(item.quantity || 0),
    0
  );

}


function updateCart() {

  const count =
    document.getElementById(
      "cart-count"
    );

  const total =
    document.getElementById(
      "cart-total"
    );

  const items =
    document.getElementById(
      "cart-items"
    );


  if (count) {

    count.textContent =
      getCartQuantity();

  }


  if (total) {

    total.textContent =
      formatPrice(
        getCartSubtotal()
      );

  }


  if (!items) {
    return;
  }


  if (!cart.length) {

    items.innerHTML = `

      <div class="empty-cart">

        <p>
          Your cart is empty.
        </p>

      </div>

    `;

    return;

  }


  items.innerHTML = "";


  cart.forEach(
    item => {

      const row =
        document.createElement(
          "div"
        );


      row.className =
        "cart-item";


      row.innerHTML = `

        <div class="cart-item-info">

          <strong>
            ${escapeHtml(item.name)}
          </strong>

          <small>
            ₹${formatPrice(item.price)}
          </small>

        </div>


        <div
          class="cart-item-actions"
        >

          <button
            type="button"
            onclick="decreaseQuantity(event, ${item.id})"
          >
            −
          </button>

          <span>
            ${item.quantity}
          </span>

          <button
            type="button"
            onclick="increaseQuantity(event, ${item.id})"
          >
            +
          </button>

        </div>


        <button
          type="button"
          onclick="removeFromCart(event, ${item.id})"
        >
          Remove
        </button>

      `;


      items.appendChild(row);

    }
  );

}


// ==========================================
// CART OPEN/CLOSE
// ==========================================

function openCart() {

  updateCart();


  const overlay =
    document.getElementById(
      "cart-overlay"
    );


  if (!overlay) {
    return;
  }


  overlay.classList.add(
    "active"
  );


  overlay.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}


function closeCart() {

  const overlay =
    document.getElementById(
      "cart-overlay"
    );


  if (!overlay) {
    return;
  }


  overlay.classList.remove(
    "active"
  );


  overlay.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}


// ==========================================
// WISHLIST
// ==========================================

function toggleWishlist(
  event,
  productId
) {

  stopEvent(event);


  const index =
    wishlist.indexOf(
      productId
    );


  if (index === -1) {

    wishlist.push(
      productId
    );

  } else {

    wishlist.splice(
      index,
      1
    );

  }


  saveStorage(
    "hurain_wishlist",
    wishlist
  );


  loadProducts();

}


function showWishlist() {

  const overlay =
    document.getElementById(
      "wishlist-overlay"
    );

  const container =
    document.getElementById(
      "wishlist-items"
    );


  if (!overlay || !container) {
    return;
  }


  const favouriteProducts =
    products.filter(
      product =>
        wishlist.includes(
          product.id
        )
    );


  if (!favouriteProducts.length) {

    container.innerHTML = `

      <p>
        Your wishlist is empty.
      </p>

    `;

  } else {

    container.innerHTML =
      favouriteProducts
        .map(
          product => `

            <div class="wishlist-item">

              <img
                src="${product.image}"
                alt="${escapeHtml(product.name)}"
                style="
                  width:70px;
                  height:70px;
                  object-fit:cover;
                "
              >

              <strong>
                ${escapeHtml(product.name)}
              </strong>

              <span>
                ₹${formatPrice(product.price)}
              </span>

              <button
                type="button"
                onclick="addToCart(event, ${product.id})"
              >
                ADD TO CART
              </button>

            </div>

          `
        )
        .join("");

  }


  overlay.classList.add(
    "active"
  );


  overlay.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}


function closeWishlist() {

  const overlay =
    document.getElementById(
      "wishlist-overlay"
    );


  if (!overlay) {
    return;
  }


  overlay.classList.remove(
    "active"
  );


  overlay.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}


// ==========================================
// CHECKOUT
// ==========================================

function openCheckout() {

  if (!cart.length) {

    alert(
      "Your cart is empty. Please add a product first."
    );

    return;

  }


  closeCart();


  renderCheckoutSummary();


  const overlay =
    document.getElementById(
      "checkout-overlay"
    );


  if (!overlay) {
    return;
  }


  overlay.classList.add(
    "active"
  );


  overlay.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}


function closeCheckout() {

  const overlay =
    document.getElementById(
      "checkout-overlay"
    );


  if (!overlay) {
    return;
  }


  overlay.classList.remove(
    "active"
  );


  overlay.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}


function renderCheckoutSummary() {

  const summary =
    document.getElementById(
      "checkout-summary"
    );


  if (!summary) {
    return;
  }


  const subtotal =
    getCartSubtotal();


  const delivery =
    cart.length
      ? DELIVERY_CHARGE
      : 0;


  const grandTotal =
    subtotal +
    delivery;


  summary.innerHTML = `

    <div class="checkout-summary-box">

      <h3>
        Order Summary
      </h3>

      ${cart
        .map(
          item => `

            <div
              class="summary-row"
            >

              <span>
                ${escapeHtml(item.name)}
                × ${item.quantity}
              </span>

              <strong>
                ₹${formatPrice(
                  item.price *
                  item.quantity
                )}
              </strong>

            </div>

          `
        )
        .join("")}


      <hr>


      <div class="summary-row">

        <span>
          Product Total
        </span>

        <strong>
          ₹${formatPrice(subtotal)}
        </strong>

      </div>


      <div class="summary-row">

        <span>
          Delivery
        </span>

        <strong>
          ₹${formatPrice(delivery)}
        </strong>

      </div>


      <div class="summary-row grand-total">

        <span>
          Grand Total
        </span>

        <strong>
          ₹${formatPrice(grandTotal)}
        </strong>

      </div>

    </div>

  `;

}


// ==========================================
// VALIDATION
// ==========================================

function clearErrors() {

  const errors = [
    "name-error",
    "mobile-error",
    "address-error",
    "city-error",
    "state-error",
    "pincode-error"
  ];


  errors.forEach(
    id => {

      const element =
        document.getElementById(id);

      if (element) {
        element.textContent = "";
      }

    }
  );

}


function setError(
  id,
  message
) {

  const element =
    document.getElementById(id);

  if (element) {

    element.textContent =
      message;

  }

}


function submitCheckout(event) {

  stopEvent(event);


  clearErrors();


  if (!cart.length) {

    alert(
      "Your cart is empty."
    );

    closeCheckout();

    return;

  }


  const name =
    document
      .getElementById(
        "customer-name"
      )
      .value
      .trim();


  const mobile =
    document
      .getElementById(
        "customer-mobile"
      )
      .value
      .replace(/\D/g, "");


  const address =
    document
      .getElementById(
        "customer-address"
      )
      .value
      .trim();


  const city =
    document
      .getElementById(
        "customer-city"
      )
      .value
      .trim();


  const state =
    document
      .getElementById(
        "customer-state"
      )
      .value
      .trim();


  const pincode =
    document
      .getElementById(
        "customer-pincode"
      )
      .value
      .replace(/\D/g, "");


  let valid = true;


  if (name.length < 2) {

    setError(
      "name-error",
      "Please enter your full name."
    );

    valid = false;

  }


  if (!/^[6-9]\d{9}$/.test(mobile)) {

    setError(
      "mobile-error",
      "Please enter a valid 10-digit mobile number."
    );

    valid = false;

  }


  if (address.length < 5) {

    setError(
      "address-error",
      "Please enter your complete address."
    );

    valid = false;

  }


  if (city.length < 2) {

    setError(
      "city-error",
      "Please enter your city."
    );

    valid = false;

  }


  if (state.length < 2) {

    setError(
      "state-error",
      "Please enter your state."
    );

    valid = false;

  }


  if (!/^\d{6}$/.test(pincode)) {

    setError(
      "pincode-error",
      "Please enter a valid 6-digit pincode."
    );

    valid = false;

  }


  if (!valid) {

    return;

  }


  createWhatsAppOrder({

    name,
    mobile,
    address,
    city,
    state,
    pincode

  });

}


// ==========================================
// CREATE ORDER
// ==========================================

function createWhatsAppOrder(
  customer
) {

  const subtotal =
    getCartSubtotal();


  const delivery =
    DELIVERY_CHARGE;


  const grandTotal =
    subtotal +
    delivery;


  const orderId =
    generateOrderId();


  const order = {

    id: orderId,

    date:
      new Date()
        .toISOString(),

    status:
      "Order Placed",

    customer,

    items:
      cart.map(
        item => ({
          ...item
        })
      ),

    subtotal,

    delivery,

    total:
      grandTotal

  };


  orders.unshift(
    order
  );


  saveStorage(
    "hurain_orders",
    orders
  );


  let message =
    "🛍️ HURAIN NEW ORDER\n\n";


  message +=
    "Order ID: " +
    orderId +
    "\n\n";


  message +=
    "👤 CUSTOMER DETAILS\n";

  message +=
    "Name: " +
    customer.name +
    "\n";

  message +=
    "Mobile: " +
    customer.mobile +
    "\n\n";


  message +=
    "📍 DELIVERY ADDRESS\n";

  message +=
    customer.address +
    "\n";

  message +=
    "City: " +
    customer.city +
    "\n";

  message +=
    "State: " +
    customer.state +
    "\n";

  message +=
    "Pincode: " +
    customer.pincode +
    "\n\n";


  message +=
    "🛒 ORDER DETAILS\n\n";


  cart.forEach(
    (item, index) => {

      message +=
        (index + 1) +
        ". " +
        item.name +
        "\n";

      message +=
        "Category: " +
        item.category +
        "\n";

      message +=
        "Quantity: " +
        item.quantity +
        "\n";

      message +=
        "Price: ₹" +
        formatPrice(
          item.price
        ) +
        "\n";

      message +=
        "Product Total: ₹" +
        formatPrice(
          item.price *
          item.quantity
        ) +
        "\n";

      message +=
        "Product Link: " +
        getProductLink(
          item.id
        ) +
        "\n\n";

    }
  );


  message +=
    "Product Total: ₹" +
    formatPrice(
      subtotal
    ) +
    "\n";


  message +=
    "Delivery: ₹" +
    formatPrice(
      delivery
    ) +
    "\n";


  message +=
    "Grand Total: ₹" +
    formatPrice(
      grandTotal
    ) +
    "\n\n";


  message +=
    "Thank you for shopping with HURAIN ❤️";


  const whatsappURL =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(
      message
    );


  window.open(
    whatsappURL,
    "_blank",
    "noopener,noreferrer"
  );


  // Clear cart after creating order

  cart = [];


  saveStorage(
    "hurain_cart",
    cart
  );


  updateCart();

  loadProducts();


  closeCheckout();


  setTimeout(
    () => {

      alert(
        "Order details are ready on WhatsApp.\n\nOrder ID: " +
        orderId
      );

    },
    300
  );

}


// ==========================================
// PRODUCT LINK
// ==========================================

function getProductLink(
  productId
) {

  return (
    window.location.origin +
    window.location.pathname +
    "#product-" +
    productId
  );

}


// ==========================================
// ORDER ID
// ==========================================

function generateOrderId() {

  const random =
    Math.floor(
      1000 +
      Math.random() *
      9000
    );


  return (
    "HURAIN-" +
    Date.now()
      .toString()
      .slice(-6) +
    "-" +
    random
  );

}


// ==========================================
// ORDERS
// ==========================================

function showOrders() {

  closeAccount();


  const overlay =
    document.getElementById(
      "orders-overlay"
    );


  const list =
    document.getElementById(
      "orders-list"
    );


  if (!overlay || !list) {
    return;
  }


  if (!orders.length) {

    list.innerHTML = `

      <p>
        No orders found.
      </p>

    `;

  } else {

    list.innerHTML =
      orders
        .map(
          order => `

            <div class="order-card">

              <h3>
                ${escapeHtml(order.id)}
              </h3>

              <p>
                ${new Date(
                  order.date
                ).toLocaleString("en-IN")}
              </p>

              <strong>
                Status:
                ${escapeHtml(order.status)}
              </strong>

              <p>
                Total:
                ₹${formatPrice(order.total)}
              </p>

              <button
                type="button"
                onclick="showOrderDetails('${order.id}')"
              >
                VIEW ORDER
              </button>

            </div>

          `
        )
        .join("");

  }


  overlay.classList.add(
    "active"
  );


  overlay.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}


function showOrderDetails(
  orderId
) {

  const order =
    orders.find(
      item =>
        item.id === orderId
    );


  if (!order) {
    return;
  }


  alert(

    "Order: " +
    order.id +
    "\n\n" +

    "Status: " +
    order.status +
    "\n\n" +

    "Customer: " +
    order.customer.name +
    "\n" +

    "Mobile: " +
    order.customer.mobile +
    "\n\n" +

    "Total: ₹" +
    formatPrice(
      order.total
    )

  );

}


function closeOrders() {

  const overlay =
    document.getElementById(
      "orders-overlay"
    );


  if (!overlay) {
    return;
  }


  overlay.classList.remove(
    "active"
  );


  overlay.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}


// ==========================================
// ACCOUNT
// ==========================================

function openAccount() {

  const overlay =
    document.getElementById(
      "account-overlay"
    );


  if (!overlay) {
    return;
  }


  overlay.classList.add(
    "active"
  );


  overlay.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}


function closeAccount() {

  const overlay =
    document.getElementById(
      "account-overlay"
    );


  if (!overlay) {
    return;
  }


  overlay.classList.remove(
    "active"
  );


  overlay.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}


function requestLogin() {

  const input =
    document.getElementById(
      "account-mobile"
    );


  if (!input) {
    return;
  }


  const mobile =
    input.value
      .replace(/\D/g, "");


  if (!/^[6-9]\d{9}$/.test(mobile)) {

    alert(
      "Please enter a valid 10-digit mobile number."
    );

    return;

  }


  alert(
    "Mobile number saved for the next secure OTP login step."
  );

}


// ==========================================
// SEARCH
// ==========================================

function focusSearch() {

  const search =
    document.getElementById(
      "product-search"
    );


  if (!search) {
    return;
  }


  document
    .getElementById(
      "products"
    )
    ?.scrollIntoView({
      behavior: "smooth"
    });


  setTimeout(
    () => {

      search.focus();

    },
    400
  );

}


// ==========================================
// ESCAPE / EVENT CONTROL
// ==========================================

function stopEvent(
  event
) {

  if (!event) {
    return;
  }


  event.preventDefault();

  event.stopPropagation();

}


// ==========================================
// CLOSE MODALS ON BACKDROP
// ==========================================

document.addEventListener(
  "click",
  function(event) {

    const overlays = [
      "cart-overlay",
      "checkout-overlay",
      "account-overlay",
      "wishlist-overlay",
      "orders-overlay"
    ];


    overlays.forEach(
      id => {

        const overlay =
          document.getElementById(
            id
          );


        if (
          overlay &&
          event.target === overlay
        ) {

          if (
            id ===
            "cart-overlay"
          ) {

            closeCart();

          }

          if (
            id ===
            "checkout-overlay"
          ) {

            closeCheckout();

          }

          if (
            id ===
            "account-overlay"
          ) {

            closeAccount();

          }

          if (
            id ===
            "wishlist-overlay"
          ) {

            closeWishlist();

          }

          if (
            id ===
            "orders-overlay"
          ) {

            closeOrders();

          }

        }

      }
    );

  }
);


// ==========================================
// ESC KEY
// ==========================================

document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key ===
      "Escape"
    ) {

      closeCart();

      closeCheckout();

      closeAccount();

      closeWishlist();

      closeOrders();

    }

  }
);


// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  function() {

    loadProducts();

    updateCart();

  }
);
