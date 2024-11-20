// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Home.css'; // Estilos específicos de la página Home
// import davidImagen from '../assets/images/DavidRios-perfil/DavidCV.jpg'


const Home = () => {
    return (
    <div className="home-container">

        {/* Sección izquierda: breve introducción */}
        <div className="left-section">
            {/* Título y breve introducción dentro de un recuadro */}
                <div className="title-button">
                    Introduccion
                </div>
                <div className="intro-box">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
                <br>
                </br>
                <br>

                </br>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
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
            <h1 className="title-home">David Santiago Ríos Lara</h1>
        
            {/* Logos de LinkedIn y GitHub */}
            <div className="social-links">
            <a href="https://www.linkedin.com/in/davidriosl/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="bi bi-linkedin" style={{ fontSize: '2rem', color: '#0A66C2' }}></i>
            </a>
            <a href="https://github.com/david21rios" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="bi bi-github" style={{ fontSize: '2rem', color: '#181717' }}></i>
            </a>
            </div>
        </div>
        
    </div>
    );
}

export default Home;
