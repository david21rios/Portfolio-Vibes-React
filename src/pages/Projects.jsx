// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback } from 'react';
import '../assets/styles/Projects.css';
import generateProjects from '../utils/generateProjects';
import spaceshipImage from '../assets/images/galaga_nave.png';

// Componente principal que maneja el estado del juego
const Projects = () => {
    const [isStarted, setIsStarted] = useState(false); // Estado para determinar si el juego ha comenzado

    // Función para iniciar el juego
    const startGame = () => {
        setIsStarted(true);
    };

    return (
        <div className="projects-container">
            {!isStarted ? ( // Muestra las instrucciones si el juego no ha comenzado
                <div className="instructions">
                    <h2 className="title-instructions">Press Enter or Space to shoot.</h2>
                    <p className="text-instructions">You can move using the arrow keys to the right or left.</p>
                    <button className="start-button" onClick={startGame}>Start</button>
                </div>
            ) : (
                <GameComponent /> // Componente del juego principal
            )}
        </div>
    );
};

// Componente del juego principal
const GameComponent = () => {
    const [shipPosition, setShipPosition] = useState(50); // Estado para la posición de la nave
    const [bullets, setBullets] = useState([]); // Estado para las balas disparadas
    const [revealedProjects, setRevealedProjects] = useState([]); // Estado para los proyectos revelados
    const [projects] = useState(generateProjects()); // Estado para los proyectos generados
    const [color, setColor] = useState('white'); //Estado inicial del color

    // Función para disparar una bala
    const shootBullet = useCallback(() => {
        setBullets((prev) => [...prev, { id: Date.now(), position: shipPosition + 2.5, positionY: 90 }]);
    }, [shipPosition]);

    // Efecto para manejar las teclas de control
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                setShipPosition((prev) => Math.max(prev - 5, 0));
            } else if (event.key === 'ArrowRight') {
                setShipPosition((prev) => Math.min(prev + 5, 95));
            } else if (event.key === 'Enter' || event.key === ' ') {
                shootBullet();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [shootBullet]);

    // Efecto para mover las balas hacia arriba
    useEffect(() => {
        const interval = setInterval(() => {
            setBullets((prevBullets) =>
                prevBullets
                    .map((bullet) => ({ ...bullet, positionY: bullet.positionY - 2 }))
                    .filter((bullet) => bullet.positionY > 0)
            );
        }, 50);
        return () => clearInterval(interval);
    }, []);

    // Efecto para manejar la colisión de las balas con los proyectos
    useEffect(() => {
        bullets.forEach((bullet) => {
            if (bullet.positionY <= 10) {
                projects.forEach((project, index) => {
                    const isSecondRow = index >= 4; // Proyectos de la segunda fila
                    const targetPositionX = index % 4 === 0 ? 20 : index % 4 === 1 ? 40 : index % 4 === 2 ? 60 : 80;
                    if (isSecondRow && bullet.position >= targetPositionX - 5 && bullet.position <= targetPositionX + 5) {
                        const upperRowIndex = index - 4;
                        if (revealedProjects.includes(upperRowIndex)) {
                            if (!revealedProjects.includes(index)) {
                                setRevealedProjects((prev) => [...prev, index]);
                            }
                        }
                    } else if (!isSecondRow && bullet.position >= targetPositionX - 5 && bullet.position <= targetPositionX + 5) {
                        if (!revealedProjects.includes(index)) {
                            setRevealedProjects((prev) => [...prev, index]);
                        }
                    }
                });
            }
        });
    }, [bullets, revealedProjects, projects]);

    // Efecto para manejar el final del juego
    useEffect(() => {
        if (revealedProjects.length === projects.length) {
            setTimeout(() => {
                const ship = document.querySelector('.spaceship');
                ship.classList.add('fly-away');
                setTimeout(() => ship.remove(), 2000);
            }, 500);
        }
    }, [revealedProjects, projects.length]);

    // Efecto para cambiar el color del título de forma aleatoria 
    useEffect(() => {
        const colors = ['#9A00FF', '#00AFFF', '#FFDD00', '#6A00FF']; const interval = setInterval(() => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            setColor(randomColor); // Cambia a un color aleatorio 
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="projects-wrapper">
            <div className="spaceship" style={{ left: `${shipPosition}%` }}>
                <img src={spaceshipImage} alt="Spaceship" style={{ width: '100%' }} />
            </div>
            {bullets.map((bullet) => (
                <div key={bullet.id} className="bullet" style={{ left: `${bullet.position}%`, top: `${bullet.positionY}%` }}></div>
            ))}
            {projects.map((project, index) => (
                <div key={index} className="project" style={{ marginTop: index >= 4 ? '150px' : '0' }}>
                    {revealedProjects.includes(index) ? (
                        <>
                            <div className={`target-point color${(index % 4) + 1}`} style={{ display: 'none' }}></div>
                            {/* Iconos con bootstrap */} <div> <section id="services" className="services"> <div className="container" data-aos="fade-up"> <div className="section-title"> <h2 style={{ color }}>{project.name}</h2> <p>{project.description}</p> </div> <div className="row"> <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100"> <div className={`project-icon ${project.icon}`} style={{ color: `${project.color}` }} onClick={() => window.open(project.url, '_blank')} > <div className="icon"> <i className={project.i}></i> </div> <h4 style={{ display: 'none' }}>{project.name}</h4></div> </div> </div> </div> </section> </div>
                        </>
                    ) : (
                        <div className={`target-point color${(index % 4) + 1}`}></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Projects;
