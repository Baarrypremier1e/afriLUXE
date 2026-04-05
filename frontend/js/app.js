function updateCartCount() {
    const countEl = document.getElementById("cart-count");
    countEl.textContent = Cart.totalItems();
}

// Mettre à jour à chaque modification du panier
const originalRender = Cart.renderCart;
Cart.renderCart = function() {
    originalRender();
    updateCartCount();
}
updateCartCount();