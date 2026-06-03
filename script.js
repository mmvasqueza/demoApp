//Desarrollado Por> Marcelo
// 5/14/2026


//Objeto productos
let products = [];

//Simulamos un tabla de la base de datos
const ProductsDB = [
        {   
            id: 1, 
            nombre: "Mesa de Postres Premium", 
            categoria: "paquetes", 
            precio: 350.00, stock: 10,
            imagen: "https://img.freepik.com/vector-gratis/tarjeta-cumpleanos-pastel_23-2147501060.jpg", descripcion: "Mesa completa con 5 tipos de postres, decoración temática y flores frescas." 
        },
        {  
            id: 2, 
            nombre: "Candy Bar Clásico",
            categoria: "paquetes", 
            precio: 280.00, 
            stock: 15, 
            imagen: "https://capybaraeventos.com/cdn/shop/files/76652215_2698024986928878_8877623209566928896_o_6c84a38f-5ae3-4ddd-9f5f-911384b06582.jpg?v=1727120346&width=1445", descripcion: "Estación de dulces con 8 variedades, etiquetas personalizadas y decoración." 
        },
        {  
             id: 3,
             nombre: "Arco de Globos Orgánico",
             categoria: "decoraciones",
             precio: 150.00, 
             stock: 15, 
             imagen: "", 
             descripcion: "Arco orgánico de 2m con globos de alta calidad en tonos personalizados." 
        },
        {  
            id: 4, 
            nombre: "Centro de Mesa Floral",
            categoria: "decoraciones", precio: 45.00, 
            stock: 20, imagen: "", 
            descripcion: "Arreglo floral elegante perfecto para mesas de invitados." 
        },
        {  
            id: 5, 
            nombre: "Cupcakes Decorados x12",
            categoria: "bocadillos", precio: 35.00, 
            stock: 50, imagen: "", 
            descripcion: "Deliciosos cupcakes con buttercream y toppings personalizados." 
        }

];


//Inicializar el engranaje de ejecución

document.addEventListener('DOMContentLoaded',function(){
    cargarProductos(); 
    AutenticarUsuarios();


});



function cargarProductos(){
    products = [...ProductsDB];
    renderizarProductos();
    CargarProductosAPI();

}


let currentPage = 1;
const itemsPerPage = 4;

function renderizarProductos(filter = 'todos') {

    const contenedor = document.getElementById('productsContainer');
    const paginacion = document.getElementById('pagination');

    // Filtrar productos
    const filtered = filter === 'todos'
        ? products
        : products.filter(p => p.categoria === filter);

    // Calcular índices
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    // Productos de la página actual
    const productosPaginados = filtered.slice(start, end);

    // Renderizar productos
    contenedor.innerHTML = productosPaginados.map(product => `
        <div class="col-lg-3 col-md-6">
            <div class="products-card h-100" onclick="showProductDetail(${product.id})">
                
                <div class="product-image">
                         <img src="${product.imagen}" style="  width: "250px",  height: "250px";">
                   
                </div>

                <div class="product-body">
                    <span class="badge bg-light text-dark mb-2">
                        ${product.categoria}
                    </span>

                    <h5 class="product-title">
                        ${product.nombre}
                    </h5>

                    <p class="text-muted small mb-2">
                        ${product.descripcion.substring(0,60)}...
                    </p>

                    <div class="product-price">
                        C$${product.precio.toFixed(2)}
                    </div>

                    <button 
                        class="btn btn-add-cart"
                        onclick="event.stopPropagation(); addToCart(${product.id})" >
                        <i class="bi bi-cart-plus me-2"></i>
                        Agregar
                    </button>
                </div>

            </div>
        </div>
    `).join('');

    // Total de páginas
    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    // Renderizar paginación
    let botones = '';

    for (let i = 1; i <= totalPages; i++) {
        botones += `
            <button 
                class="btn ${i === currentPage ? ' btn-primary-custom' : 'btn-outline-custom'} mx-1"
                onclick="changePage(${i}, '${filter}')">  ${i}
            </button>
        `;
    }
    paginacion.innerHTML = botones;
}

function changePage(page, filter = 'todos') {
    currentPage = page;
    renderizarProductos(filter);
}


function filtrarProducts(categoria) {
    // Update active button
    document.querySelectorAll('#productos .btn').forEach(btn => {
        btn.classList.remove('btn-primary-custom', 'active');
        btn.classList.add('btn-outline-custom');
    });
    event.target.classList.remove('btn-outline-custom');
    event.target.classList.add('btn-primary-custom', 'active');

    renderizarProductos(categoria);
}


/* Consumiendo la API: */
/*
PASO 1: AUTENTICACION
PASO 2: AUTORIZACION
PASO 3: CONSUMO DEL ENDPINT CON TOKEN GENERADO
*/

/*Declarando variables constantes para consumo de api para cada metodo */
const API_USUARIOS = "https://fakestoreapi.com/users"
const API_AUTH = "https://fakestoreapi.com/auth/login"
const API_PRODUCTOS = "https://fakestoreapi.com/products";

/*Credenciales de acceso del usuario que intenta realizar el consmo de la API*/
const Credenciales = {
    user:"johnd",
    pass: "m38rmF$"
}

let Usuarios = [];
let ProductosAPI = [];
let productsAPI = [];

async function AutenticarUsuarios(){
    //Peticion a la API de tipo GET
    const respuestaAPI = await fetch(API_USUARIOS);
    Usuarios = await respuestaAPI.json();
    console.log("Lista de usuarios:", Usuarios);

    //Peticion de autenticacion de tipo POST
    var RespuestaAuth = await fetch(API_AUTH, {
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'username': `${Usuarios[1].username}` , 'password':`${Usuarios[1].password}`})
        /*body: JSON.stringify({'username': `${Credenciales.user}`, 'password':`${Credenciales.pass}`})*/
    });
    
    return RespuestaAuth.json()
    
    /*return RespuestaAuth.json().then(data => {
         console.log('Usted Esta autorizado:', data);
    })*/
}


//Solicitud de lista de productos a la API
async function CargarProductosAPI(){
    
    var authUsuario = await fetch(API_AUTH, {	
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		 body: JSON.stringify({'username': `${Credenciales.user}`, 'password':`${Credenciales.pass}`})
        /*body: JSON.stringify(Credenciales)		*/
	})

    var token = await authUsuario.json();
    console.log(token);


    var ListaProductos = await fetch(API_PRODUCTOS, {
        headers:{
            'Authorization':  `Bearer ${token.token}`,
            'Content-Type': 'application/json'
        }
    })

    ProductosAPI  = await ListaProductos.json();

    console.log('Lista de productos:', ProductosAPI);


    productsAPI = [...ProductosAPI];
    renderizarProductosAPI();



}

let pActual = 1;
const itemsXPage = 3;

function renderizarProductosAPI(filter = 'todos') {

    const contenedor = document.getElementById('productsAPIContainer');
    const paginacion = document.getElementById('paginationAPI');

    // Filtrar productos
    const filtered = filter === 'todos'
        ? productsAPI
        : productsAPI.filter(p => p.category === filter);

    // Calcular índices
    const INICIO = (pActual - 1) * itemsXPage;
    const FIN = INICIO + itemsXPage;

    // Productos de la página actual
    const productosPaginadosAPI = filtered.slice(INICIO, FIN);

    // Renderizar productos
    contenedor.innerHTML = productosPaginadosAPI.map(product => `
        <div class="col-lg-4 col-md-6">
            <div class="products-card h-80" onclick="showProductDetail(${product.id})">
                
                <div class="product-image">
                         <img src="${product.image}" style="width:180px;  height:180px;">
                   
                </div>

                <div class="product-body">
                    <span class="badge bg-light text-dark mb-2">
                        ${product.category}
                    </span>

                    <h5 class="product-title">
                        ${product.title}
                    </h5>

                    <p class="text-muted small mb-2">
                         ${product.description.substring(0,60)}...
                    </p>

                    <div class="product-price"> 
                         C$${product.price.toFixed(2)}
                    </div>

                    <button 
                        class="btn btn-add-cart"
                        onclick="event.stopPropagation(); addToCart(${product.id})" >
                        <i class="bi bi-cart-plus me-2"></i>
                        Agregar
                    </button>
                </div>

            </div>
        </div>
    `).join('');

    // Total de páginas
    const totalPages = Math.ceil(filtered.length / itemsXPage);

    // Renderizar paginación
    let botones = '';

    for (let i = 1; i <= totalPages; i++) {
        botones += `
            <button 
                class="btn ${i === pActual ? ' btn-primary-custom' : 'btn-outline-custom'} mx-1"
                onclick="CambiarPagina(${i}, '${filter}')">  ${i}
            </button>
        `;
    }
    paginationAPI.innerHTML = botones;
}


function CambiarPagina(page, filter = 'todos') {
    pActual = page;
    renderizarProductosAPI(filter);
}

function filtrarProductsAPI(categoria) {
    // Update active button
    document.querySelectorAll('#productosAPI .btn').forEach(btn => {
        btn.classList.remove('btn-primary-custom', 'active');
        btn.classList.add('btn-outline-custom');
    });
    event.target.classList.remove('btn-outline-custom');
    event.target.classList.add('btn-primary-custom', 'active');

    renderizarProductosAPI(categoria);
}

