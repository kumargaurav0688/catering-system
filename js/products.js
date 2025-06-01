document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const product = {
        name: productName.value,
        price: parseFloat(price.value),
        description: description.value,
        createdAt: new Date().toISOString()
    };
    try {
        await db.collection("products").add(product);
        console.log("Product Uploaded:", product);
    } catch (error) {
        console.error("Upload Error:", error.message);
    }
});

window.onload = async () => {
    const productsRef = db.collection("products");
    const snapshot = await productsRef.get();
    const productList = document.getElementById("productList");
    snapshot.forEach(doc => {
        const data = doc.data();
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${data.name}</h3>
            <p>${data.description}</p>
            <p>Price: ₹${data.price}</p>
            <button onclick="addToCart('${doc.id}')">Add to Cart</button>
        `;
        productList.appendChild(div);
    });
};

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Product added to cart:", productId);
}
