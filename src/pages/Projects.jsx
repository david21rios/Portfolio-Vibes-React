// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import '../assets/styles/Projects.css';
import generateProjects from '../utils/generateProjects';

const Projects = () => {
    const [projects] = useState(generateProjects()); // Cargar proyectos dinámicamente
    const [shipPosition, setShipPosition] = useState(50);
    const [bullets, setBullets] = useState([]);
    const [isStarted, setIsStarted] = useState(false);
    const [revealedProjects, setRevealedProjects] = useState([]);

    // Manejador de teclas
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                setShipPosition((prev) => Math.max(prev - 5, 0)); // Mover izquierda
            } else if (event.key === 'ArrowRight') {
                setShipPosition((prev) => Math.min(prev + 5, 95)); // Mover derecha
            } else if ((event.key === 'Enter' || event.key === ' ')) {
                shootBullet(); // Disparar
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Función para disparar una bala
    const shootBullet = () => {
        setBullets((prev) => [...prev, { id: Date.now(), position: shipPosition, positionY: 90 }]);
    };

    // Mover balas hacia arriba y detectar colisiones
    useEffect(() => {
        const interval = setInterval(() => {
            setBullets((prevBullets) =>
                prevBullets
                    .map((bullet) => ({
                        ...bullet,
                        positionY: bullet.positionY - 2
                    }))
                    .filter((bullet) => bullet.positionY > 0)
            );
        }, 50);

        return () => clearInterval(interval);
    }, []);

    // Detectar colisión con un proyecto y revelar
    useEffect(() => {
        bullets.forEach((bullet) => {
            if (bullet.positionY <= 10 && !revealedProjects.includes(bullet.id)) {
                const projectToReveal = projects[revealedProjects.length];
                if (projectToReveal) {
                    setRevealedProjects((prev) => [...prev, bullet.id]);
                }
            }
        });
    }, [bullets, revealedProjects, projects]);

    return (
        <div className="projects-container">
            {!isStarted ? (
                <div className="instructions">
                    <h2>Press Enter or Space to start</h2>
                    <button onClick={() => setIsStarted(true)}>Start</button>
                </div>
            ) : (
                <div className="projects-wrapper">
                    <div className="spaceship" style={{ left: `${shipPosition}%` }}>▲</div>

                    {bullets.map((bullet) => (
                        <div
                            key={bullet.id}
                            className="bullet"
                            style={{ left: `${bullet.position}%`, top: `${bullet.positionY}%` }}
                        ></div>
                    ))}

                    {revealedProjects.map((id, index) => (
                        <div key={id} className="project">
                            <img src={projects[index].image} alt={projects[index].name} className="project-image" />
                            <button
                                className="project-button"
                                onClick={() => window.open(projects[index].url, '_blank')}
                            >
                                {projects[index].name}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Projects;
