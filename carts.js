
const API_CARTS = "https://fakestoreapi.com/carts";
let carritosData = [];

document.addEventListener('DOMContentLoaded', function() {
    cargarCarritos(); 
});

async function cargarCarritos() {
    try {
        const respuestaAPI = await fetch(API_CARTS);
        carritosData = await respuestaAPI.json();
        console.log("Lista de carritos obtenidos:", carritosData);
    } catch (error) {
        console.error("Error al consumir la API de carritos:", error);
        document.getElementById('cartsTableBody').innerHTML = `
            <tr><td colspan="4" class="text-center text-danger">Error al cargar los datos.</td></tr>
        `;
    }
}
const API_CARTS = "https://fakestoreapi.com/carts";
let carritosData = [];

document.addEventListener('DOMContentLoaded', function() {
    cargarCarritos(); 
});

async function cargarCarritos() {
    try {
        const respuestaAPI = await fetch(API_CARTS);
        carritosData = await respuestaAPI.json();
        renderizarTablaCarritos(carritosData);
    } catch (error) {
        console.error("Error al consumir la API de carritos:", error);
        document.getElementById('cartsTableBody').innerHTML = `
            <tr><td colspan="4" class="text-center text-danger">Error al cargar los datos.</td></tr>
        `;
    }
}

// Renderizar datos en la tabla
function renderizarTablaCarritos(datos) {
    const tbody = document.getElementById('cartsTableBody');
    tbody.innerHTML = ''; // Limpiar el "Cargando datos..."

    datos.forEach(carrito => {
        // Formatear la fecha (Extraer solo el componente de fecha sin la zona horaria)
        const fecha = new Date(carrito.date).toLocaleDateString('es-ES', {
            year: 'numeric', month: 'short', day: 'numeric'
        });

        // Calcular el total de productos sumando las cantidades individuales
        const totalItems = carrito.products.reduce((acc, producto) => acc + producto.quantity, 0);

        // Crear la fila
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="px-4 fw-bold">#${carrito.id}</td>
            <td><i class="bi bi-person-circle me-2 text-secondary"></i>Usuario ${carrito.userId}</td>
            <td>${fecha}</td>
            <td>
                <span class="badge rounded-pill bg-light text-dark border">
                    <i class="bi bi-box-seam me-1"></i> ${totalItems} ítems
                </span>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
// DETALLE DE PRODUCTO (MODAL)
// showProductDetail(id) → abre un modal con los datos completos
// del producto (local o de la API)

function showProductDetail(id) {
    const product = products.find(p => p.id === id)
                 || ProductosAPI.find(p => p.id === id);
    if (!product) return;

    const nombre      = product.nombre      || product.title;
    const precio      = product.precio      || product.price;
    const imagen      = product.imagen      || product.image;
    const descripcion = product.descripcion || product.description;
    const categoria   = product.categoria   || product.category;

    // Crea el modal dinámicamente si no existe aún en el DOM
    let modal = document.getElementById('productDetailModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'productDetailModal';
        modal.className = 'modal fade';
        modal.tabIndex = -1;
        modal.innerHTML = `
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="detailModalTitle"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body" id="detailModalBody"></div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>`;
        document.body.appendChild(modal);
    }

    // Rellena el contenido con los datos del producto
    document.getElementById('detailModalTitle').textContent = nombre;
    document.getElementById('detailModalBody').innerHTML = `
        <div class="row g-3">
            <div class="col-md-4 text-center">
                <img src="${imagen}" style="max-width:100%; max-height:220px; object-fit:contain;">
            </div>
            <div class="col-md-8">
                <span class="badge bg-secondary mb-2">${categoria}</span>
                <p>${descripcion}</p>
                <h4 class="fw-bold">C$${Number(precio).toFixed(2)}</h4>
            </div>
        </div>`;

    new bootstrap.Modal(modal).show();
}
