
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
