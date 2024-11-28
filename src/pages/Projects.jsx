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
                            <div>
                                <section id="services" className="services"> <div className="container" data-aos="fade-up"> <div className="section-title"> <h2>{project.name}</h2> <p>{project.description}</p> </div> <div className="row"> <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100"> <div className={project.icon} style={{ cursor: 'pointer' }}> <div className="icon"> <svg width="100" height="100" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg"> <path stroke="none" strokeWidth="0" fill="#f5f5f5" d="M300,521.0016835830174C376.1290562159157,517.8887921683347,466.0731472004068,529.7835943286574,510.70327084640275,468.03025145048787C554.3714126377745,407.6079735673963,508.03601936045806,328.9844924480964,491.2728898941984,256.3432110539036C474.5976632858925,184.082847569629,479.9380746630129,96.60480741107993,416.23090153303,58.64404602377083C348.86323505073057,18.502131276798302,261.93793281208167,40.57373210992963,193.5410806939664,78.93577620505333C130.42746243093433,114.334589627462,98.30271207620316,179.96522072025542,76.75703585869454,249.04625023123273C51.97151888228291,328.5150500222984,13.704378332031375,421.85034740162234,66.52175969318436,486.19268352777647C119.04800174914682,550.1803526380478,217.28368757567262,524.383925680826,300,521.0016835830174"></path> </svg> <i className={project.i}></i> </div> <h4><a href={project.url} style={{ color: 'blue', textDecoration: 'underline' }}>{project.name}</a></h4></div> </div> </div> </div> </section>
                            </div>
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
