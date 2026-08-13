// ======================================================
// HURAIN - FINAL SCRIPT.JS
// PRODUCTS + SEARCH + DETAILS + CART + WISHLIST
// CHECKOUT + WHATSAPP ORDER
// ======================================================

const WHATSAPP_NUMBER = "919921181213";
const DELIVERY_CHARGE = 100;


// ======================================================
// PRODUCTS
// ======================================================

const products = [

  // JEWELLERY
  {
    id: 1,
    name: "Luxury Jewellery Set 01",
    category: "Jewellery",
    price: 1499,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
    description: "Premium luxury imitation jewellery collection."
  },
  {
    id: 2,
    name: "Luxury Jewellery Set 02",
    category: "Jewellery",
    price: 1599,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
    description: "Elegant jewellery designed for a premium look."
  },
  {
    id: 3,
    name: "Luxury Jewellery Set 03",
    category: "Jewellery",
    price: 1799,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80",
    description: "Beautiful imitation jewellery for special occasions."
  },
  {
    id: 4,
    name: "Luxury Jewellery Set 04",
    category: "Jewellery",
    price: 1299,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80",
    description: "Stylish jewellery collection from HURAIN."
  },
  {
    id: 5,
    name: "Luxury Jewellery Set 05",
    category: "Jewellery",
    price: 1899,
    image: "https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?auto=format&fit=crop&w=900&q=80",
    description: "Premium design with elegant finishing."
  },
  {
    id: 6,
    name: "Luxury Jewellery Set 06",
    category: "Jewellery",
    price: 999,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
    description: "Elegant everyday jewellery collection."
  },
  {
    id: 7,
    name: "Luxury Jewellery Set 07",
    category: "Jewellery",
    price: 1399,
    image: "https://images.unsplash.com/photo-1599459183200-59c7687a027b?auto=format&fit=crop&w=900&q=80",
    description: "Beautiful premium imitation jewellery."
  },
  {
    id: 8,
    name: "Luxury Jewellery Set 08",
    category: "Jewellery",
    price: 1699,
    image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=900&q=80",
    description: "Perfect jewellery for parties and occasions."
  },
  {
    id: 9,
    name: "Luxury Jewellery Set 09",
    category: "Jewellery",
    price: 1199,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=80",
    description: "Premium style at an attractive price."
  },
  {
    id: 10,
    name: "Luxury Jewellery Set 10",
    category: "Jewellery",
    price: 1999,
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
    description: "Luxury jewellery collection by HURAIN."
  },

  // COSMETICS
  {
    id: 11,
    name: "Premium Beauty Collection 01",
    category: "Cosmetics",
    price: 999,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
    description: "Premium cosmetics collection."
  },
  {
    id: 12,
    name: "Premium Beauty Collection 02",
    category: "Cosmetics",
    price: 899,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    description: "Beauty essentials for your daily routine."
  },
  {
    id: 13,
    name: "Premium Beauty Collection 03",
    category: "Cosmetics",
    price: 1199,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80",
    description: "Premium makeup and beauty products."
  },
  {
    id: 14,
    name: "Premium Beauty Collection 04",
    category: "Cosmetics",
    price: 749,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80",
    description: "Beautiful cosmetics collection."
  },
  {
    id: 15,
    name: "Premium Beauty Collection 05",
    category: "Cosmetics",
    price: 1299,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80",
    description: "Premium beauty products from HURAIN."
  },
  {
    id: 16,
    name: "Premium Beauty Collection 06",
    category: "Cosmetics",
    price: 699,
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80",
    description: "Everyday beauty essentials."
  },
  {
    id: 17,
    name: "Premium Beauty Collection 07",
    category: "Cosmetics",
    price: 1099,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=80",
    description: "Premium cosmetic collection."
  },
  {
    id: 18,
    name: "Premium Beauty Collection 08",
    category: "Cosmetics",
    price: 899,
    image: "https://images.unsplash.com/photo-1599733594230-6b823276abcc?auto=format&fit=crop&w=900&q=80",
    description: "Elegant beauty products."
  },
  {
    id: 19,
    name: "Premium Beauty Collection 09",
    category: "Cosmetics",
    price: 1499,
    image: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&w=900&q=80",
    description: "Premium cosmetics for your beauty collection."
  },
  {
    id: 20,
    name: "Premium Beauty Collection 10",
    category: "Cosmetics",
    price: 799,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
    description: "Quality cosmetics collection."
  },

  // BANGLES
  {
    id: 21,
    name: "Elegant Bangles Set 01",
    category: "Bangles",
    price: 799,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80",
    description: "Elegant imitation bangles."
  },
  {
    id: 22,
    name: "Elegant Bangles Set 02",
    category: "Bangles",
    price: 599,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80",
    description: "Beautiful bangles collection."
  },
  {
    id: 23,
    name: "Elegant Bangles Set 03",
    category: "Bangles",
    price: 899,
    image: "https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?auto=format&fit=crop&w=900&q=80",
    description: "Premium bangles for special occasions."
  },
  {
    id: 24,
    name: "Elegant Bangles Set 04",
    category: "Bangles",
    price: 699,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
    description: "Stylish bangles collection."
  },
  {
    id: 25,
    name: "Elegant Bangles Set 05",
    category: "Bangles",
    price: 999,
    image: "https://images.unsplash.com/photo-1599459183200-59c7687a027b?auto=format&fit=crop&w=900&q=80",
    description: "Premium traditional bangles."
  },
  {
    id: 26,
    name: "Elegant Bangles Set 06",
    category: "Bangles",
    price: 749,
    image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=900&q=80",
    description: "Elegant bangle set."
  },
  {
    id: 27,
    name: "Elegant Bangles Set 07",
    category: "Bangles",
    price: 849,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=80",
    description: "Beautiful imitation bangles."
  },
  {
    id: 28,
    name: "Elegant Bangles Set 08",
    category: "Bangles",
    price: 649,
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
    description: "Stylish bangles for everyday use."
  },
  {
    id: 29,
    name: "Elegant Bangles Set 09",
    category: "Bangles",
    price: 949,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
    description: "Premium bangle collection."
  },
  {
    id: 30,
    name: "Elegant Bangles Set 10",
    category: "Bangles",
    price: 1099,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
    description: "Luxury bangle collection."
  },

  // PERFUMES
  {
    id: 31,
    name: "Luxury Perfume 01",
    category: "Perfumes",
    price: 1299,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80",
    description: "Premium fragrance collection."
  },
  {
    id: 32,
    name: "Luxury Perfume 02",
    category: "Perfumes",
    price: 1499,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80",
    description: "Elegant long-lasting fragrance."
  },
  {
    id: 33,
    name: "Luxury Perfume 03",
    category: "Perfumes",
    price: 999,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80",
    description: "Premium perfume for everyday elegance."
  },
  {
    id: 34,
    name: "Luxury Perfume 04",
    category: "Perfumes",
    price: 1199,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80",
    description: "Beautiful premium fragrance."
  },
  {
    id: 35,
    name: "Luxury Perfume 05",
    category: "Perfumes",
    price: 1599,
    image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=900&q=80",
    description: "Luxury fragrance collection."
  },
  {
    id: 36,
    name: "Luxury Perfume 06",
    category: "Perfumes",
    price: 899,
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=900&q=80",
    description: "Premium fragrance at an attractive price."
  },
  {
    id: 37,
    name: "Luxury Perfume 07",
    category: "Perfumes",
    price: 1099,
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=80",
    description: "Elegant perfume collection."
  },
  {
    id: 38,
    name: "Luxury Perfume 08",
    category: "Perfumes",
    price: 1399,
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=900&q=80",
    description: "Premium luxury fragrance."
  },
  {
    id: 39,
    name: "Luxury Perfume 09",
    category: "Perfumes",
    price: 1299,
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=900&q=80",
    description: "Long-lasting premium perfume."
  },
  {
    id: 40,
    name: "Luxury Perfume 10",
    category: "Perfumes",
    price: 1699,
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=900&q=80",
    description: "Luxury perfume for special occasions."
  },

  // HAND BAGS
  {
    id: 41,
    name: "Premium Hand Bag 01",
    category: "Hand Bags",
    price: 1799,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
    description: "Premium stylish handbag."
  },
  {
    id: 42,
    name: "Premium Hand Bag 02",
    category: "Hand Bags",
    price: 1999,
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80",
    description: "Elegant handbag collection."
  },
  {
    id: 43,
    name: "Premium Hand Bag 03",
    category: "Hand Bags",
    price: 1599,
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=80",
    description: "Premium fashion handbag."
  },
  {
    id: 44,
    name: "Premium Hand Bag 04",
    category: "Hand Bags",
    price: 2299,
    image: "https://images.unsplash.com/photo-1585488437808-9b0e3b4b3b7a?auto=format&fit=crop&w=900&q=80",
    description: "Luxury handbag for every occasion."
  },
  {
    id: 45,
    name: "Premium Hand Bag 05",
    category: "Hand Bags",
    price: 1899,
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80",
    description: "Stylish premium handbag."
  },
  {
    id: 46,
    name: "Premium Hand Bag 06",
    category: "Hand Bags",
    price: 1499,
    image: "https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=900&q=80",
    description: "Elegant everyday handbag."
  },
  {
    id: 47,
    name: "Premium Hand Bag 07",
    category: "Hand Bags",
    price: 2499,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
    description: "Luxury premium handbag."
  },
  {
    id: 48,
    name: "Premium Hand Bag 08",
    category: "Hand Bags",
    price: 1699,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    description: "Beautiful handbag collection."
  },
  {
    id: 49,
    name: "Premium Hand Bag 09",
    category: "Hand Bags",
    price: 2199,
    image: "https://images.unsplash.com/photo-1564222259826-4a8d6c1a1b0b?auto=format&fit=crop&w=900&q=80",
    description: "Premium fashion handbag."
  },
  {
    id: 50,
    name: "Premium Hand Bag 10",
    category: "Hand Bags",
    price: 1999,
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80",
    description: "Luxury handbag collection."
  },

  // ACCESSORIES
  {
    id: 51,
    name: "Luxury Accessories 01",
    category: "Accessories",
    price: 699,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80",
    description: "Premium fashion accessories."
  },
  {
    id: 52,
    name: "Luxury Accessories 02",
    category: "Accessories",
    price: 799,
    image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=900&q=80",
    description: "Elegant accessories collection."
  },
  {
    id: 53,
    name: "Luxury Accessories 03",
    category: "Accessories",
    price: 599,
    image: "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=900&q=80",
    description: "Stylish everyday accessories."
  },
  {
    id: 54,
    name: "Luxury Accessories 04",
    category: "Accessories",
    price: 899,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
    description: "Premium fashion accessories."
  },
  {
    id: 55,
    name: "Luxury Accessories 05",
    category: "Accessories",
    price: 749,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80",
    description: "Beautiful accessory collection."
  },
  {
    id: 56,
    name: "Luxury Accessories 06",
    category: "Accessories",
    price: 999,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
    description: "Premium accessories for your style."
  },
  {
    id: 57,
    name: "Luxury Accessories 07",
    category: "Accessories",
    price: 649,
    image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=900&q=80",
    description: "Elegant fashion accessories."
  },
  {
    id: 58,
    name: "Luxury Accessories 08",
    category: "Accessories",
    price: 849,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=80",
    description: "Premium accessories collection."
  },
  {
    id: 59,
    name: "Luxury Accessories 09",
    category: "Accessories",
    price: 699,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
    description: "Stylish accessories for everyday use."
  },
  {
    id: 60,
    name: "Luxury Accessories 10",
    category: "Accessories",
    price: 1099,
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
    description: "Luxury accessories by HURAIN."
  }

];


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
          ₹${money(product.price)}
        </div>

      </div>


      <div class="product-cart-control">

        ${
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


  const cartItem =
    cart.find(function(item) {
      return Number(item.id) === Number(productId);
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
          src="${escapeHtml(product.image)}"
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
          ₹${money(product.price)}
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
          >
            ADD TO CART
          </button>

          <button
            type="button"
            class="btn primary"
            id="detail-order-now"
          >
            ORDER NOW
          </button>

        </div>

      </div>

    </div>

  `;


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

      increaseQuantity(product.id);

      openProductDetails(product.id);

    });


  // Quantity -
  document
    .getElementById("detail-decrease")
    ?.addEventListener("click", function() {

      decreaseQuantity(product.id);

      openProductDetails(product.id);

    });


  // Add to cart
  document
    .getElementById("detail-add-cart")
    ?.addEventListener("click", function() {

      addToCart(product.id);

      openProductDetails(product.id);

    });


  // Order now
  document
    .getElementById("detail-order-now")
    ?.addEventListener("click", function() {

      orderNow(product.id);

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

function addToCart(productId) {

  const product =
    getProduct(productId);

  if (!product) return;


  const existing =
    cart.find(function(item) {
      return Number(item.id) === Number(productId);
    });


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


function increaseQuantity(productId) {

  const item =
    cart.find(function(item) {
      return Number(item.id) === Number(productId);
    });


  if (!item) {
    addToCart(productId);
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


function decreaseQuantity(productId) {

  const item =
    cart.find(function(item) {
      return Number(item.id) === Number(productId);
    });


  if (!item) return;


  item.quantity -= 1;


  if (item.quantity <= 0) {

    cart =
      cart.filter(function(item) {
        return Number(item.id) !== Number(productId);
      });

  }


  saveStorage(
    "hurain_cart",
    cart
  );

  updateCart();
  loadProducts();
}


function removeFromCart(productId) {

  cart =
    cart.filter(function(item) {
      return Number(item.id) !== Number(productId);
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

      <div class="cart-item-info">

        <strong>
          ${escapeHtml(item.name)}
        </strong>

        <small>
          ₹${money(item.price)}
        </small>

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
        decreaseQuantity(item.id);
      });


    row.querySelector(".cart-plus")
      ?.addEventListener("click", function() {
        increaseQuantity(item.id);
      });


    row.querySelector(".cart-remove")
      ?.addEventListener("click", function() {
        removeFromCart(item.id);
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
// CHECKOUT VALIDATION
// ======================================================

function clearCheckoutErrors() {

  const ids = [
    "customer-name-error",
    "customer-mobile-error",
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

function createWhatsAppOrder(customer) {

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
  loadProducts();


  closeCheckout();


  setTimeout(function() {

    alert(
      "Order details are ready on WhatsApp.\n\nOrder ID: " +
      orderId
    );

  }, 500);

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

function orderNow(productId) {

  const product =
    getProduct(productId);


  if (!product) return;


  const existing =
    cart.find(function(item) {
      return Number(item.id) === Number(productId);
    });


  if (!existing) {

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

  const input =
    document.getElementById("login-mobile");


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
    "Mobile number saved successfully."
  );

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


    loadProducts();

    updateCart();

  }
);
