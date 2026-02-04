const categories = ["Rolls", "Momos", "Drinks"];

const products = [
  {
    id: "chicken_roll",
    name: "Chicken Roll",
    desc: "Spicy & juicy chicken roll",
    price: 120,
    category: "Rolls",
    img: "https://via.placeholder.com/150"
  },
  {
    id: "veg_momo",
    name: "Veg Momos",
    desc: "Steamed veg momos (6 pcs)",
    price: 80,
    category: "Momos",
    img: "https://via.placeholder.com/150"
  },
  {
    id: "cold_drink",
    name: "Cold Drink",
    desc: "Chilled soft drink",
    price: 40,
    category: "Drinks",
    img: "https://via.placeholder.com/150"
  }
];

let cart = {};
cart = JSON.parse(localStorage.getItem("cart") || "{}");

const categoryDiv = document.getElementById("categories");
const menuDiv = document.getElementById("menu");
const cartCount = document.getElementById("cartCount");

function renderCategories() {
  categories.forEach((cat, i) => {
    const div = document.createElement("div");
    div.className = "category" + (i === 0 ? " active" : "");
    div.innerText = cat;
    div.onclick = () => selectCategory(cat, div);
    categoryDiv.appendChild(div);
  });
}

function updateQty(id, change) {
  cart[id] = Math.max(0, (cart[id] || 0) + change);
  if (cart[id] === 0) delete cart[id];

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  renderMenu(document.querySelector(".category.active").innerText);
}



function selectCategory(cat, el) {
  document.querySelectorAll(".category").forEach(c => c.classList.remove("active"));
  el.classList.add("active");
  renderMenu(cat);
}

function renderMenu(cat) {
  menuDiv.innerHTML = "";
  products.filter(p => p.category === cat).forEach(p => {
    const qty = cart[p.id] || 0;

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.img}">
      <div class="card-details">
        <h4>${p.name}</h4>
        <p>${p.desc}</p>
        <div class="price">₹${p.price}</div>
        <div class="qty-control">
          <button>-</button>
          <span>${qty}</span>
          <button>+</button>
        </div>
      </div>
    `;

    const [minus, , plus] = card.querySelectorAll("button, span");

    minus.onclick = () => updateQty(p.id, -1);
    plus.onclick = () => updateQty(p.id, 1);

    menuDiv.appendChild(card);
  });
}


function updateCartCount() {
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  cartCount.innerText = count;
}


renderCategories();
renderMenu(categories[0]);
document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.getElementById("cartBtn");

  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
  } else {
    console.error("Cart button not found");
  }
});

