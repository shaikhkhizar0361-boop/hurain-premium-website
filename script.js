// ======================================================
// HURAIN - FINAL SCRIPT.JS
// PRODUCTS + SEARCH + DETAILS + CART + WISHLIST
// CHECKOUT + WHATSAPP ORDER
// ======================================================

const WHATSAPP_NUMBER = "919921181213";
const DELIVERY_CHARGE = 100;


// ======================================================
// PRODUCTS (loaded live from Supabase — see loadProductsFromSupabase)
// ======================================================

let products = [];
let productVariants = {};
let selectedVariantByProduct = {};


function getVariants(productId) {
  return productVariants[Number(productId)] || [];
}


function getSelectedVariant(productId) {

  const variants =
    getVariants(productId);

  if (!variants.length) return null;

  const selectedId =
    selectedVariantByProduct[Number(productId)];

  return (
    variants.find(function(v) { return v.id === selectedId; }) ||
    variants[0]
  );
}

let productsLoaded = false;


async function loadHeroImage() {

  try {

    const { data, error } =
      await supabaseClient
        .from("site_settings")
        .select("value")
        .eq("key", "hero_image_url")
        .maybeSingle();

    if (error || !data || !data.value) return;

    const heroSection =
      document.querySelector(".hero-section");

    if (heroSection) {

      heroSection.style.backgroundImage =
        "linear-gradient(90deg, rgba(0,0,0,0.92), rgba(0,0,0,0.58), rgba(0,0,0,0.20)), url('" +
        data.value +
        "')";
    }

  } catch (err) {

    console.error("Failed to load homepage banner image:", err);
  }
}


async function loadProductsFromSupabase() {

  const grid =
    document.getElementById("product-grid");

  if (grid && !productsLoaded) {
    grid.innerHTML = `
      <div class="empty-products">
        <div>✨</div>
        <h3>Loading products...</h3>
      </div>
    `;
  }

  const { data, error } =
    await supabaseClient
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("id", { ascending: false });

  if (error) {
    console.error("Failed to load products:", error);

    if (grid) {
      grid.innerHTML = `
        <div class="empty-products">
          <div>⚠️</div>
          <h3>Could not load products</h3>
          <p>Please refresh the page.</p>
        </div>
      `;
    }

    return;
  }

  products = (data || []).map(function(row) {
    return {
      id: row.id,
      name: row.name,
      category: row.category,
      price: Number(row.price),
      salePrice:
        row.sale_price !== null && row.sale_price !== undefined
          ? Number(row.sale_price)
          : null,
      image: row.image_url || "",
      description: row.description || "",
      stock: Number(row.stock || 0)
    };
  });


  // Load color variants (if any) for all products in one query.
  try {

    const { data: variantRows } =
      await supabaseClient
        .from("product_variants")
        .select("*")
        .order("id", { ascending: true });

    productVariants = {};

    (variantRows || []).forEach(function(row) {

      const pid = Number(row.product_id);

      if (!productVariants[pid]) {
        productVariants[pid] = [];
      }

      productVariants[pid].push({
        id: row.id,
        colorName: row.color_name,
        image: row.image_url || "",
        stock: Number(row.stock || 0)
      });

    });

  } catch (variantErr) {

    console.error("Failed to load product variants:", variantErr);
    productVariants = {};
  }

  productsLoaded = true;

  loadProducts();
  updateCart();
}


function effectivePrice(product) {
  return (product.salePrice !== null && product.salePrice > 0 && product.salePrice < product.price)
    ? product.salePrice
    : product.price;
}


// ======================================================
// STORAGE
// ======================================================

function loadStorage(key, fallback) {
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

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Save error:", error);
  }
}


let cart = loadStorage("hurain_cart", []);
let wishlist = loadStorage("hurain_wishlist", []);
let orders = loadStorage("hurain_orders", []);

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
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function getProduct(productId) {
  return products.find(function(product) {
    return Number(product.id) === Number(productId);
  });
}


function getCartQuantity() {
  return cart.reduce(function(total, item) {
    return total + Number(item.quantity || 0);
  }, 0);
}


function getCartSubtotal() {
  return cart.reduce(function(total, item) {
    return total +
      Number(item.price || 0) *
      Number(item.quantity || 0);
  }, 0);
}


// ======================================================
// PRODUCT LIST
// ======================================================

function loadProducts() {

  const grid = document.getElementById("product-grid");

  if (!grid) return;

  let visibleProducts = products.slice();

  if (activeCategory !== "all") {
    visibleProducts = visibleProducts.filter(function(product) {
      return product.category === activeCategory;
    });
  }

  if (searchText) {
    visibleProducts = visibleProducts.filter(function(product) {

      const name =
        product.name.toLowerCase();

      const category =
        product.category.toLowerCase();

      return (
        name.includes(searchText) ||
        category.includes(searchText)
      );

    });
  }


  if (!visibleProducts.length) {

    grid.innerHTML = `
      <div class="empty-products">
        <div>✨</div>
        <h3>No Products Found</h3>
        <p>Please try another search.</p>
      </div>
    `;

    return;
  }


  grid.innerHTML = "";


  visibleProducts.forEach(function(product) {

    const cartItem =
      cart.find(function(item) {
        return Number(item.id) === Number(product.id);
      });

    const quantity =
      cartItem ? Number(cartItem.quantity) : 0;


    const favourite =
      wishlist.some(function(id) {
        return Number(id) === Number(product.id);
      });


    const card =
      document.createElement("div");

    card.className = "product-card";


    card.innerHTML = `

      <div class="product-image-wrapper">

        <img
          src="${escapeHtml(product.image)}"
          alt="${escapeHtml(product.name)}"
          loading="lazy"
        >

        <button
          type="button"
          class="wishlist-button"
          data-product-id="${product.id}"
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
          ${
            product.salePrice !== null && product.salePrice > 0 && product.salePrice < product.price
            ? `<span style="text-decoration:line-through;color:#999;font-size:13px;margin-right:6px;">₹${money(product.price)}</span>₹${money(effectivePrice(product))}`
            : `₹${money(product.price)}`
          }
        </div>

        ${
          product.stock <= 0
          ? `<div style="color:#c62828;font-size:12px;font-weight:600;">Out of Stock</div>`
          : (product.stock <= 3
            ? `<div style="color:#e6a700;font-size:12px;font-weight:600;">Only ${product.stock} left</div>`
            : "")
        }

      </div>


      <div class="product-cart-control">

        ${
          getVariants(product.id).length > 0

          ?

          `
          <button type="button" class="add-cart select-options-btn" data-product-id="${product.id}">
            SELECT OPTIONS
          </button>
          `

          :

          product.stock <= 0

          ?

          `
          <button type="button" class="add-cart" disabled style="opacity:.5;cursor:not-allowed;">
            OUT OF STOCK
          </button>
          `

          :

          quantity === 0

          ?

          `
          <button
            type="button"
            class="add-cart"
            data-product-id="${product.id}"
          >
            ADD TO CART
          </button>
          `

          :

          `
          <div class="quantity-control">

            <button
              type="button"
              class="decrease-button"
              data-product-id="${product.id}"
            >
              −
            </button>

            <strong>${quantity}</strong>

            <button
              type="button"
              class="increase-button"
              data-product-id="${product.id}"
              ${quantity >= product.stock ? "disabled style=\"opacity:.5;cursor:not-allowed;\"" : ""}
            >
              +
            </button>

          </div>
          `
        }

      </div>

    `;


    // Product image/info click
    card.querySelector(".product-image-wrapper")
      ?.addEventListener("click", function(event) {

        if (
          event.target.closest(".wishlist-button")
        ) {
          return;
        }

        openProductDetails(product.id);

      });


    card.querySelector(".product-info")
      ?.addEventListener("click", function() {
        openProductDetails(product.id);
      });


    // Wishlist
    card.querySelector(".wishlist-button")
      ?.addEventListener("click", function(event) {

        event.preventDefault();
        event.stopPropagation();

        toggleWishlist(product.id);

      });


    // Add cart
    card.querySelector(".add-cart")
      ?.addEventListener("click", function(event) {

        event.preventDefault();
        event.stopPropagation();

        addToCart(product.id);

      });


    // Select options (products with color variants)
    card.querySelector(".select-options-btn")
      ?.addEventListener("click", function(event) {

        event.preventDefault();
        event.stopPropagation();

        openProductDetails(product.id);

      });


    // Increase
    card.querySelector(".increase-button")
      ?.addEventListener("click", function(event) {

        event.preventDefault();
        event.stopPropagation();

        increaseQuantity(product.id);

      });


    // Decrease
    card.querySelector(".decrease-button")
      ?.addEventListener("click", function(event) {

        event.preventDefault();
        event.stopPropagation();

        decreaseQuantity(product.id);

      });


    grid.appendChild(card);

  });

}


// ======================================================
// CATEGORY
// ======================================================

function filterProducts(category) {

  activeCategory =
    category || "all";

  loadProducts();

  document.getElementById("products")
    ?.scrollIntoView({
      behavior: "smooth"
    });
}


function showAllProducts() {

  activeCategory = "all";
  searchText = "";

  const input =
    document.getElementById("search-input");

  if (input) {
    input.value = "";
  }

  loadProducts();

  document.getElementById("products")
    ?.scrollIntoView({
      behavior: "smooth"
    });
}


// ======================================================
// SEARCH
// ======================================================

function searchProducts(value) {

  searchText =
    String(value || "")
      .trim()
      .toLowerCase();

  loadProducts();
}


// ======================================================
// PRODUCT DETAILS
// SIMPLE + SAFE MODAL
// ======================================================

function openProductDetails(productId) {

  const product =
    getProduct(productId);

  if (!product) {
    console.error("Product not found:", productId);
    return;
  }


  const modal =
    document.getElementById("product-modal");

  const content =
    document.getElementById("product-detail-content");


  if (!modal || !content) {
    console.error(
      "Product modal elements are missing."
    );
    return;
  }


  const variants =
    getVariants(productId);

  const activeVariant =
    getSelectedVariant(productId);

  if (activeVariant) {
    selectedVariantByProduct[Number(productId)] = activeVariant.id;
  }

  const displayImage =
    (activeVariant && activeVariant.image) || product.image;

  const displayStock =
    activeVariant ? activeVariant.stock : product.stock;


  const cartItem =
    cart.find(function(item) {
      return (
        Number(item.id) === Number(productId) &&
        (item.variantId || null) === (activeVariant ? activeVariant.id : null)
      );
    });


  const quantity =
    cartItem ? Number(cartItem.quantity) : 0;


  const favourite =
    wishlist.some(function(id) {
      return Number(id) === Number(productId);
    });


  content.innerHTML = `

    <div class="product-detail">

      <div class="product-detail-image">

        <img
          src="${escapeHtml(displayImage)}"
          alt="${escapeHtml(product.name)}"
        >

      </div>


      <div class="product-detail-info">

        <div class="product-category">
          ${escapeHtml(product.category)}
        </div>

        <h2>
          ${escapeHtml(product.name)}
        </h2>

        <div class="product-price">
          ${
            product.salePrice !== null && product.salePrice > 0 && product.salePrice < product.price
            ? `<span style="text-decoration:line-through;color:#999;font-size:14px;margin-right:6px;">₹${money(product.price)}</span>₹${money(effectivePrice(product))}`
            : `₹${money(product.price)}`
          }
        </div>

        ${
          variants.length > 0
          ? `
          <div style="margin:10px 0;">

            <div style="font-size:13px;font-weight:600;margin-bottom:6px;">
              Color: ${escapeHtml(activeVariant ? activeVariant.colorName : "")}
            </div>

            <div style="display:flex;gap:8px;flex-wrap:wrap;">

              ${variants.map(function(v) {

                const isSelected =
                  activeVariant && v.id === activeVariant.id;

                return `
                  <button
                    type="button"
                    class="variant-swatch-btn"
                    data-variant-id="${v.id}"
                    style="padding:7px 14px;border-radius:20px;font-size:13px;cursor:pointer;
                           border:1px solid ${isSelected ? "#000" : "#ccc"};
                           background:${isSelected ? "#000" : "#fff"};
                           color:${isSelected ? "#fff" : "#333"};
                           ${v.stock <= 0 ? "opacity:.45;" : ""}"
                  >
                    ${escapeHtml(v.colorName)}${v.stock <= 0 ? " (Out of stock)" : ""}
                  </button>
                `;

              }).join("")}

            </div>

          </div>
          `
          : ""
        }

        <div style="font-weight:600;margin:4px 0;color:${displayStock <= 0 ? '#c62828' : (displayStock <= 3 ? '#e6a700' : '#2e7d32')};">
          ${displayStock <= 0 ? "Out of Stock" : "In Stock: " + displayStock}
        </div>

        <p>
          ${escapeHtml(product.description)}
        </p>


        <button
          type="button"
          id="detail-wishlist-button"
        >
          ${
            favourite
              ? "❤️ FAVOURITED"
              : "♡ ADD TO FAVOURITES"
          }
        </button>


        <div class="product-detail-quantity">

          <span>Quantity</span>

          <div class="quantity-control">

            <button
              type="button"
              id="detail-decrease"
            >
              −
            </button>

            <strong id="detail-quantity">
              ${quantity}
            </strong>

            <button
              type="button"
              id="detail-increase"
            >
              +
            </button>

          </div>

        </div>


        <div class="product-detail-buttons">

          <button
            type="button"
            class="add-cart"
            id="detail-add-cart"
            ${displayStock <= 0 ? 'disabled style="opacity:.5;cursor:not-allowed;"' : ""}
          >
            ${displayStock <= 0 ? "OUT OF STOCK" : "ADD TO CART"}
          </button>

          <button
            type="button"
            class="btn primary"
            id="detail-order-now"
            ${displayStock <= 0 ? 'disabled style="opacity:.5;cursor:not-allowed;"' : ""}
          >
            ORDER NOW
          </button>

        </div>

      </div>

    </div>

  `;


  // Color swatch selection
  content.querySelectorAll(".variant-swatch-btn").forEach(function(btn) {

    btn.addEventListener("click", function() {

      selectedVariantByProduct[Number(productId)] =
        Number(btn.dataset.variantId);

      openProductDetails(productId);

    });

  });


  // Wishlist
  document
    .getElementById("detail-wishlist-button")
    ?.addEventListener("click", function() {

      toggleWishlist(product.id);

      openProductDetails(product.id);

    });


  // Quantity +
  document
    .getElementById("detail-increase")
    ?.addEventListener("click", function() {

      increaseQuantity(product.id, activeVariant ? activeVariant.id : null);

      openProductDetails(product.id);

    });


  // Quantity -
  document
    .getElementById("detail-decrease")
    ?.addEventListener("click", function() {

      decreaseQuantity(product.id, activeVariant ? activeVariant.id : null);

      openProductDetails(product.id);

    });


  // Add to cart
  document
    .getElementById("detail-add-cart")
    ?.addEventListener("click", function() {

      addToCart(product.id, activeVariant ? activeVariant.id : null);

      openProductDetails(product.id);

    });


  // Order now
  document
    .getElementById("detail-order-now")
    ?.addEventListener("click", function() {

      orderNow(product.id, activeVariant ? activeVariant.id : null);

    });


  modal.classList.add("active");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow = "hidden";
}


function refreshProductDetails(productId) {
  openProductDetails(productId);
}


function closeProductDetails() {

  const modal =
    document.getElementById("product-modal");

  if (!modal) return;

  modal.classList.remove("active");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow = "";
}


// ======================================================
// CART
// ======================================================

function addToCart(productId, variantId) {

  variantId = variantId || null;

  const product =
    getProduct(productId);

  if (!product) return;

  const variants =
    getVariants(productId);

  const activeVariant =
    variantId
      ? variants.find(function(v) { return v.id === variantId; })
      : null;

  if (variants.length > 0 && !activeVariant) {
    alert("Please select a color first.");
    return;
  }

  const stockLimit =
    activeVariant ? activeVariant.stock : product.stock;

  if (stockLimit <= 0) {
    alert("This product is out of stock.");
    return;
  }


  const existing =
    cart.find(function(item) {
      return (
        Number(item.id) === Number(productId) &&
        (item.variantId || null) === (variantId || null)
      );
    });


  if (existing) {

    if (existing.quantity >= stockLimit) {
      alert("Only " + stockLimit + " available.");
      return;
    }

    existing.quantity += 1;

  } else {

    cart.push({
      id: product.id,
      name: product.name,
      category: product.category,
      price: effectivePrice(product),
      image: (activeVariant && activeVariant.image) || product.image,
      quantity: 1,
      variantId: variantId,
      color: activeVariant ? activeVariant.colorName : null
    });

  }


  saveStorage(
    "hurain_cart",
    cart
  );

  updateCart();
  loadProducts();
}


function increaseQuantity(productId, variantId) {

  variantId = variantId || null;

  const product =
    getProduct(productId);

  const variants =
    getVariants(productId);

  const activeVariant =
    variantId
      ? variants.find(function(v) { return v.id === variantId; })
      : null;

  const item =
    cart.find(function(item) {
      return (
        Number(item.id) === Number(productId) &&
        (item.variantId || null) === (variantId || null)
      );
    });


  if (!item) {
    addToCart(productId, variantId);
    return;
  }

  const stockLimit =
    activeVariant ? activeVariant.stock : (product ? product.stock : Infinity);

  if (item.quantity >= stockLimit) {
    alert("Only " + stockLimit + " available.");
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


function decreaseQuantity(productId, variantId) {

  variantId = variantId || null;

  const item =
    cart.find(function(item) {
      return (
        Number(item.id) === Number(productId) &&
        (item.variantId || null) === (variantId || null)
      );
    });


  if (!item) return;


  item.quantity -= 1;


  if (item.quantity <= 0) {

    cart =
      cart.filter(function(cartItem) {
        return cartItem !== item;
      });

  }


  saveStorage(
    "hurain_cart",
    cart
  );

  updateCart();
  loadProducts();
}


function removeFromCart(productId, variantId) {

  variantId = variantId || null;

  cart =
    cart.filter(function(item) {
      return !(
        Number(item.id) === Number(productId) &&
        (item.variantId || null) === (variantId || null)
      );
    });


  saveStorage(
    "hurain_cart",
    cart
  );

  updateCart();
  loadProducts();
}


// ======================================================
// CART UI
// ======================================================

function updateCart() {

  const count =
    document.getElementById("cart-count");

  const total =
    document.getElementById("cart-total");

  const items =
    document.getElementById("cart-items");


  if (count) {
    count.textContent =
      getCartQuantity();
  }


  if (total) {
    total.textContent =
      money(getCartSubtotal());
  }


  const modalTotal =
    document.getElementById("cart-modal-total");

  if (modalTotal) {
    modalTotal.textContent =
      money(getCartSubtotal());
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


  items.innerHTML = "";


  cart.forEach(function(item) {

    const row =
      document.createElement("div");

    row.className =
      "cart-item";


    row.innerHTML = `

      <div class="cart-item-info" style="display:flex;align-items:center;gap:12px;">

        <img
          src="${escapeHtml(item.image || '')}"
          alt="${escapeHtml(item.name)}"
          style="width:50px;height:50px;object-fit:cover;border-radius:8px;flex-shrink:0;background:#f0f0f0;"
          onerror="this.style.display='none';"
        >

        <div>

          <strong>
            ${escapeHtml(item.name)}
          </strong>

          ${item.color ? `<br><small style="color:#666;">Color: ${escapeHtml(item.color)}</small>` : ""}

          <br>

          <small>
            ₹${money(item.price)}
          </small>

        </div>

      </div>


      <div class="cart-item-actions">

        <button
          type="button"
          class="cart-minus"
        >
          −
        </button>

        <span>
          ${item.quantity}
        </span>

        <button
          type="button"
          class="cart-plus"
        >
          +
        </button>

      </div>


      <button
        type="button"
        class="cart-remove"
      >
        Remove
      </button>

    `;


    row.querySelector(".cart-minus")
      ?.addEventListener("click", function() {
        decreaseQuantity(item.id, item.variantId || null);
      });


    row.querySelector(".cart-plus")
      ?.addEventListener("click", function() {
        increaseQuantity(item.id, item.variantId || null);
      });


    row.querySelector(".cart-remove")
      ?.addEventListener("click", function() {
        removeFromCart(item.id, item.variantId || null);
      });


    items.appendChild(row);

  });

}


// ======================================================
// CART OPEN / CLOSE
// ======================================================

function openCart() {

  updateCart();

  const overlay =
    document.getElementById("cart-overlay");

  if (!overlay) return;

  overlay.classList.add("active");

  overlay.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow = "hidden";
}


function closeCart() {

  const overlay =
    document.getElementById("cart-overlay");

  if (!overlay) return;

  overlay.classList.remove("active");

  overlay.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow = "";
}


// ======================================================
// CHECKOUT
// ======================================================

function goToCheckout() {

  if (!cart.length) {

    alert(
      "Your cart is empty. Please add a product first."
    );

    return;
  }


  closeCart();


  const checkout =
    document.getElementById("checkout-page");


  if (!checkout) {
    alert("Checkout page is missing.");
    return;
  }


  renderCheckout();


  checkout.style.display =
    "block";


  checkout.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


function openCheckout() {
  goToCheckout();
}


function closeCheckout() {

  const checkout =
    document.getElementById("checkout-page");

  if (!checkout) return;

  checkout.style.display =
    "none";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ======================================================
// CHECKOUT SUMMARY
// ======================================================

function renderCheckout() {

  const itemsContainer =
    document.getElementById("checkout-items");

  const productTotal =
    document.getElementById("checkout-product-total");

  const delivery =
    document.getElementById("checkout-delivery");

  const grandTotal =
    document.getElementById("checkout-grand-total");


  const subtotal =
    getCartSubtotal();


  const deliveryCharge =
    cart.length ? DELIVERY_CHARGE : 0;


  const total =
    subtotal + deliveryCharge;


  if (itemsContainer) {

    itemsContainer.innerHTML =
      cart.map(function(item) {

        return `

          <div class="summary-row">

            <span>
              ${escapeHtml(item.name)}
              × ${item.quantity}
            </span>

            <strong>
              ₹${money(
                Number(item.price) *
                Number(item.quantity)
              )}
            </strong>

          </div>

        `;

      }).join("");

  }


  if (productTotal) {
    productTotal.textContent =
      money(subtotal);
  }


  if (delivery) {
    delivery.textContent =
      money(deliveryCharge);
  }


  if (grandTotal) {
    grandTotal.textContent =
      money(total);
  }
}


// ======================================================
// PINCODE AUTO-FILL (City / State) — India Post API
// ======================================================

let pincodeLookupInProgress = false;


async function lookupPincode() {

  const pincodeInput =
    document.getElementById("customer-pincode");

  const cityInput =
    document.getElementById("customer-city");

  const stateSelect =
    document.getElementById("customer-state");

  const errorEl =
    document.getElementById("customer-pincode-error");

  if (!pincodeInput) return;

  const pincode =
    pincodeInput.value.replace(/\D/g, "");

  if (errorEl) {
    errorEl.textContent = "";
    errorEl.style.color = "";
  }

  if (pincode.length !== 6) return;

  pincodeLookupInProgress = true;

  try {

    const response =
      await fetch(
        "https://api.postalpincode.in/pincode/" + pincode
      );

    const data =
      await response.json();

    const result =
      data && data[0];

    if (
      result &&
      result.Status === "Success" &&
      result.PostOffice &&
      result.PostOffice.length > 0
    ) {

      const postOffice =
        result.PostOffice[0];

      if (cityInput) {
        cityInput.value =
          postOffice.District || postOffice.Name || "";
      }

      if (stateSelect) {

        const stateName =
          postOffice.State || "";

        let matched = false;

        for (const option of stateSelect.options) {
          if (option.value === stateName) {
            stateSelect.value = stateName;
            matched = true;
            break;
          }
        }

        if (!matched) {
          stateSelect.value = "Other";
        }
      }

    } else {

      if (errorEl) {
        errorEl.style.color = "#c62828";
        errorEl.textContent =
          "This pincode doesn't seem to exist. Please check and re-enter.";
      }

      if (cityInput) cityInput.value = "";
    }

  } catch (e) {

    // Network error — fail silently, let the user fill city/state manually.

  } finally {

    pincodeLookupInProgress = false;
  }
}


// ======================================================
// CHECKOUT VALIDATION
// ======================================================

function clearCheckoutErrors() {

  const ids = [
    "customer-name-error",
    "customer-mobile-error",
    "customer-email-error",
    "customer-address-error",
    "customer-area-error",
    "customer-city-error",
    "customer-state-error",
    "customer-pincode-error"
  ];


  ids.forEach(function(id) {

    const element =
      document.getElementById(id);

    if (element) {
      element.textContent = "";
    }

  });
}


function setCheckoutError(id, message) {

  const element =
    document.getElementById(id);

  if (element) {
    element.textContent =
      message;
  }
}


// ======================================================
// SUBMIT CHECKOUT
// ======================================================

function submitCheckout(event) {

  if (event) {
    event.preventDefault();
  }


  clearCheckoutErrors();


  if (!cart.length) {

    alert("Your cart is empty.");

    return;
  }


  const name =
    document.getElementById("customer-name")
      ?.value.trim() || "";


  const mobile =
    document.getElementById("customer-mobile")
      ?.value.replace(/\D/g, "") || "";


  const email =
    document.getElementById("customer-email")
      ?.value.trim() || "";


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
      ?.value || "";


  const pincode =
    document.getElementById("customer-pincode")
      ?.value.replace(/\D/g, "") || "";


  const note =
    document.getElementById("delivery-note")
      ?.value.trim() || "";


  let valid = true;


  if (name.length < 2) {

    setCheckoutError(
      "customer-name-error",
      "Please enter your full name."
    );

    valid = false;
  }


  if (!/^[6-9]\d{9}$/.test(mobile)) {

    setCheckoutError(
      "customer-mobile-error",
      "Please enter a valid 10-digit mobile number."
    );

    valid = false;
  }


  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {

    setCheckoutError(
      "customer-email-error",
      "Please enter a valid email address."
    );

    valid = false;
  }


  if (address.length < 2) {

    setCheckoutError(
      "customer-address-error",
      "Please enter your house / flat number."
    );

    valid = false;
  }


  if (area.length < 2) {

    setCheckoutError(
      "customer-area-error",
      "Please enter your area / street."
    );

    valid = false;
  }


  if (city.length < 2) {

    setCheckoutError(
      "customer-city-error",
      "Please enter your city."
    );

    valid = false;
  }


  if (!state) {

    setCheckoutError(
      "customer-state-error",
      "Please select your state."
    );

    valid = false;
  }


  if (!/^\d{6}$/.test(pincode)) {

    setCheckoutError(
      "customer-pincode-error",
      "Please enter a valid 6-digit pincode."
    );

    valid = false;
  }


  if (!valid) return;


  createWhatsAppOrder({
    name,
    mobile,
    email,
    address,
    area,
    city,
    state,
    pincode,
    note
  });

}


// ======================================================
// WHATSAPP ORDER
// ======================================================

async function createWhatsAppOrder(customer) {

  const submitButton =
    document.querySelector("#checkout-form button[type=submit]");

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.dataset.originalText = submitButton.textContent;
    submitButton.textContent = "Placing order...";
  }


  // Re-check stock and deduct it atomically for the whole cart,
  // right before the order is confirmed. This prevents overselling
  // even if two customers check out at almost the same time.
  const itemsForStockCheck =
    cart.map(function(item) {
      return {
        id: item.id,
        quantity: item.quantity,
        variant_id: item.variantId || null
      };
    });

  const { error: stockError } =
    await supabaseClient.rpc(
      "place_order_deduct_stock",
      { items: itemsForStockCheck }
    );

  if (stockError) {

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = submitButton.dataset.originalText || "Place Order";
    }

    const message = stockError.message || "";

    if (message.includes("INSUFFICIENT_STOCK")) {

      const parts = message.split(":");
      const productName = parts[2] || "an item";
      const available = parts[3] || "0";

      alert(
        "Sorry, only " + available + " of \"" + productName +
        "\" is available now. Please update the quantity in your cart."
      );

    } else {

      alert("Could not place order right now. Please try again.");
    }

    // Refresh products so the customer sees up-to-date stock
    await loadProductsFromSupabase();

    return;
  }

  if (submitButton) {
    submitButton.disabled = false;
    submitButton.textContent = submitButton.dataset.originalText || "Place Order";
  }


  const subtotal =
    getCartSubtotal();


  const delivery =
    DELIVERY_CHARGE;


  const total =
    subtotal + delivery;


  const orderId =
    generateOrderId();


  const order = {

    id: orderId,

    date:
      new Date().toISOString(),

    status:
      "Order Placed",

    customer:
      customer,

    items:
      cart.map(function(item) {
        return {
          ...item
        };
      }),

    subtotal:
      subtotal,

    delivery:
      delivery,

    total:
      total

  };


  orders.unshift(order);


  saveStorage(
    "hurain_orders",
    orders
  );


  // Save the order to Supabase too, so it shows up in the
  // admin panel's Order History (this device-only localStorage
  // list is kept only for the customer's own "My Orders" view).
  try {

    await supabaseClient
      .from("orders")
      .insert({
        order_number: orderId,
        customer_name: customer.name,
        customer_mobile: customer.mobile,
        customer_email: customer.email,
        customer_address: customer.address,
        customer_area: customer.area,
        customer_city: customer.city,
        customer_state: customer.state,
        customer_pincode: customer.pincode,
        customer_note: customer.note || null,
        items: cart.map(function(item) {
          return {
            name: item.name,
            category: item.category,
            quantity: item.quantity,
            price: item.price,
            image: item.image || "",
            color: item.color || null
          };
        }),
        subtotal: subtotal,
        delivery: delivery,
        total: total
      });

  } catch (err) {

    console.error("Failed to save order history:", err);
  }


  let message =
    "🛍️ *HURAIN NEW ORDER*\n\n";


  message +=
    "Order ID: " +
    orderId +
    "\n\n";


  message +=
    "👤 *CUSTOMER DETAILS*\n";


  message +=
    "Name: " +
    customer.name +
    "\n";


  message +=
    "Mobile: " +
    customer.mobile +
    "\n";


  message +=
    "Email: " +
    customer.email +
    "\n\n";


  message +=
    "📍 *DELIVERY ADDRESS*\n";


  message +=
    customer.address +
    "\n";


  message +=
    "Area: " +
    customer.area +
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
    "\n";


  if (customer.note) {

    message +=
      "Delivery Note: " +
      customer.note +
      "\n";

  }


  message +=
    "\n🛒 *ORDER DETAILS*\n\n";


  cart.forEach(function(item, index) {

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
      money(item.price) +
      "\n";


    message +=
      "Product Total: ₹" +
      money(
        Number(item.price) *
        Number(item.quantity)
      ) +
      "\n\n";

  });


  message +=
    "Product Total: ₹" +
    money(subtotal) +
    "\n";


  message +=
    "Delivery: ₹" +
    money(delivery) +
    "\n";


  message +=
    "Grand Total: ₹" +
    money(total) +
    "\n\n";


  message +=
    "Thank you for shopping with HURAIN ❤️";


  const whatsappURL =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);


  // Open WhatsApp
  window.open(
    whatsappURL,
    "_blank"
  );


  // Clear cart
  cart = [];


  saveStorage(
    "hurain_cart",
    cart
  );


  updateCart();


  closeCheckout();


  setTimeout(function() {

    alert(
      "Order details are ready on WhatsApp.\n\nOrder ID: " +
      orderId
    );

  }, 500);


  // Refresh stock numbers from the database now that this order
  // has deducted them, so the customer site shows accurate stock.
  loadProductsFromSupabase();

}


// ======================================================
// ORDER ID
// ======================================================

function generateOrderId() {

  const random =
    Math.floor(
      1000 +
      Math.random() * 9000
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


// ======================================================
// ORDER NOW
// ======================================================

function orderNow(productId, variantId) {

  variantId = variantId || null;

  const product =
    getProduct(productId);


  if (!product) return;


  const variants =
    getVariants(productId);

  const activeVariant =
    variantId
      ? variants.find(function(v) { return v.id === variantId; })
      : null;


  const existing =
    cart.find(function(item) {
      return (
        Number(item.id) === Number(productId) &&
        (item.variantId || null) === (variantId || null)
      );
    });


  if (!existing) {

    cart.push({

      id: product.id,

      name: product.name,

      category: product.category,

      price: effectivePrice(product),

      image: (activeVariant && activeVariant.image) || product.image,

      quantity: 1,

      variantId: variantId,

      color: activeVariant ? activeVariant.colorName : null

    });

  }


  saveStorage(
    "hurain_cart",
    cart
  );


  updateCart();

  closeProductDetails();

  openCheckout();

}


// ======================================================
// WISHLIST
// ======================================================

function toggleWishlist(productId) {

  const index =
    wishlist.findIndex(function(id) {

      return Number(id) ===
        Number(productId);

    });


  if (index === -1) {

    wishlist.push(productId);

  } else {

    wishlist.splice(index, 1);

  }


  saveStorage(
    "hurain_wishlist",
    wishlist
  );


  loadProducts();
}


function openWishlist() {

  const modal =
    document.getElementById("wishlist-modal");


  const container =
    document.getElementById("wishlist-items");


  if (!modal || !container) {
    return;
  }


  const favouriteProducts =
    products.filter(function(product) {

      return wishlist.some(function(id) {

        return Number(id) ===
          Number(product.id);

      });

    });


  if (!favouriteProducts.length) {

    container.innerHTML = `
      <p>Your favourite products will appear here.</p>
    `;

  } else {

    container.innerHTML =
      favouriteProducts.map(function(product) {

        return `

          <div class="wishlist-item">

            <img
              src="${escapeHtml(product.image)}"
              alt="${escapeHtml(product.name)}"
            >

            <div>

              <strong>
                ${escapeHtml(product.name)}
              </strong>

              <div>
                ₹${money(product.price)}
              </div>

            </div>

            <button
              type="button"
              class="wishlist-view"
              data-product-id="${product.id}"
            >
              VIEW
            </button>

          </div>

        `;

      }).join("");


    container
      .querySelectorAll(".wishlist-view")
      .forEach(function(button) {

        button.addEventListener(
          "click",
          function() {

            const id =
              Number(
                button.dataset.productId
              );

            closeWishlist();

            openProductDetails(id);

          }
        );

      });

  }


  modal.classList.add("active");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow =
    "hidden";
}


function closeWishlist() {

  const modal =
    document.getElementById("wishlist-modal");

  if (!modal) return;

  modal.classList.remove("active");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow = "";
}


// ======================================================
// SEARCH MODAL
// ======================================================

function openSearch() {

  const modal =
    document.getElementById("search-modal");


  if (!modal) return;


  modal.classList.add("active");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";


  setTimeout(function() {

    document
      .getElementById("search-input")
      ?.focus();

  }, 100);

}


function closeSearch() {

  const modal =
    document.getElementById("search-modal");

  if (!modal) return;


  modal.classList.remove("active");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow = "";
}


// ======================================================
// ACCOUNT
// ======================================================

function openAccount() {

  const modal =
    document.getElementById("account-modal");

  if (!modal) return;


  modal.classList.add("active");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";
}


function closeAccount() {

  const modal =
    document.getElementById("account-modal");

  if (!modal) return;


  modal.classList.remove("active");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow = "";
}


function mobileLogin() {

  // Deprecated: replaced by email + OTP login below.
  // Kept as a no-op in case any old reference calls it.
}


// ======================================================
// EMAIL + OTP LOGIN
// ======================================================

async function sendLoginOtp() {

  const input =
    document.getElementById("login-email");

  const messageEl =
    document.getElementById("accountLoginMessage");

  const button =
    document.getElementById("sendOtpButton");

  if (!input) return;

  const email =
    input.value.trim();

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {

    if (messageEl) {
      messageEl.style.color = "#c62828";
      messageEl.textContent = "Please enter a valid email address.";
    }

    return;
  }

  if (button) {
    button.disabled = true;
    button.textContent = "Sending...";
  }

  if (messageEl) {
    messageEl.style.color = "#555";
    messageEl.textContent = "";
  }

  const { error } =
    await supabaseClient.auth.signInWithOtp({
      email: email,
      options: { shouldCreateUser: true }
    });

  if (button) {
    button.disabled = false;
    button.textContent = "SEND OTP";
  }

  if (error) {

    if (messageEl) {
      messageEl.style.color = "#c62828";
      messageEl.textContent = "Could not send OTP: " + error.message;
    }

    return;
  }

  localStorage.setItem("hurain_login_email_pending", email);

  document.getElementById("account-email-step").style.display = "none";
  document.getElementById("account-otp-step").style.display = "block";

  if (messageEl) {
    messageEl.style.color = "#1a9c56";
    messageEl.textContent = "OTP sent to " + email + ". Check your inbox (and spam folder).";
  }
}


async function verifyLoginOtp() {

  const otpInput =
    document.getElementById("login-otp");

  const messageEl =
    document.getElementById("accountLoginMessage");

  const button =
    document.getElementById("verifyOtpButton");

  const email =
    localStorage.getItem("hurain_login_email_pending");

  if (!otpInput || !email) return;

  const token =
    otpInput.value.trim();

  if (!/^\d{6}$/.test(token)) {

    if (messageEl) {
      messageEl.style.color = "#c62828";
      messageEl.textContent = "Please enter the 6-digit OTP.";
    }

    return;
  }

  if (button) {
    button.disabled = true;
    button.textContent = "Verifying...";
  }

  const { data, error } =
    await supabaseClient.auth.verifyOtp({
      email: email,
      token: token,
      type: "email"
    });

  if (button) {
    button.disabled = false;
    button.textContent = "VERIFY & LOGIN";
  }

  if (error) {

    if (messageEl) {
      messageEl.style.color = "#c62828";
      messageEl.textContent = "Invalid or expired OTP. Please try again.";
    }

    return;
  }

  localStorage.removeItem("hurain_login_email_pending");

  showLoggedInAccountView(email);
}


function resetLoginForm() {

  document.getElementById("account-email-step").style.display = "block";
  document.getElementById("account-otp-step").style.display = "none";

  const messageEl =
    document.getElementById("accountLoginMessage");

  if (messageEl) messageEl.textContent = "";

  const otpInput =
    document.getElementById("login-otp");

  if (otpInput) otpInput.value = "";
}


function showLoggedInAccountView(email) {

  const loggedOutView =
    document.getElementById("account-logged-out-view");

  const loggedInView =
    document.getElementById("account-logged-in-view");

  const emailDisplay =
    document.getElementById("loggedInEmailDisplay");

  if (loggedOutView) loggedOutView.style.display = "none";
  if (loggedInView) loggedInView.style.display = "block";
  if (emailDisplay) emailDisplay.textContent = email;
}


async function logoutCustomer() {

  await supabaseClient.auth.signOut();

  const loggedOutView =
    document.getElementById("account-logged-out-view");

  const loggedInView =
    document.getElementById("account-logged-in-view");

  if (loggedOutView) loggedOutView.style.display = "block";
  if (loggedInView) loggedInView.style.display = "none";

  resetLoginForm();
}


async function checkCustomerLoginOnLoad() {

  const { data } =
    await supabaseClient.auth.getSession();

  if (data && data.session && data.session.user && data.session.user.email) {
    showLoggedInAccountView(data.session.user.email);
  }
}


// ======================================================
// ORDERS
// ======================================================

function showOrders() {

  const ordersList =
    document.getElementById("orders-list");


  const overlay =
    document.getElementById("orders-overlay");


  if (!ordersList || !overlay) {
    return;
  }


  if (!orders.length) {

    ordersList.innerHTML = `
      <p>No orders found.</p>
    `;

  } else {

    ordersList.innerHTML =
      orders.map(function(order) {

        return `

          <div class="order-card">

            <h3>
              ${escapeHtml(order.id)}
            </h3>

            <p>
              ${new Date(order.date)
                .toLocaleString("en-IN")}
            </p>

            <strong>
              Status:
              ${escapeHtml(order.status)}
            </strong>

            <p>
              Total:
              ₹${money(order.total)}
            </p>

          </div>

        `;

      }).join("");

  }


  overlay.classList.add("active");

  overlay.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";
}


function closeOrders() {

  const overlay =
    document.getElementById("orders-overlay");


  if (!overlay) return;


  overlay.classList.remove("active");

  overlay.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow = "";
}


// ======================================================
// BACKDROP
// ======================================================

document.addEventListener(
  "click",
  function(event) {

    const modalMap = {

      "product-modal":
        closeProductDetails,

      "cart-overlay":
        closeCart,

      "search-modal":
        closeSearch,

      "account-modal":
        closeAccount,

      "wishlist-modal":
        closeWishlist,

      "orders-overlay":
        closeOrders

    };


    Object.keys(modalMap)
      .forEach(function(id) {

        const element =
          document.getElementById(id);


        if (
          element &&
          event.target === element
        ) {

          modalMap[id]();

        }

      });

  }
);


// ======================================================
// ESC KEY
// ======================================================

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key !== "Escape") {
      return;
    }


    closeProductDetails();
    closeCart();
    closeSearch();
    closeAccount();
    closeWishlist();
    closeOrders();

  }
);


// ======================================================
// CHECKOUT FORM
// ======================================================

document.addEventListener(
  "DOMContentLoaded",
  function() {

    const form =
      document.getElementById(
        "checkout-form"
      );


    if (form) {

      form.addEventListener(
        "submit",
        submitCheckout
      );

    }


    loadProductsFromSupabase();
    loadHeroImage();

    updateCart();

    checkCustomerLoginOnLoad();

  }
);
