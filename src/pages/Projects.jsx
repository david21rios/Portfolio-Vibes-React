// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import useKeyboardAndClickListener  from '../utils/generateProjects.js'; 
import '../assets/styles/Projects.css';

const Projects = () => {
    const [projects] = useState([
        { id: 1, name: 'Project 1', image: '/assets/images/project1.jpg', url: 'https://example.com/project1' },
        { id: 2, name: 'Project 2', image: '/assets/images/project2.jpg', url: 'https://example.com/project2' },
        { id: 3, name: 'Project 3', image: '/assets/images/project3.jpg', url: 'https://example.com/project3' },
        { id: 4, name: 'Project 4', image: '/assets/images/project4.jpg', url: 'https://example.com/project4' },
        { id: 5, name: 'Project 5', image: '/assets/images/project5.jpg', url: 'https://example.com/project5' }
    ]);

    // Estado de la nave, disparos y demás
    const [shipPosition, setShipPosition] = useState(50); // La nave se posiciona en el 50% de la pantalla (en la parte inferior)
    const [bullets, setBullets] = useState([]); // Guardar las balas disparadas
    const [shotsFired, setShotsFired] = useState(0); // Número de disparos realizados
    const [isStarted, setIsStarted] = useState(false); // Estado de inicio

    // Usamos el hook, eliminamos la declaración local de setIsShooting
    const { isShooting, setIsShooting } = useKeyboardAndClickListener(
        () => setIsStarted(true), // Cuando presionas Enter o Space, comienza el juego
        (projectUrl) => window.location.href = projectUrl // Redirige al proyecto
    );

    // Función para manejar la tecla de disparo
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                setShipPosition(prev => Math.max(prev - 5, 0)); // Mover izquierda
            } else if (event.key === 'ArrowRight') {
                setShipPosition(prev => Math.min(prev + 5, 95)); // Mover derecha
            } else if ((event.key === 'Enter' || event.key === ' ') && !isShooting) {
                setIsShooting(true); // Iniciar disparo
                setShotsFired(prev => prev + 1); // Incrementar el contador de disparos
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isShooting, setIsShooting]); // Escucha el cambio en el estado de disparo

    // Lógica de disparos
    useEffect(() => {
        if (isShooting) {
            const newBullet = { id: Date.now(), position: shipPosition };
            setBullets(prev => [...prev, newBullet]);

            const timer = setTimeout(() => {
                setShotsFired(prev => prev + 1); // Incrementar el número de disparos realizados
                setIsShooting(false); // Detener el disparo después de cada "proyecto"
            }, 1000);  // Intervalo de tiempo entre disparos

            return () => clearTimeout(timer); // Limpiar el intervalo
        }
    }, [isShooting, shipPosition, setShotsFired, setIsShooting]);

    // Mover las balas hacia arriba
    useEffect(() => {
        const moveBullets = setInterval(() => {
            setBullets(prevBullets => {
                const newBullets = prevBullets.map(bullet => ({
                    ...bullet,
                    positionY: (bullet.positionY || 90) - 2 // Mover la bala hacia arriba
                }));

                return newBullets.filter(bullet => bullet.positionY > 0); // Eliminar balas fuera de la pantalla
            });
        }, 10);

        return () => clearInterval(moveBullets);
    }, []);

    return (
        <div className='projects-container'>
            {!isStarted ? (
                <div className='instructions'>
                    <h2>Press Enter or Press Space to start</h2>
                </div>
            ) : (
                <div className='projects-wrapper'>
                    {/* Nave */}
                    <div className='spaceship' style={{ left: `${shipPosition}%` }}>
                        ▲
                    </div>

                    {/* Disparos */}
                    {bullets.map((bullet) => (
                        <div key={bullet.id} className='bullet' style={{ left: `${bullet.position}%`, top: `${bullet.positionY}%` }}>
                            {/* Generar proyectos al explotar la bala */}
                            {bullet.positionY <= 10 && shotsFired < projects.length && (
                                <div className='project' style={{ top: `${bullet.positionY}%` }}>
                                    <img src={projects[shotsFired].image} alt={projects[shotsFired].name} className='project-image' />
                                    <button
                                        className='project-button'
                                        onClick={() => window.location.href = projects[shotsFired].url}
                                    >
                                        {projects[shotsFired].name}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Projects;
