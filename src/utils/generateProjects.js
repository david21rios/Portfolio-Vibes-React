// Utilidad para generar dinámicamente proyectos
const generateProjects = () => {
    const projects = [
        {
            id: 1,
            name: "Project 1",
            image: "/assets/images/project1.jpg",
            url: "https://example.com/project1",
        },
        {
            id: 2,
            name: "Project 2",
            image: "/assets/images/project2.jpg",
            url: "https://example.com/project2",
        },
        {
            id: 3,
            name: "Project 3",
            image: "/assets/images/project3.jpg",
            url: "https://example.com/project3",
        },
        {
            id: 4,
            name: "Project 4",
            image: "/assets/images/project4.jpg",
            url: "https://example.com/project4",
        },
        {
            id: 5,
            name: "Project 5",
            image: "/assets/images/project5.jpg",
            url: "https://example.com/project5",
        },
    ];

    // Agregar posiciones aleatorias a los proyectos
    const columns = [10, 30, 50, 70, 90]; // Columnas predefinidas para alineación
    return projects.map((project, index) => ({
        ...project,
        positionX: columns[index % columns.length], // Asignar columna en base al índice
        positionY: Math.random() * 50 + 10, // Altura aleatoria dentro del rango
    }));
};

export default generateProjects;
