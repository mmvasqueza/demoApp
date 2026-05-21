//Desarrollado Por> Marcelo
// 5/14/2025
//Inicializacion de arreglo 
let products =[];

//Objeto productos

let BDProduct = [
    {
        id: 1,
        name: "Mesa de Postres Premium",
        image: "#",
        category: "paquetes",
         price: 350.00,
        description: "Mesa completa con 5 tipos de postres, decoración temática y flores frescas."
    },
    {
        id: 2,
        name: "Candy Bar Clásico",
        image: "#",
        category: "paquetes",
        price: 280.00,
        description: "Estación de dulces con 8 variedades, etiquetas personalizadas y decoración."
    },
    {
        id: 3,
        name: "Arco de Globos Orgánico",
        image: "#",
        category: "decoraciones",
         price: 150.00,
        description: "Arco orgánico de 2m con globos de alta calidad en tonos personalizados."
    },
    {
        id: 4,
        name: "Centro de Mesa Floral",
        image: "#",
        category: "paquetes",
        price: 45.00,
        description: "Arreglo floral elegante perfecto para mesas de invitados."
    }
];

document.addEventListener('DOMContentLoaded', function () {
    loadProducts();
    
});

function loadProducts(){
    products = [...BDProduct];
    renderProducts();
}

function renderProducts(filter = 'all'){
   const container =  document.getElementById('productsContainer');
   const filtered  = filter === 'all' ? products : products.filter(p => p.category === filter);

   container.innerHTML = filtered.map(products => `
     <div class="col-lg-3 col-md-6">
          <div class="product-card h-100" onclick="showProductDetail(${products.id})">
          <div class="product-image">${products.image}  

          </div>

          <div class="product-body">
            <span class="badge lg-light text-dark mb-2"> ${products.category}</span>
            <h5 class="product-title">${products.name}</h5>
            <p>${products.description}</p>
            <div class="product-price">C$${products.price}</div>
            <button class="btn btn-add-cart">

            </button>
          </div>

         </div>
    ` ).join('');

}


function filterProducts(category){
    document.querySelectorAll('#productos .btn').forEach(btn => {
        btn.classList.romove('btn-primary-custom', 'active') ;
        btn.classList.add('btn-outline-custom') ;

    });
    event.target.classList.romove('btn-outline-custom');
    event.target.classList.add('btn-primary-custom', 'active');

    renderProducts('categoria')

}


    









