// --- INITIALISATION ---
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
let currentQuantity = 1;

// --- FONCTIONS PRINCIPALES ---

/**
 * Charge les données du produit et initialise la page
 */
function initDetailPage() {
    const product = products.find(p => p.id === productId);

    if (!product) {
        document.body.innerHTML = "<div class='container'><h1>Produit non trouvé</h1><a href='catalogue.html'>Retour au catalogue</a></div>";
        return;
    }

    renderProductDetails(product);
    renderRelatedProducts(product);
}

/**
 * Affiche les informations du produit dans le HTML
 */
function renderProductDetails(product) {
    // On utilise une petite sécurité (le point d'interrogation ou une vérification)
    const elName = document.getElementById("product-name");
    if(elName) elName.textContent = product.name;

    const elFeatured = document.getElementById("product-featured");
    if(elFeatured) elFeatured.textContent = product.isFeatured ? "Produit en vedette" : "";

    const elNew = document.getElementById("product-new");
    if(elNew) elNew.textContent = product.isNew ? "Nouveau" : "";

    const elBreadcrumb = document.getElementById("product-name-breadcrumb");
    if(elBreadcrumb) elBreadcrumb.textContent = product.name;

    const elPrice = document.getElementById("product-price");
    if(elPrice) elPrice.textContent = product.price.toLocaleString() + " FCFA";

    const elDesc = document.getElementById("product-description");
    if(elDesc) elDesc.textContent = product.description;

    const elCat = document.getElementById("product-category");
    if(elCat) elCat.textContent = product.category;

    const elImg = document.getElementById("product-image");
    if(elImg) elImg.src = product.image;
    
    updateQtyDisplay();
}
/**
 * Gère l'incrémentation et la décrémentation
 */
function changeQuantity(amount) {
    currentQuantity += amount;
    
    // Sécurité : pas moins de 1
    if (currentQuantity < 1) currentQuantity = 1;
    
    updateQtyDisplay();
}

function updateQtyDisplay() {
    const qtyElement = document.getElementById("qty");
    if (qtyElement) {
        qtyElement.textContent = currentQuantity;
    }
}

/**
 * Ajoute au panier avec gestion des doublons
 */
function handleAddToCart() {
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Vérifier si le produit existe déjà dans le panier
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += currentQuantity;
    } else {
        cart.push({
            ...product,
            quantity: currentQuantity
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Optionnel : Notification via Toast ou Alert
    alert(`${currentQuantity} x ${product.name} ajouté(s) au panier !`);
}

/**
 * Affiche les produits de la même catégorie
 */
function renderRelatedProducts(currentProduct) {
    const container = document.getElementById("related-products");
    if (!container) return;

    const related = products.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id);

    container.innerHTML = ""; // Vide le container

    related.forEach(p => {
        const div = document.createElement("div");
        div.className = "product-card"; // Utilise tes classes CSS existantes

        div.innerHTML = `
            <figure class="product-figure">
                <img src="${p.image}" alt="${p.name}" class="product-img">
                <a href="detail-produit.html?id=${p.id}" class="card-btn">Voir</a>
            </figure>
            <h3>${p.name}</h3>
            <p class="price">${p.price.toLocaleString()} FCFA</p>
        `;
        container.appendChild(div);
    });
}

// --- LANCEMENT ---
document.addEventListener("DOMContentLoaded", initDetailPage);