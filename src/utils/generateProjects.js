// Función para generar proyectos con posiciones específicas
const generateProjects = () => {
    const projects = [
        { id: 1, name: "Fundacion Manantial", image: "/assets/images/project1.jpg", url: "https://funmanantial.org/", i: "bi bi-droplet-half", icon: "icon-box iconbox-blue" },
        { id: 2, name: "Rivaltec LTDA", image: "/assets/images/project2.jpg", url: "https://www.rivaltec.net/", i: "bi bi-cpu-fill", icon: "icon-box iconbox-orange" },
        { id: 3, name: "Los Mexikas", image: "/assets/images/project3.jpg", url: "https://www.losmexikas.com/", i: "bi bi-egg-fried", icon: "icon-box iconbox-pink" },
        { id: 4, name: "David Rios", image: "/assets/images/project4.jpg", url: "https://www.davidriosl.com/", i: "bi bi-file-earmark", icon: "icon-box iconbox-orange" },
        // { id: 5, name: "Project 5", image: "/assets/images/project5.jpg", url: "https://example.com/project5" },
        // { id: 6, name: "Project 6", image: "/assets/images/project6.jpg", url: "https://example.com/project6" },
        // { id: 7, name: "Project 7", image: "/assets/images/project7.jpg", url: "https://example.com/project7" },
        // { id: 8, name: "Project 8", image: "/assets/images/project8.jpg", url: "https://example.com/project8" },
    ];

    const columns = [20, 40, 60, 80]; // Centrar y distribuir los proyectos en la fila
    return projects.map((project, index) => ({
        ...project,
        positionX: columns[index % columns.length],
        positionY: index < 4 ? 10 : 40, // Ajustar las posiciones Y para las filas
    }));
};

export default generateProjects;
