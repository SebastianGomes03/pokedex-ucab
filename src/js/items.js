/* Página de objetos */

let db; // Variable global para almacenar la referencia a la base de datos IndexedDB.

// Lista de objetos en la página
const itemList = document.getElementById("item-list");

// URL base de la API de Pokémon para obtener datos de objetos. 
const itemUrl = "https://pokeapi.co/api/v2/item/";

// Lista de tarjetas de objetos en la página.
const items = [];

// Lista de tarjetas extendidas de objetos en la página.
const items_extended = []

// inicio y fin de la lista de objetos
const list_starts_ends = [
  [1, 241],
  [242, 482],
  [483, 723],
  [724, 964],
  [965, 1205]
]

// Maneja el evento necesario para actualizar la base de datos IndexedDB cuando se necesita una actualización.

async function initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("PokedexDB", 1);
  
      request.onerror = (event) => {
        console.error("Database error:", event.target.error);
        reject(event.target.error);
      };
  
      request.onsuccess = (event) => {
        db = event.target.result; // Asegúrate de que `db` esté definido en un ámbito accesible
        resolve(db);
      };
  
      request.onupgradeneeded = function (event) {
        db = event.target.result; // Almacena la referencia a la base de datos.
        // Verifica si el almacén de objetos "pokemons" ya existe, si no, lo crea.
        if (!db.objectStoreNames.contains("pokemons")) {
          db.createObjectStore("pokemons", { keyPath: "id" }); // Crea un almacén de pokemones con "id" como clave primaria.
          db.createObjectStore("items", { keyPath: "id" }); // Crea un almacén de objetos con "id" como clave primaria.
        }
      };
    });
  }


// Función para guardar los items en la base de datos
function saveItemData(item) {
  if (!db) {
    console.error("Database is not initialized.");
    return;
  }

  // Crea una transacción de escritura en el almacén de objetos 'items'
  const transaction = db.transaction(["items"], "readwrite");

  // Obtiene el almacén de objetos 'items' de la transacción
  const store = transaction.objectStore("items");

  // Intenta guardar el objeto item en el almacén de objetos
  const request = store.put(item); // Use `put` to update if the key already exists

  return new Promise((resolve, reject) => {
    request.onsuccess = function () {
      resolve(request.result);
    };

    request.onerror = function () {
      console.error("Error saving item:", request.error);
      reject(request.error);
    };
  });
}

// Función para obtener datos de objetos desde una API y almacenar/recuperar estos datos usando IndexedDB
async function getItemData(firstItem, lastItem) {
  const itemData = [];
  for (let i = firstItem; i <= lastItem; i++) {
    try {
        // Intenta obtener los datos del objeto de IndexedDB.
        const dataFromDB = await getItemFromIndexedDB(i);
        if (dataFromDB && 
          dataFromDB.sprites && 
          dataFromDB.name) {
          // Si los datos están en IndexedDB, los agrega a la lista de datos de objetos.
          itemData.push(dataFromDB);
          console.log("Se agrego el objeto " + i);
        } else {
          // Si los datos no están en IndexedDB, realiza una solicitud a la API.
          const finalUrl = `${itemUrl}${i}`;
          const data = await fetch(finalUrl).then((response) => response.json());
          // Agrega los datos obtenidos de la API a la lista de datos de objetos.
          itemData.push(data);
          // Almacena los datos obtenidos en IndexedDB para uso futuro.
          await saveItemData(data);
        }

      
    } catch (error) {
      // Muestra un mensaje de error en la consola si ocurre un error durante el proceso.
      console.error("Failed to fetch or store item data:", error);
    }
  }
  // Genera una tarjeta de objeto para cada objeto en la lista de datos de objetos.
  itemData.forEach((item) => generateItemCard(item));
}

// Función de ayuda para obtener datos de IndexedDB
async function getItemFromIndexedDB(id) {
  if (!db) {
    console.log("Database is not initialized. Initializing now.");
    await initDB();
  }
  // Retorna una promesa que se resuelve con los datos del Pokémon o se rechaza con un error.
  return new Promise((resolve, reject) => {
    // Inicia una transacción de solo lectura en el almacén de objetos "pokemons".
    const transaction = db.transaction(["items"], "readonly");
    // Accede al almacén de objetos "pokemons".
    const store = transaction.objectStore("items");
    // Realiza una solicitud para obtener el Pokémon por su ID.
    const request = store.get(id);
    // En caso de éxito, resuelve la promesa con los datos obtenidos.
    request.onsuccess = () => resolve(request.result);
    // En caso de error, rechaza la promesa con el error ocurrido.
    request.onerror = () => reject(request.error);
  });
}

// Crea una tarjeta de objeto y la añade a la lista de objetos en la interfaz de usuario.
function generateItemCard(data) {
  const id = data.id; // ID del objeto.
  const name = data.name; // Nombre del objeto.
  const sprite = data.sprites.default; // URL de la imagen del objeto.
  const cost = data.cost; // Costo del objeto.
  const effect = data.effect_entries[0].effect; // Efecto del objeto.

  const li = document.createElement("li"); // Crea un nuevo elemento 'li'.

  // Define el contenido interno del elemento 'li', incluyendo la imagen del objeto, el nombre, el costo y el efecto del objeto.
  li.innerHTML = `
        <div class="item">
            <p>${id}</p>
            <div class="item_sprite">
                <img src="${sprite}" alt="sprite">
            </div>
            <p class="item_name">${name}</p>
        </div>
    `;

  itemList.appendChild(li); // Añade el elemento 'li' a la lista de objetos en el DOM.
}

function clearItemList() {
  itemList.innerHTML = ""; // Limpia el contenido de la lista de objetos.
}

// Función para cargar los objetos en la página.
function loadItems(firstItem, lastItem) {
  clearItemList(); // Limpia la lista de objetos antes de cargar nuevos objetos.
  getItemData(firstItem, lastItem); // Obtiene los datos de los objetos del 1 al 100.
}

function generarBotones() {
  const botones = document.getElementById("buttons");
  list_starts_ends.forEach(e => {
    const button = document.createElement("button");
    button.className = "button";
    button.innerHTML = `Items ${e[0]} - ${e[1]}`;
    button.addEventListener("click", () => loadItems(e[0], e[1]));
    botones.appendChild(button);
    console.log(e);
  });

}

window.addEventListener("load", () => loadItems(1, 241)); // Carga los objetos del 1 al 100 cuando la página se carga por primera vez.
window.addEventListener("load", () => generarBotones())