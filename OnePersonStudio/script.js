document.addEventListener("DOMContentLoaded", function () {
    let cart = [];

    function updateCartCount() {
        const cartCount = document.getElementById("cart-count");
        cartCount.textContent = cart.length;
    }

    function addToCart(productId, productName, productPrice) {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
        });

        console.log(`Added ${productName} to the cart.`);
        updateCartCount();
    }

    document.getElementById("add-to-cart-1").addEventListener("click", function () {
        addToCart(1, "Product 1", 4.99);
    });

    document.getElementById("add-to-cart-2").addEventListener("click", function () {
        addToCart(2, "Product 2", 9.99);
    });

    updateCartCount();
});
