/**
 * Affiche les produits d'une catégorie spécifique
 * @param {string} categoryName - Le nom de la catégorie à filtrer
 */

function displayProducts(list) {
    const container = document.getElementById("product-list");
    const count = document.getElementById("result-count");
    const empty = document.getElementById("no-result");

    // Sécurité : vérifier si le container existe
    if (!container) return;

    container.innerHTML = "";

    if (list.length === 0) {
        if (empty) empty.style.display = "block";
        if (count) count.textContent = "0 produit trouvé";
        return;
    }

    if (empty) empty.style.display = "none";
    if (count) count.textContent = list.length + " produit(s) trouvé(s)";

    list.forEach(p => {
        // Utilisation de la classe 'product-card' pour le CSS Luxe
        const div = document.createElement("article");
        div.className = "product-card"; 

        // On ajoute l'image et la structure complète
        div.innerHTML = `
            <div class="product-main">
                <article class="product-card">
                  <figure >
                    <img src="${p.img}" alt="${p.name}" class="product-img">
                    <h5 class="product-title">${p.title}</h5>
                      <button class="card-btn" onclick="addToCart(${p.id})">🛒</button>
                  </figure>
                  
                  <h3 class="product-name">${p.name}</h3>
                  <p class="price">${p.price.toLocaleString()} FCFA</p>
                </article>
              </div>
        `;
        container.appendChild(div);
    });
}