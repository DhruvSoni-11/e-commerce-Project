let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

function addToCart(name, price){
    cart.push({name, price});
    sessionStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Item added to cart");
}

function updateCartCount(){
    const count = document.getElementById("cartCount");
    if(count) count.innerText = cart.length;
}

function loadCart(){
    const cartDiv = document.getElementById("cartItems");
    const totalSpan = document.getElementById("cartTotal");

    if(!cartDiv) return;

    cartDiv.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <span>${item.name} - ₹${item.price}</span>
            <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        `;
        cartDiv.appendChild(div);
        total += item.price;
    });

    totalSpan.innerText = total;
}

function removeItem(index){
    cart.splice(index,1);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

function placeOrder(){
    if(cart.length === 0){
        alert("Your cart is empty!");
        return;
    }
    alert("Order placed successfully!");
    cart = [];
    sessionStorage.removeItem("cart");
    loadCart();
    updateCartCount();
}

updateCartCount();
loadCart();
