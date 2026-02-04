import { db } from "./firebase.js";
import {
  ref, push, onValue, remove
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const list = document.getElementById("list");

document.getElementById("add").onclick = () => {
  const product = {
    name: name.value,
    price: Number(price.value),
    desc: desc.value,
    image: img.value,
    category: cat.value,
    available: true
  };
  push(ref(db, "products"), product);
};

onValue(ref(db, "products"), snap => {
  list.innerHTML = "";
  snap.forEach(c => {
    const d = document.createElement("div");
    d.className = "card";
    d.innerHTML = `
      <h4>${c.val().name}</h4>
      ₹${c.val().price}
      <button onclick="del('${c.key}')">❌</button>
    `;
    list.appendChild(d);
  });
});

window.del = id => remove(ref(db, "products/" + id));
