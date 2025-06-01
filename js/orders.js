window.onload = async () => {
    const ordersRef = db.collection("orders");
    const snapshot = await ordersRef.get();
    const ordersList = document.getElementById("ordersList");

    for (const doc of snapshot.docs) {
        const data = doc.data();
        const products = data.products;
        const userId = data.userId;
        const orderDate = data.orderDate;

        let productDetails = [];
        for (const productId of products) {
            const productDoc = await db.collection("products").doc(productId).get();
            if (productDoc.exists) {
                const product = productDoc.data();
                productDetails.push(`${product.name} (₹${product.price})`);
            }
        }

        const div = document.createElement("div");
        div.innerHTML = `
            <h4>Order by User: ${userId}</h4>
            <p>Products: ${productDetails.join(", ")}</p>
            <p>Order Date: ${new Date(orderDate).toLocaleString()}</p>
            <hr/>
        `;
        ordersList.appendChild(div);
    }
};
