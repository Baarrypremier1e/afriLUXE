// products.js doit être chargé avant
function formatPrice(price) {
    return price.toLocaleString("fr-FR", { style: "currency", currency: "XOF" });
}

// Fonction pour créer une carte produit
function createProductCard(product) {
    const div = document.createElement("div");
    div.className = "group relative bg-card rounded-sm overflow-hidden border border-border hover:shadow-lg transition-all duration-300";

    // Badges
    const badgeContainer = document.createElement("div");
    badgeContainer.className = "absolute top-3 left-3 z-10 flex flex-col gap-1";
    if (product.isNew) {
        const span = document.createElement("span");
        span.textContent = "Nouveau";
        span.className = "badge-new";
        badgeContainer.appendChild(span);
    }
    if (product.oldPrice) {
        const span = document.createElement("span");
        span.textContent = "Promo";
        span.className = "badge-promo";
        badgeContainer.appendChild(span);
    }
    if (!product.inStock) {
        const span = document.createElement("span");
        span.textContent = "Rupture";
        span.className = "badge-out";
        badgeContainer.appendChild(span);
    }
    div.appendChild(badgeContainer);

    // Image
    const imgLink = document.createElement("a");
    imgLink.href = `detail-produit.html?id=${product.id}`;
    imgLink.className = "block aspect-square overflow-hidden";
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.className = "w-full h-full object-cover hover:scale-105 transition-transform duration-500";
    imgLink.appendChild(img);
    div.appendChild(imgLink);

    // Hover actions
    const hoverDiv = document.createElement("div");
    hoverDiv.className = "absolute inset-x-0 bottom-[120px] flex justify-center gap-2 opacity-0 hover:opacity-100 pointer-events-none hover:pointer-events-auto";
    
    const viewBtn = document.createElement("a");
    viewBtn.href = `detail-produit.html?id=${product.id}`;
    viewBtn.textContent = "👁️";
    viewBtn.className = "hover-btn";
    hoverDiv.appendChild(viewBtn);

    if (product.inStock) {
        const addBtn = document.createElement("button");
        addBtn.textContent = "🛒";
        addBtn.className = "hover-btn";
        addBtn.onclick = () => {
            Cart.addToCart(product, 1);
            cartDrawer.open();
        };
        hoverDiv.appendChild(addBtn);
    }
    div.appendChild(hoverDiv);

    // Info
    const infoDiv = document.createElement("div");
    infoDiv.className = "p-4";

    const subCat = document.createElement("p");
    subCat.textContent = product.subcategory;
    subCat.className = "text-xs text-muted uppercase mb-1";
    infoDiv.appendChild(subCat);

    const nameH3 = document.createElement("h3");
    nameH3.textContent = product.name;
    nameH3.className = "font-semibold hover:text-primary";
    infoDiv.appendChild(nameH3);

    const priceDiv = document.createElement("div");
    priceDiv.className = "flex items-center gap-2 mt-2";
    const priceSpan = document.createElement("span");
    priceSpan.textContent = formatPrice(product.price);
    priceSpan.className = "text-primary font-bold";
    priceDiv.appendChild(priceSpan);

    if (product.oldPrice) {
        const oldSpan = document.createElement("span");
        oldSpan.textContent = formatPrice(product.oldPrice);
        oldSpan.className = "line-through text-muted";
        priceDiv.appendChild(oldSpan);
    }
    infoDiv.appendChild(priceDiv);

    div.appendChild(infoDiv);

    return div;
}

// Afficher tous les produits
function renderProducts(productArray) {
    const container = document.getElementById("product-list");
    container.innerHTML = "";
    productArray.forEach(p => {
        container.appendChild(createProductCard(p));
    });
}

// Exemple d'utilisation
renderProducts(products); // products = tableau de products.js
