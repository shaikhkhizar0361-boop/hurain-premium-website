// ==========================================
// HURAIN E-COMMERCE WEBSITE
// CART + CATEGORY + WISHLIST SYSTEM
// ==========================================

const WHATSAPP_NUMBER = "919921181213";


// ==========================================
// PRODUCTS
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


// ==========================================
// CART
// ==========================================

let cart = loadCart();


// ==========================================
// WISHLIST
// ==========================================

let wishlist = loadWishlist();


// ==========================================
// ACTIVE CATEGORY
// ==========================================

let activeCategory = "all";


// ==========================================
// LOCAL STORAGE - CART
// ==========================================

function loadCart() {

  try {

    const savedCart =
      localStorage.getItem("hurain_cart");

    if (!savedCart) {
      return [];
    }

    const parsedCart =
      JSON.parse(savedCart);

    return Array.isArray(parsedCart)
      ? parsedCart
      : [];

  } catch (error) {

    console.error(
      "Cart loading error:",
      error
    );

    return [];

  }

}


function saveCart() {

  try {

    localStorage.setItem(
      "hurain_cart",
      JSON.stringify(cart)
    );

  } catch (error) {

    console.error(
      "Cart saving error:",
      error
    );

  }

}


// ==========================================
// LOCAL STORAGE - WISHLIST
// ==========================================

function loadWishlist() {

  try {

    const savedWishlist =
      localStorage.getItem(
        "hurain_wishlist"
      );

    if (!savedWishlist) {
      return [];
    }

    const parsedWishlist =
      JSON.parse(savedWishlist);

    return Array.isArray(parsedWishlist)
      ? parsedWishlist
      : [];

  } catch (error) {

    console.error(
      "Wishlist loading error:",
      error
    );

    return [];

  }

}


function saveWishlist() {

  try {

    localStorage.setItem(
      "hurain_wishlist",
      JSON.stringify(wishlist)
    );

  } catch (error) {

    console.error(
      "Wishlist saving error:",
      error
    );

  }

}


// ==========================================
// PRICE FORMAT
// ==========================================

function formatPrice(price) {

  return Number(price || 0)
    .toLocaleString("en-IN");

}


// ==========================================
// HTML SAFETY
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
// PRODUCT FILTER
// ==========================================

function filterProducts(category) {

  activeCategory =
    category || "all";

  const filterText =
    document.getElementById(
      "category-filter"
    );

  if (filterText) {

    filterText.textContent =
      activeCategory === "all"
        ? "Showing All Products"
        : "Showing " +
          activeCategory +
          " Products";

  }

  loadProducts();

  const productsSection =
    document.getElementById(
      "products"
    );

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
// LOAD PRODUCTS
// ==========================================

function loadProducts() {

  const productGrid =
    document.getElementById(
      "product-grid"
    );

  if (!productGrid) {
    return;
  }


  let visibleProducts =
    products;


  if (activeCategory !== "all") {

    visibleProducts =
      products.filter(
        product =>
          product.category ===
          activeCategory
      );

  }


  if (visibleProducts.length === 0) {

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


  visibleProducts.forEach(
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


      const isFavourite =
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
            onclick="toggleWishlist(${product.id})"
            aria-label="Add to wishlist"
            style="
              position:absolute;
              top:12px;
              right:12px;
              z-index:5;
              border:0;
              background:rgba(255,255,255,0.92);
              border-radius:50%;
              width:40px;
              height:40px;
              cursor:pointer;
              font-size:20px;
            "
          >
            ${isFavourite ? "❤️" : "♡"}
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
            style="margin-top:12px;"
          >

            ${
              quantity === 0

                ? `

                  <button
                    type="button"
                    class="add-cart"
                    onclick="addToCart(${product.id})"
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
                      gap:18px;
                      border:1px solid #ddd;
                      border-radius:8px;
                      padding:8px;
                    "
                  >

                    <button
                      type="button"
                      onclick="decreaseQuantity(${product.id})"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <strong>
                      ${quantity}
                    </strong>

                    <button
                      type="button"
                      onclick="increaseQuantity(${product.id})"
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


      productGrid.appendChild(card);

    }
  );

}


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(productId) {

  const product =
    products.find(
      item =>
        item.id === productId
    );


  if (!product) {

    alert(
      "Product could not be found."
    );

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


  saveCart();

  updateCart();

  loadProducts();

}


// ==========================================
// INCREASE
// ==========================================

function increaseQuantity(productId) {

  const item =
    cart.find(
      product =>
        product.id === productId
    );


  if (!item) {

    addToCart(productId);

    return;

  }


  item.quantity += 1;


  saveCart();

  updateCart();

  loadProducts();

}


// ==========================================
// DECREASE
// ==========================================

function decreaseQuantity(productId) {

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


  saveCart();

  updateCart();

  loadProducts();

}


// ==========================================
// REMOVE FROM CART
// ==========================================

function removeFromCart(productId) {

  cart =
    cart.filter(
      item =>
        item.id !== productId
    );


  saveCart();

  updateCart();

  loadProducts();

}


// ==========================================
// CART TOTAL
// ==========================================

function getCartQuantity() {

  return cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

}


function getCartTotal() {

  return cart.reduce(
    (total, item) =>
      total +
      item.price *
      item.quantity,
    0
  );

}


// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {

  const cartCount =
    document.getElementById(
      "cart-count"
    );

  const cartItems =
    document.getElementById(
      "cart-items"
    );

  const cartTotal =
    document.getElementById(
      "cart-total"
    );


  if (cartCount) {

    cartCount.textContent =
      getCartQuantity();

  }


  if (cartTotal) {

    cartTotal.textContent =
      formatPrice(
        getCartTotal()
      );

  }


  if (!cartItems) {
    return;
  }


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


  cart.forEach(
    item => {

      const row =
        document.createElement(
          "div"
        );


      row.className =
        "cart-item";


      row.innerHTML = `

        <div
          class="cart-item-info"
        >

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
            onclick="decreaseQuantity(${item.id})"
          >
            −
          </button>

          <span>
            ${item.quantity}
          </span>

          <button
            type="button"
            onclick="increaseQuantity(${item.id})"
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


      cartItems.appendChild(row);

    }
  );

}


// ==========================================
// OPEN CART
// ==========================================

function openCart() {

  const overlay =
    document.getElementById(
      "cart-overlay"
    );


  if (!overlay) {
    return;
  }


  updateCart();


  overlay.classList.add(
    "active"
  );


  document.body.style.overflow =
    "hidden";

}


// ==========================================
// CLOSE CART
// ==========================================

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


  document.body.style.overflow =
    "";

}


// ==========================================
// WISHLIST
// ==========================================

function toggleWishlist(productId) {

  const index =
    wishlist.indexOf(
      productId
    );


  if (index === -1) {

    wishlist.push(productId);

  } else {

    wishlist.splice(
      index,
      1
    );

  }


  saveWishlist();

  loadProducts();

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


  cart.forEach(
    item => {

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

    }
  );


  message +=
    "Grand Total: ₹" +
    formatPrice(
      getCartTotal()
    );


  const url =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(
      message
    );


  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

}


// ==========================================
// CLICK OUTSIDE CART
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


    if (
      !overlay ||
      !panel
    ) {
      return;
    }


    if (
      overlay.classList.contains(
        "active"
      ) &&
      !panel.contains(
        event.target
      ) &&
      (!cartButton ||
        !cartButton.contains(
          event.target
        ))
    ) {

      closeCart();

    }

  }
);


// ==========================================
// ESC KEY
// ==========================================

document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key === "Escape"
    ) {

      closeCart();

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
