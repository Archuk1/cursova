// Оновлений JavaScript для кошика
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("cart-items");
let total = 0;

if (cart.length === 0) {
    container.innerHTML = "<p>Кошик порожній.</p>";
} else {
    cart.forEach(item => {
        total += item.price * item.quantity;
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <h3>${item.name}</h3>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <p>${(item.price * item.quantity).toFixed(2)} грн</p>
        `;
        container.appendChild(div);
    });
    document.getElementById("total").innerText = `Разом: ${total.toFixed(2)} грн`;
}

function updateQuantity(id, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = cart.findIndex(p => p.id === id);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload(); // Оновити сторінку для відображення змін
    }
}