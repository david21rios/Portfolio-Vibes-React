// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Home.css'; // Estilos específicos de la página Home
// import davidImagen from '../assets/images/DavidRios-perfil/DavidCV.jpg'


const Home = () => {

    const [color, setcolor] = useState('white');//Estado inicial del color

    useEffect(() => {
        const colors = ['#9A00FF', '#00AFFF', '#FFDD00', '#6A00FF'];
        const interval = setInterval(() => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            setcolor(randomColor);//Cambia a un color aleatorio
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home-container">

            {/* Sección izquierda: breve introducción */}
            <div className="left-section">
                {/* Título y breve introducción dentro de un recuadro */}
                <div className="intro-title">
                    <h1 className='title-button'>Introduccion</h1>
                </div>
                <div className="intro-box">
                    <p className='intro-text'>Welcome! I am a dedicated software developer with a strong focus on crafting innovative and scalable digital solutions. My expertise lies in transforming ideas into seamless user experiences through efficient design and clean, maintainable code.</p>
                    <br>
                    </br>
                    <br>
                    </br>
                    <p className='intro-text'>Driven by curiosity and a commitment to excellence, I continuously refine my skills to stay ahead in the ever-evolving tech landscape. Let&apos;s collaborate to bring impactful and forward-thinking projects to life.</p>

                </div>

                {/* Botón/link a la página About */}
                <Link to="/about">
                    <button className="about-button">About me</button>
                </Link>
            </div>

            {/* <div className="middle-section">
            <div className="image-container">
                <img src={davidImagen} alt="David Rios" className="home-imagen"></img>
            </div>
        </div> */}

            {/* Sección derecha: nombre, enlaces y logos */}
            <div className="right-section">
                <h1 className="title-home"
                    style={{ color: color }}>
                    David Santiago Ríos Lara
                </h1>

                {/* Logos de LinkedIn y GitHub */}
                <div className="social-links">
                    <a href="https://www.linkedin.com/in/davidriosl/" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <i className="bi bi-linkedin" style={{ fontSize: '2rem' }}></i>
                    </a>
                    <a href="https://github.com/david21rios" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <i className="bi bi-github" style={{ fontSize: '2rem' }}></i>
                    </a>
                </div>
            </div>

        </div>
    );
}

export default Home;
