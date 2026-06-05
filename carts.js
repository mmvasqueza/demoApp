
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


