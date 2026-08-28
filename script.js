const products = [
  {id:1,name:"Soleva Nova",category:"sneakers",price:85},
  {id:2,name:"Soleva Run",category:"running",price:95},
  {id:3,name:"Soleva Court",category:"casual",price:75},
  {id:4,name:"Soleva Apex",category:"sneakers",price:120},
  {id:5,name:"Soleva Motion",category:"running",price:105},
  {id:6,name:"Soleva Classic",category:"casual",price:70},
  {id:7,name:"Soleva Edge",category:"sneakers",price:110},
  {id:8,name:"Soleva Pace",category:"running",price:90}
];

let cart = [];

function money(n){
  return `$${n.toFixed(2)}`;
}

function renderProducts(filter="all"){
  const list = filter==="all"
    ? products
    : products.filter(p=>p.category===filter);

  document.getElementById("products").innerHTML = list.map(p=>`
    <article class="product">
      <div class="product-img"><div class="mini-shoe"></div></div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <div class="meta">${p.category}</div>
        <span class="price">${money(p.price)}</span>
        <button class="add" onclick="addToCart(${p.id})">Add</button>
      </div>
    </article>
  `).join("");
}

function addToCart(id){
  const found = cart.find(x=>x.id===id);

  if(found){
    found.qty++;
  } else {
    cart.push({...products.find(p=>p.id===id),qty:1});
  }

  updateCart();
  openCart();
}

function updateCart(){
  document.getElementById("cartCount").textContent =
    cart.reduce((s,x)=>s+x.qty,0);

  document.getElementById("cartItems").innerHTML =
    cart.length
    ? cart.map(x=>`
      <div class="cart-row">
        <div class="thumb"><div class="mini-shoe"></div></div>
        <div style="flex:1">
          <strong>${x.name}</strong>
          <div>${money(x.price)} × ${x.qty}</div>
          <div class="qty">Quantity: ${x.qty}</div>
          <button class="remove" onclick="removeItem(${x.id})">Remove</button>
        </div>
      </div>
    `).join("")
    : "<p>Your cart is empty.</p>";

  document.getElementById("cartTotal").textContent =
    money(cart.reduce((s,x)=>s+x.price*x.qty,0));
}

function removeItem(id){
  cart = cart.filter(x=>x.id!==id);
  updateCart();
}

function openCart(){
  document.getElementById("overlay").classList.add("open");
}

function closeCart(e){
  if(!e || e.target===document.getElementById("overlay")){
    document.getElementById("overlay").classList.remove("open");
  }
}

function checkout(){
  if(!cart.length){
    alert("Your cart is empty.");
    return;
  }

  alert("Checkout is ready.");
}

document.querySelectorAll(".filter").forEach(b=>{
  b.addEventListener("click",()=>{
    document.querySelectorAll(".filter")
      .forEach(x=>x.classList.remove("active"));

    b.classList.add("active");
    renderProducts(b.dataset.filter);
  });
});

renderProducts();
updateCart();
