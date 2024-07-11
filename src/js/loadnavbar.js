document.addEventListener('DOMContentLoaded', function() {
    // Detecta si el usuario se encuentra en index.html o en la raíz del sitio
    const isOnIndexPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';

    // Define el HTML para la barra de navegación lateral con rutas condicionales
    const navbarHTML = `
    <section class="lateral">
        <!-- Icono de hamburguesa para expandir/colapsar la barra de navegación -->
        <div class="hamburger_icon" onclick="toggleNavbar()">☰</div>
        <li id="navbar">
            <!-- Logo de la página -->
            <div>
                <a href="${isOnIndexPage ? './index.html' : '../index.html'}"><img src="${isOnIndexPage ? './img/Logo.png' : '../img/Logo.png'}" class="logo"></a>
            </div>
            <!-- Enlace a la página principal (Pokedex) -->
            <div class="container">
                <a href="${isOnIndexPage ? './index.html' : '../index.html'}"><img src="${isOnIndexPage ? './img/pokedexicon.png' : '../img/pokedexicon.png'}"></a>
                <a href="${isOnIndexPage ? './index.html' : '../index.html'}">Pokedex</a>
            </div>
            <!-- Enlace a la página de objetos -->
            <div class="container">
                <a href="${isOnIndexPage ? './html/objetos.html' : './objetos.html'}"><img src="${isOnIndexPage ? './img/objetosicon.png' : '../img/objetosicon.png'}"></a>
                <a href="${isOnIndexPage ? './html/objetos.html' : './objetos.html'}">Objetos</a>
            </div>
            <!-- Enlace a la página de información sobre el proyecto o equipo -->
            <div class="container">
                <a href="${isOnIndexPage ? './html/conocenos.html' : './conocenos.html'}"><img src="${isOnIndexPage ? './img/abouticon.png' : '../img/abouticon.png'}"></a>
                <a href="${isOnIndexPage ? './html/conocenos.html' : './conocenos.html'}">Conocenos</a>
            </div>
            <!-- Enlace a la página de contacto -->
            <div class="container">
                <a href="${isOnIndexPage ? './html/contacto.html' : './contacto.html'}"><img src="${isOnIndexPage ? './img/contacticon.png' : '../img/contacticon.png'}"></a>
                <a href="${isOnIndexPage ? './html/contacto.html' : './contacto.html'}">Contacto</a>
            </div>
        </li>
    </section>
    `;

    // Inserta el HTML de la barra de navegación en el documento
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
});
// Espera a que el contenido del DOM esté completamente cargado.
document.addEventListener("DOMContentLoaded", function() {
  // Inserta el HTML de la barra de navegación en el elemento con ID 'navbar_container'.
  document.getElementById('navbar_container').innerHTML = navbarHTML;
});

// Función para alternar la visibilidad de la barra de navegación lateral.
function toggleNavbar() {
    // Obtiene el elemento de la barra de navegación por su ID.
    var navbar = document.getElementById("navbar");
    // Alterna la clase 'active' para mostrar u ocultar la barra de navegación.
    navbar.classList.toggle("active");

    // Obtiene el elemento de la barra lateral (sidebar) por su clase.
    var sidebar = document.querySelector('.lateral');
    // Alterna la clase 'active' en la barra lateral para expandir o colapsar.
    sidebar.classList.toggle('active');
}
