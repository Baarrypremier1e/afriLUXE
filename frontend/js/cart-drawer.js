// Assure-toi que cart.js est chargé avant
const cartDrawer = (function () {

    const backdrop = document.getElementById("cart-backdrop");
    const drawer = document.getElementById("cart-drawer");
    const itemsContainer = document.getElementById("cart-items");
    const footer = document.getElementById("cart-footer");
    const totalPriceEl = document.getElementById("cart-total-price");

    // Ouvrir drawer
    function open() {
        backdrop.style.display = "block";
        drawer.style.display = "flex";
        render();
    }

    // Fermer drawer
    function close() {
        backdrop.style.display = "none";
        drawer.style.display = "none";
    }

    backdrop.onclick = close;
    document.getElementById("cart-close").onclick = close;

    document.getElementById("clear-cart").onclick = function() {
        Cart.clearCart();
        render();
    };

    // Commander via WhatsApp
    document.getElementById("checkout-btn").onclick = function() {
        const items = Cart.items.map(i => `${i.product.name} x ${i.quantity}`).join("\n");
        const message = encodeURIComponent("Je souhaite commander :\n" + items);
        window.open("https://wa.me/21653877879?text=" + message, "_blank");
    };

    // Rendu du panier
    function render() {
        itemsContainer.innerHTML = "";

        const items = Cart.items;

        if (items.length === 0) {
            itemsContainer.innerHTML = "<p>Votre panier est vide</p>";
            footer.style.display = "none";
            return;
        }

        footer.style.display = "block";
        totalPriceEl.textContent = Cart.totalPrice() + " €";

        items.forEach(item => {
            const div = document.createElement("div");
            div.className = "cart-item";

            div.innerHTML = `
                <img src="${item.product.image}" alt="${item.product.name}" width="50" height="50">
                <div style="flex:1;">
                    <h3>${item.product.name}</h3>
                    <p>${item.product.price} €</p>
                    <div>
                        <button class="qty-minus">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-plus">+</button>
                        <button class="remove-item">✕</button>
                    </div>
                </div>
            `;

            // Events
            div.querySelector(".qty-minus").onclick = () => {
                Cart.updateQuantity(item.product.id, item.quantity - 1);
                render();
            };
            div.querySelector(".qty-plus").onclick = () => {
                Cart.updateQuantity(item.product.id, item.quantity + 1);
                render();
            };
            div.querySelector(".remove-item").onclick = () => {
                Cart.removeFromCart(item.product.id);
                render();
            };

            itemsContainer.appendChild(div);
        });
    }

    // Observer le cart pour mise à jour
    if (window.Cart && window.Cart.renderCart) {
        const originalRender = window.Cart.renderCart;
        window.Cart.renderCart = function() {
            originalRender();
            render();
        }
    }

    return { open, close, render };
})();
