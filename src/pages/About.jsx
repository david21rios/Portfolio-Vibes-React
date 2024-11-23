// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { animarAbout } from '../utils/animacionesAbout.js'
import '../assets/styles/About.css'; // Asegúrate de tener el CSS asociado

const About = () => {

    useEffect(() => {
        animarAbout();
    }, []);

    const [activeCertificate, setActiveCertificate] = useState(null);

    const certificates = [
        { id: 1, name: 'Ingles EFSET', image: '/path/to/certificate1.jpg' },
        { id: 2, name: 'Bacheloor Degree', image: '/path/to/certificate2.jpg' },
        { id: 3, name: 'Power BI', image: '/path/to/certificate3.jpg' },
    ];
    const certificates2 = [
        { id: 1, name: 'Conceptos de la programacion', image: '/path/to/certificate1.jpg' },
        { id: 2, name: 'Introduccion a la programacion', image: '/path/to/certificate2.jpg' },
        { id: 3, name: 'Java Basico', image: '/path/to/certificate3.jpg' },
    ];
    const certificates3 = [
        { id: 1, name: 'HTML y CSS', image: '/path/to/certificate1.jpg' },
        { id: 2, name: 'JavaScript', image: '/path/to/certificate2.jpg' },
        { id: 3, name: 'ReactJS Basico', image: '/path/to/certificate3.jpg' },
    ];

    const stats = [
        { label: 'Projects Completed', value: 15 },
        { label: 'Hours of Development', value: 1500 },
        { label: 'Technologies Learned', value: 6 },
    ];

    const handleCertificateClick = (id) => {
        setActiveCertificate(certificates.find((cert) => cert.id === id));
    };

    const closeCertificate = () => {
        setActiveCertificate(null);
    };

    return (
        <div className='about-container'>
            {/* Education Section */}
            <section className='education-section'>
                <h1 className='title-about'>Education</h1>
                <ul className='education-list'>
                    <li>Bachelor in Systems Engineering - Fundacion Universitaria San Jose (2020-2024)</li>
                    <li>Frontend Development Bootcamp - Platzi (2021)</li>
                    <li>JavaScript and ReactJS Advanced Course - Udemy (2022)</li>
                </ul>
            </section>

            {/* Certification Section */}
            <section className='certification-section'>
                <h1 className='title-about'>Certifications</h1>
                <ul className='certification-list'>
                    {certificates.map((cert) => (
                        <li key={cert.id}>
                            <button className='certification-button' onClick={() => handleCertificateClick(cert.id)}>
                                {cert.name}
                            </button>
                        </li>
                    ))}
                </ul>
                <ul className='certification-list'>
                    {certificates2.map((cert) => (
                        <li key={cert.id}>
                            <button className='certification-button' onClick={() => handleCertificateClick(cert.id)}>
                                {cert.name}
                            </button>
                        </li>
                    ))}
                </ul>
                <ul className='certification-list'>
                    {certificates3.map((cert) => (
                        <li key={cert.id}>
                            <button className='certification-button' onClick={() => handleCertificateClick(cert.id)}>
                                {cert.name}
                            </button>
                        </li>
                    ))}
                </ul>
                {activeCertificate && (
                    <div className='certificate-modal'>
                        <div className='modal-content'>
                            <img src={activeCertificate.image} alt={activeCertificate.name} className='certificate-image' />
                            <button className='close-button' onClick={closeCertificate}>X</button>
                        </div>
                    </div>
                )}
            </section>

            {/* Facts Section */}
            <section className='facts-section'>
                <h1 className='title-about'>Facts</h1>
                <div className='facts-grid'>
                    {stats.map((stat, index) => (
                        <div key={index} className='fact-card'>
                            <h2>{stat.value}</h2>
                            <p>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
