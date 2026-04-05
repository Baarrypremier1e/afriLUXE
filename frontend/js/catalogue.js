
function displayCatalogueSummary() {
    const container = document.getElementById("product-list");
    const categories = [...new Set(products.map(p => p.category))]; // Récupère les catégories uniques
    
    let htmlContent = "";

    categories.forEach(cat => {
        // Prendre max 5 produits de cette catégorie
        const catProducts = products
            .filter(p => p.category === cat)
            .slice(0, 5);

        catProducts.forEach(p => {
            htmlContent += `
                <article class="product-card">
                    <div class="product-image-area">
                        <img src="${p.image}" alt="${p.name}" class="product-img">
                        <div class="product-hover-overlay">
                            <button class="action-btn" onclick="Cart.openCartPreview('${p.id}')">🛒</button>
                        </div>
                    </div>
                    <div class="product-info-area">
                        <p class="product-sub">${p.category.toUpperCase()}</p>
                        <h3 class="product-title">${p.name}</h3>
                        <p class="current-price">${p.price.toLocaleString()} FCFA</p>
                    </div>
                </article>
            `;
        });
    });

    container.innerHTML = htmlContent;
    
    const count = document.getElementById("result-count");
    if (count) count.textContent = "Aperçu de nos collections de luxe";
}

// Initialisation
document.addEventListener("DOMContentLoaded", displayCatalogueSummary);


// Variables d'état pour le catalogue
let currentCategory = null;
let currentSort = "default";

/**
 * Fonction principale de mise à jour (Tri + Filtre + Affichage)
 */
function updateCatalog() {
    const container = document.getElementById("product-list");
    const countDisplay = document.getElementById("result-count");
    const emptyMessage = document.getElementById("no-result");

    if (!container) return;

    // 1. FILTRAGE
    // Si currentCategory est null, on prend tout. Sinon on filtre.
    let filteredProducts = currentCategory 
        ? products.filter(p => p.category === currentCategory)
        : [...products];

    // 2. LOGIQUE DU CATALOGUE (Max 5 par catégorie si "Tout" est sélectionné)
    // On n'applique la limite des 5 que si l'utilisateur n'a pas choisi de catégorie précise
    if (currentCategory === null && currentSort === "default") {
        const categories = [...new Set(products.map(p => p.category))];
        let limitedList = [];
        categories.forEach(cat => {
            const items = products.filter(p => p.category === cat).slice(0, 5);
            limitedList = [...limitedList, ...items];
        });
        filteredProducts = limitedList;
    }

    // 3. TRI (Le programme de tri est ici)
    if (currentSort === "price-asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (currentSort === "price-desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (currentSort === "name") {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    // 4. AFFICHAGE
    container.innerHTML = "";

    if (filteredProducts.length === 0) {
        if (emptyMessage) emptyMessage.style.display = "block";
        if (countDisplay) countDisplay.textContent = "0 produit trouvé";
        return;
    }

    if (emptyMessage) emptyMessage.style.display = "none";
    if (countDisplay) countDisplay.textContent = `${filteredProducts.length} produit(s) affiché(s)`;

    filteredProducts.forEach(p => {
        const article = document.createElement("article");
        article.className = "product-card";
        article.innerHTML = `
            <div class="product-main">
                <article class="product-card">
                  <figure class="product-figure">
                    <img src="${p.image}" alt="${p.name}" class="cart-product-img">
                    <h5 class="product-title">${p.title}</h5>
                    <a href="product-detail.html?id=${p.id}" class="product-detail-link">👁️</a>
                     <button class="card-btn" onclick="Cart.openCartPreview('${p.id}')">🛒</button>
                  </figure>
                 
                  <h3 class="product-name">${p.name}</h3>
                  <p class="price">${p.price.toLocaleString()} FCFA</p>
                </article>
              </div>
        `;
        container.appendChild(article);
    });
}

/**
 * Fonctions appelées par le HTML (Boutons et Select)
 */
function filterCategory(cat) {
    currentCategory = cat;
    
    // Gestion visuelle des boutons actifs
    const buttons = document.querySelectorAll('.categories-filter button');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    updateCatalog();
}

function sortProducts() {
    const sortSelect = document.getElementById("sort");
    currentSort = sortSelect.value;
    updateCatalog();
}

// Lancement au chargement
document.addEventListener("DOMContentLoaded", updateCatalog);

// Simulation panier
