function displayFeaturedProducts() {
    const container = document.getElementById("product-list"); // Assure-toi que cet ID existe sur ton index.html
    
    if (!container) return;

    // 1. FILTRAGE : On ne garde que les produits marqués comme "phare"
    // On peut aussi limiter à 4 ou 8 produits pour l'esthétique de la page d'accueil
    const featuredProducts = products
        .filter(p => p.isFeatured === true) 
        .slice(0, 7); // Affiche seulement les 7 premiers produits phares

    // 2. NETTOYAGE DU CONTENEUR
    container.innerHTML = "";

    // 3. GÉNÉRATION DU HTML
    featuredProducts.forEach(p => {
        // Création de l'élément div au lieu de doubler l'article
        const productDiv = document.createElement("div");
        productDiv.className = "product-item"; 
        
        productDiv.innerHTML = `
            <div class="product-main">
                <article class="product-card">
                  <figure >
                    <img src="${p.img}" alt="${p.name}" class="product-img">
                     <button class="card-btn" onclick="addToCart(${p.id})">🛒</button>
                  </figure>
                  
                  <h3 class="product-name">${p.name}</h3>
                  <p class="price">${p.price.toLocaleString()} FCFA</p>
                </article>
              </div>
        `;
        container.appendChild(productDiv);
    });
}

// Appel de la fonction au chargement de la page
document.addEventListener("DOMContentLoaded", displayFeaturedProducts);