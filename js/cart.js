const cart = JSON.parse(localStorage.getItem("cart") || "{}");

const products = {
  chicken_roll: { name: "Chicken Roll", price: 120 },
  veg_momo: { name: "Veg Momos", price: 80 },
  cold_drink: { name: "Cold Drink", price: 40 }
};

const cartDiv = document.getElementById("cartItems");
const totalSpan = document.getElementById("total");
const paymentBox = document.getElementById("paymentBox");

let total = 0;
const orderId = "ORD" + Date.now();

Object.keys(cart).forEach(id => {
  const qty = cart[id];
  const p = products[id];
  const price = p.price * qty;
  total += price;

  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <div class="card-details">
      <h4>${p.name} × ${qty}</h4>
      <div class="price">₹${price}</div>
    </div>
  `;
  cartDiv.appendChild(div);
});

totalSpan.innerText = total;

// 🟢 OPTION 1 — CASH
window.showCash = () => {
  paymentBox.innerHTML = `
    <h4>Pay at Counter</h4>
    <input placeholder="Mobile Number">
    <p>Please show this order ID: <b>${orderId}</b></p>
  `;
};

// 🟢 OPTION 2 — QR CODE
window.showQR = () => {
  const upiId = "yourupi@bank"; // ADMIN CONFIG (later)
  const remark = `Order ${orderId}`;
  const url = `upi://pay?pa=${upiId}&pn=Foodie%20Scientist&am=${total}&cu=INR&tn=${remark}`;

  const qrUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
    encodeURIComponent(url);

  paymentBox.innerHTML = `
    <h4>Scan to Pay</h4>
    <img src="${qrUrl}">
    <p>Order ID: <b>${orderId}</b></p>
  `;
};

// 🟢 OPTION 3 — UPI APP
window.payUPI = () => {
  const upiId = "yourupi@bank";
  const name = "Foodie Scientist";
  const remark = `Order ${orderId}`;
  const amount = total;

  const baseParams =
    `pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(remark)}`;

  // App-specific intents
  const gpay = `tez://upi/pay?${baseParams}`;
  const paytm = `paytmmp://pay?${baseParams}`;
  const cred = `credpay://upi/pay?${baseParams}`;

  paymentBox.innerHTML = `
    <h4>Pay using UPI App</h4>
    <button onclick="window.location.href='${gpay}'">💙 Pay with GPay</button><br><br>
    <button onclick="window.location.href='${paytm}'">💙 Pay with Paytm</button><br><br>
    <button onclick="window.location.href='${cred}'">💙 Pay with Cred</button><br><br>
    <button onclick="window.location.href='upi://pay?${baseParams}'">
      📱 Other UPI Apps
    </button>
  `;
};

