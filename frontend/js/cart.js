// Cart.js - gestion panier JS pur
console.log("Cart.js chargé");
const Cart = (function () {
    console.log("Cart.js chargé");
    let items = products;
    let isCartOpen = false;

    // Charger depuis localStorage
    const saved = localStorage.getItem("cart");
    if (saved) {
        try {
            items = JSON.parse(saved);
        } catch {}
    }

    // Sauvegarder dans localStorage
    function save() {
        localStorage.setItem("cart", JSON.stringify(items));
    }

    // Ajouter produit
    function addToCart(product, quantity = 1) {
    // On cherche si le produit existe déjà, en étant prudent sur la structure
    const existing = items.find(i => {
        const item = i.product ? i.product : i; 
        return item.id === product.id;
    });

    if (existing) {
        existing.quantity += quantity;
    } else {
        // On stocke toujours sous le même format propre désormais
        items.push({ product: product, quantity: quantity });
    }
    
    isCartOpen = true;
    save();
    renderCart();
}

    // Supprimer produit
    function removeFromCart(productId) {
        items = items.filter(i => i.product.id !== productId);
        save();
        renderCart();
    }

    // Mettre à jour quantité
    function updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        const item = items.find(i => i.product.id === productId);
        if (item) {
            item.quantity = quantity;
        }
        save();
        renderCart();
    }

    // Vider le panier
    function clearCart() {
        items = [];
        save();
        renderCart();
    }

    // Totaux
    function totalItems() {
        return items.reduce((sum, i) => sum + i.quantity, 0);
    }

    function totalPrice() {
    return items.reduce((sum, i) => {
        // On essaie de trouver le prix peu importe le format (i.product.price OU i.price)
        const itemData = i.product ? i.product : i;
        const price = itemData.price || 0; // Si price n'existe pas, on met 0 au lieu de planter
        const qty = i.quantity || 0;
        return sum + (price * qty);
    }, 0);
}

    // Ouverture / fermeture
    function setIsCartOpen(open) {
        isCartOpen = open;
        renderCart();
    }

    function getIsCartOpen() {
        return isCartOpen;
    }

    // Affichage simple (console ou DOM)
    function renderCart() {
    // On change "cart-container" par l'ID réel de ton HTML
    const container = document.getElementById("cart-items-container"); 
    if (!container) return;

    container.innerHTML = "";
    
    // On récupère les items (soit de la variable locale, soit du localStorage)
    const currentItems = items.length > 0 ? items : (JSON.parse(localStorage.getItem("cart")) || []);

    if (currentItems.length === 0) {
        container.innerHTML = "<p style='padding:20px; text-align:center;'>Le panier est vide.</p>";
        return;
    }

    currentItems.forEach(i => {
    const item = i.product ? i.product : i; 
    const qty = i.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
        <div class="cart-item-info">
            <div class="cart-product-img-container">
                <img src="${item.image}" alt="${item.name}">
            </div>
            
            <div class="cart-item-details">
                <div class="cart-product-name">${item.name}</div>
                <div class="cart-product-price">${item.price.toLocaleString()} FCFA</div>
                
                <div class="cart-quantity-controls">
                    <div class="cart-quantity-selector">
                        <button type="button" onclick="Cart.updateQuantity('${item.id}', ${qty - 1})">−</button>
                        <span class="qty-number">${qty}</span>
                        <button type="button" onclick="Cart.updateQuantity('${item.id}', ${qty + 1})">+</button>
                    </div>
                    
                    <button class="delete-btn" onclick="Cart.removeFromCart('${item.id}')">
                        <span class="delete-btn">🗑️</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    container.appendChild(div);
});

    // Mise à jour du montant total dans le footer du drawer
    const totalAmountEl = document.getElementById("cart-total-amount");
    if (totalAmountEl) {
        totalAmountEl.textContent = totalPrice().toLocaleString() + " FCFA";
    }
}
    function openCartPreview(productId) {
    // 1. Trouver le produit dans la liste globale
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        console.error("Produit introuvable :", productId);
        return;
    }

    // 2. Utiliser la fonction addToCart déjà existante pour garder la même structure
    addToCart(product, 1);

    // 3. Afficher le drawer (le menu coulissant)
    const drawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("cart-overlay");
    
    if (drawer && overlay) {
        drawer.classList.add("open");
        overlay.classList.add("active");
    }
}
    return {
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        setIsCartOpen,
        getIsCartOpen,
        renderCart,
        openCartPreview,
        toggleCart: function() {
            const drawer = document.getElementById("cart-drawer");
            const overlay = document.getElementById("cart-overlay");
            drawer.classList.toggle("open");
            overlay.classList.toggle("active");
        },
        items // exposer items pour utilisation
    };
})();
