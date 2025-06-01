async function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";
    for (const id of cart) {
        const doc = await db.collection("products").doc(id).get();
        const data = doc.data();
        const div = document.createElement("div");
        div.innerHTML = `<h4>${data.name} - ₹${data.price}</h4>`;
        cartItems.appendChild(div);
    }
}

async function placeOrder() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) return alert("Cart is empty");
    const user = auth.currentUser;
    if (!user) return alert("Login first");

    await db.collection("orders").add({
        userId: user.uid,
        products: cart,
        orderDate: new Date().toISOString()
    });

    localStorage.removeItem("cart");
    alert("Order placed!");
}

window.onload = displayCart;
