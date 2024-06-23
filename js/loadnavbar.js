const navbarHTML = `
<section class="lateral">
    <div class="hamburger_icon" onclick="toggleNavbar()">☰</div>
    <li id="navbar">
        <div>
            <a href="./index.html"><img src="../img/Logo.png" class="logo"></a>
        </div>
        <div class="container">
            <a href="./index.html"><img src="../img/pokedexicon.png"></a>
            <a href="./index.html">Pokedex</a>
        </div>
        <div class="container">
            <a href="./objetos.html"><img src="../img/objetosicon.png"></a>
            <a href="./objetos.html">Objetos</a>
        </div>
        <div class="container">
            <a href="./conocenos.html"><img src="../img/abouticon.png"></a>
            <a href="./conocenos.html">Conocenos</a>
        </div>
        <div class="container">
            <a href="./contacto.html"><img src="../img/contacticon.png"></a>
            <a href="./contacto.html">Contacto</a>
        </div>
    </li>
</section>
`;

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('navbar_container').innerHTML = navbarHTML;
});

function toggleNavbar() {
    var navbar = document.getElementById("navbar");
    navbar.classList.toggle("active");
	var sidebar = document.querySelector('.lateral');
	sidebar.classList.toggle('active');
}
