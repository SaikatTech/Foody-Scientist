import { db } from "./firebase.js";
import {
  ref, onValue, update
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const box = document.getElementById("orders");

onValue(ref(db, "orders"), snap => {
  box.innerHTML = "";
  snap.forEach(o => {
    const d = document.createElement("div");
    d.className = "card";
    d.innerHTML = `
      <h4>${o.key}</h4>
      Total: ₹${o.val().total}<br>
      Payment: ${o.val().paymentMethod}<br>
      Status: ${o.val().status}<br><br>
      <button onclick="setStatus('${o.key}','preparing')">Preparing</button>
      <button onclick="setStatus('${o.key}','ready')">Ready</button>
      <button onclick="setStatus('${o.key}','completed')">Completed</button>
    `;
    box.appendChild(d);
  });
});

window.setStatus = (id, status) =>
  update(ref(db, "orders/" + id), { status });
