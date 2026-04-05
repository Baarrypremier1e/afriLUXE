     
      // Produits
      const products = [
     
      {
      id: "wax-001",
      name: "Wax Ankara Bleu & Orange", title: "wax",
      description: "Tissu wax authentique 6 yards.",
      price: 12000,
      oldPrice: 15000,
      image: "images/wax-1.jpg",
      category: "wax",
      subcategory: "6 Yards",
      inStock: true,
      isFeatured: true,
      },
      {
      id: "wax-002",
      name: "Pagne Vert & Or",
      description: "Magnifique pagne africain.", title: "wax",
      price: 10000,
      image: "images/wax-2.jpg",
      category: "wax",
      subcategory: "6 Yards",
      inStock: true,
      isFeatured: true,
      },
      
    { 
      id: "wax-004", 
      name: "Pagne Woodin Limited", 
      title: "wax", price: 15000, 
      category: "wax", image: "images/wax-2.jpg", 
      description: "Édition limitée motifs africains.", 
      isFeatured: false },
    { 
      id: "wax-005", 
      name: "Wax Hollandais Authentique", 
      title: "wax", price: 45000,
      category: "wax", 
      image: "images/wax-2.jpg", 
      description: "Le luxe du textile africain.", 
      isFeatured: false },
      
    { 
      id: "wax-003", 
      name: "Wax Ankara Royal", 
      title: "wax", price: 12000, 
      category: "wax", image: "images/wax-1.jpg", 
      isFeatured: true,
      description: "Découvrez notre Wax Ankara Royal, un tissu 100% coton de qualité premium. Parfait pour des créations uniques et élégantes, ce wax allie tradition et modernité pour sublimer votre style.",
      isNew: true,
      inStock: true,
    },
    
    // --- CATEGORIE LAYETTES ---
    { 
      id: "lay-003", 
      name: "Coffret Naissance Soie", 
      title: "layettes", price: 25000, 
      category: "layettes", image: "images/layette-1.jpg", 
      description: "Douceur absolue pour nouveau-né.", 
      isFeatured: false },
    { 
      id: "lay-004", 
      name: "Robe Baptême Dentelle", 
      title: "layettes", price: 18500, 
      category: "layettes", image: "images/layette-2.jpg", 
      description: "Robe faite main pour grandes occasions.", 
      isFeatured: false },
     {
      id: "lay-001",
      name: "Robe Bébé Rose Dentelle",
      description: "Magnifique robe en coton doux avec finitions en dentelle.", title: "layettes",
      price: 8500,
      oldPrice: 12000,
      image: "images/layette-1.jpg",
      category: "layettes",
      subcategory: "Robes",
      inStock: true,
      featured: true,
      isNew: true,
      },
      {
      id: "lay-002",
      name: "Body Rayé Bleu Ciel",
      description: "Body en coton bio à rayures.",
      price: 4500, title: "layettes",
      image: "images/layette-2.jpg",
      category: "layettes",
      subcategory: "Bodies",
      inStock: true,
      featured: true,
      },
    // --- CATEGORIE COSMETIQUES ---
    {
      id: "cos-001",
      name: "Crème Karité",
      description: "Crème hydratante naturelle.", title: "cosmetiques",
      price: 7500,
      image: "images/cosmetique-1.jpg",
      category: "cosmetiques",
      subcategory: "Soins Corps",
      inStock: true,
      featured: true,
      },
      {
      id: "cos-002",
      name: "Savon Noir",
      description: "Savon africain traditionnel.",
      price: 3500,
       isNew: true,
      inStock: true,
      oldPrice: 5000, title: "cosmetiques",
      image: "images/cosmetique-2.jpg",
      category: "cosmetiques",
      subcategory: "Savons",
      inStock: true,
      featured: true,
    },
    { 
      id: "cos-003", 
      name: "Beurre de Karité Or", 
      title: "cosmetiques", price: 5000, 
      category: "cosmetiques", image: "images/cosmetique-1.jpg", 
      description: "Soin pur extrait à froid.", 
      isFeatured: false },
    { 
      id: "cos-004", 
      name: "Huile d'Argan Précieuse", 
      title: "cosmetiques", price: 12000, 
      category: "cosmetiques", image: "images/cosmetique-2.jpg", 
      description: "Hydratation intense visage et corps.", 
      isFeatured: false }
];


// Fonctions (équivalent TypeScript)
function getFeaturedProducts() {
return products.filter(p => p.featured);
}

function getProductsByCategory(cat) {
return products.filter(p => p.category === cat);
}

function getProductById(id) {
return products.find(p => p.id === id);
}
