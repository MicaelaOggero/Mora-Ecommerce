async function getProductos(){
    try {
        const res = await fetch("../productos.json");
        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }
        const resJson = await res.json();
        return resJson;
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
}