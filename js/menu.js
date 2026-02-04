// js/menu.js

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

// load cart
let cart = JSON.parse(localStorage.getItem("cart") || "{}");

const categoryDiv = document.getElementById("categories");
const menuDiv = document.getElementById("menu");
const cartCount = document.getElementById("cartCount");

function renderCategories() {
  categoryDiv.innerHTML = "";
  categories.forEach((cat, i) => {
    const div = document.createElement("div");
    div.className = "category" + (i === 0 ? " active" : "");
    div.textContent = cat;
    div.addEventListener("click", () => selectCategory(cat, div));
    categoryDiv.appendChild(div);
  });
}

function selectCategory(cat, el) {
  document.querySelectorAll(".category").forEach(c => c.classList.remove("active"));
  el.classList.add("active");
  renderMenu(cat);
}

function renderMenu(cat) {
  menuDiv.innerHTML = "";

  products
    .filter(p => p.category === cat)
    .forEach(p => {
      const qty = cart[p.id] || 0;

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${p.img}" />
        <div class="card-details">
          <h4>${p.name}</h4>
          <p>${p.desc}</p>
          <div class="price">₹${p.price}</div>
          <div class="qty-control">
            <button class="minus">-</button>
            <span>${qty}</span>
            <button class="plus">+</button>
          </div>
        </div>
      `;

      card.querySelector(".minus").addEventListener("click", () => updateQty(p.id, -1));
      card.querySelector(".plus").addEventListener("click", () => updateQty(p.id, 1));

      menuDiv.appendChild(card);
    });
}

function updateQty(id, change) {
  cart[id] = Math.max(0, (cart[id] || 0) + change);
  if (cart[id] === 0) delete cart[id];

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  const active = document.querySelector(".category.active");
  if (active) renderMenu(active.textContent);
}

function updateCartCount() {
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  cartCount.textContent = count;
}

// initial render
renderCategories();
renderMenu(categories[0]);
updateCartCount();

// cart button
document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.getElementById("cartBtn");
  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
  }
});
