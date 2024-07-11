/*const ods = [
  {
    pokeImage:,
    name: "Fin De la Pobreza",
    description: "Erradicar la pobreza extrema para todas las personas en todo el mundo para 2030 es un objetivo fundamental de la Agenda 2030 para el desarrollo sostenible.",
    relation: "img/teams/arg.jpg",
  },
  {
    pokeImage:,
    name: "Hambre Cero",
    description: "El hambre es una de las mayores barreras para el desarrollo sostenible, y la erradicación del hambre es un objetivo fundamental de la Agenda 2030 para el desarrollo sostenible.",
    relation: "img/teams/arg.jpg",
    },
    {
    pokeImage:,
    name: "Salud y Bienestar",
    description: "La salud es un derecho humano fundamental y un objetivo fundamental del desarrollo sostenible. La mejora de la salud y el bienestar son prioridades para la Agenda 2030 para el desarrollo sostenible.",
    relation: "img/teams/arg.jpg",
    },
    {
    pokeImage:,
    name: "Educación de Calidad",
    description: "La educación es un derecho humano fundamental y un objetivo fundamental del desarrollo sostenible. La educación de calidad es una prioridad para la Agenda 2030 para el desarrollo sostenible.",
    relation: "img/teams/arg.jpg",
    },
    {
    pokeImage:,
    name: "Igualdad de Género",
    description: "La igualdad de género es un objetivo fundamental del desarrollo sostenible y un derecho humano fundamental. La igualdad de género es una prioridad para la Agenda 2030 para el desarrollo sostenible.",
    relation: "img/teams/arg.jpg",
    },
    {
    pokeImage:,
    name: "Agua Limpia y Saneamiento",
    description: "El agua limpia y el saneamiento son fundamentales para la salud humana y el desarrollo sostenible. El acceso a agua limpia y saneamiento es un objetivo fundamental de la Agenda 2030 para el desarrollo sostenible.",
    relation: "img/teams/arg.jpg",
    },
    {
    pokeImage:,
    name: "Energía Asequible y No Contaminante",
    description: "La energía asequible y no contaminante es fundamental para el desarrollo sostenible. El acceso a la energía es un objetivo fundamental de la Agenda 2030 para el desarrollo sostenible.",
    relation: "img/teams/arg.jpg",
    },
    {
    pokeImage:,
    name: "Trabajo Decente y Crecimiento Económico",
    description: "El trabajo decente y el crecimiento económico son fundamentales para el desarrollo sostenible. El trabajo decente y el crecimiento económico son objetivos fundamentales de la Agenda 2030 para el desarrollo sostenible.",
    relation: "img/teams/arg.jpg",
    },
    {
    pokeImage:,
    name: "Industria, Innovación e Infraestructura",
    description: "La industria, la innovación y la infraestructura son fundamentales para el desarrollo sostenible. La industria, la innovación y la infraestructura son objetivos fundamentales de la Agenda 2030 para el desarrollo sostenible.",
    relation: "img/teams/arg.jpg",
    },
    {
    pokeImage:,
    name: "Reducción de las Desigualdades",
    description: "La reducción de las desigualdades es un objetivo fundamental del desarrollo sostenible. La reducción de las desigualdades es una prioridad para la Agenda 2030 para el desarrollo sostenible.",
    relation: "img/teams/arg.jpg",
    },
    {
    pokeImage:,
    name: "Ciudades y Comunidades Sostenibles",
    description: "Las ciudades y comunidades sostenibles son fundamentales para el desarrollo sostenible. Las ciudades y comunidades sostenibles son un objetivo fundamental de la Agenda 2030 para el desarrollo sostenible.",
    relation: "img/teams/arg.jpg",
    },
    {
    pokeImage:,
    name: "Producción y Consumo Responsables",
    description: "La producción y el consumo responsables son fundamentales para el desarrollo sostenible. La producción y el consumo responsables son objetivos fundamentales de la Agenda 2030 para el desarrollo sostenible.",
    relation: "img/teams/arg.jpg",
    },
    {
    pokeImage:,
    name: "Acción por el Clima",
    description: "La acción por el clima es fundamental para el desarrollo sostenible. La acción por el clima es un objetivo fundamental de la Agenda 2030 para el desarrollo sostenible.",
    relation: "img/teams/arg.jpg",
    },
    {
    pokeImage:,
    name: "Vida Submarina",
    description: "La vida submarina es fundamental para el desarrollo sostenible. La vida submarina es un objetivo fundamental de la Agenda 2030 para el desarrollo sostenible.",
    relation: "img/teams/arg.jpg",
    },
    {
    pokeImage:,
    name: "Vida de Ecosistemas Terrestres",
    description: "La vida de ecosistemas terrestres es fundamental para el desarrollo sostenible. La vida de ecosistemas terrestres es un objetivo fundamental de la Agenda 2030 para el desarrollo sostenible.",
    relation: "img/teams/arg.jpg",
    },
    {
    pokeImage:,
    name: "Paz, Justicia e Instituciones Sólidas",
    description: "La paz, la justicia y las instituciones sólidas son fundamentales para el desarrollo sostenible. La paz, la justicia y las instituciones sólidas son objetivos fundamentales de la Agenda 2030 para el desarrollo sostenible.",
    relation: "img/teams/arg.jpg",
    },
    {
    pokeImage:,
    name: "Alianzas para Lograr los Objetivos",
    description: "Las alianzas para lograr los objetivos son fundamentales para el desarrollo sostenible. Las alianzas para lograr los objetivos son un objetivo fundamental de la Agenda 2030 para el desarrollo sostenible.",
    relation: "img/teams/arg.jpg",
    },
];*/

// Get all the ODS images
const odsImages = document.querySelectorAll(".ods-img");

// Variables to store the previously created elements
let previousImage = null;
let previousInfoContainer = null;

// Add click event listener to each ODS image
odsImages.forEach((image) => {
  image.addEventListener("click", () => {
    // Remove the previously created elements if they exist
    if (previousImage) {
      previousImage.remove();
    }
    if (previousInfoContainer) {
      previousInfoContainer.remove();
    }

    // Get the image source
    const imageSrc = image.getAttribute("src");

    // Create a new image element
    const newImage = document.createElement("img");
    newImage.src = imageSrc;

    // Create a new div element
    const odsInfoContainer = document.createElement("div");

    odsInfoContainer.innerHTML = `
            <div class="ods-info">
                <h2>ODS ${image.getAttribute("id")}</h2>
                <img src=${imageSrc}>
            </div>
        `;

    // Append the new elements to the body
    document.body.appendChild(odsInfoContainer);

    // Update the previously created elements
    previousImage = newImage;
    previousInfoContainer = odsInfoContainer;
  });
});
