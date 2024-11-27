// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { animarAbout } from '../utils/animacionesAbout'; // Asegúrate de que esta ruta sea válida
import '../assets/styles/About.css'; // Revisa si esta ruta es correcta

const About = () => {
    useEffect(() => {
        animarAbout(); // Ejecuta las animaciones al montar el componente
    }, []);

    const [activeCertificate, setActiveCertificate] = useState(null);

    const certificates = [
        { id: 1, name: 'Ingles EFSET', image: '../assets//images/Certificado/cert-ing.jpg' },
        { id: 2, name: 'Bacheloor Degree', image: '/assets/images/certificate2.jpg' },
        { id: 3, name: 'Power BI', image: '../assets/images/Certificado/' },
    ];
    const certificates2 = [
        { id: 4, name: 'Conceptos de la programacion', image: '../assets/images/Certificado/cert1.png' },
        { id: 5, name: 'Introduccion a la programacion', image: '../assets/images/Certificado/cert2.png' },
        { id: 6, name: 'Java Basico', image: '../assets/images/Certificado/cert3.png' },
    ];
    const certificates3 = [
        { id: 7, name: 'HTML y CSS', image: '../assets/images/Certificado/cert4.png' },
        { id: 8, name: 'JavaScript', image: '../assets/images/Certificado/cert5.png' },
        { id: 9, name: 'ReactJS Basico', image: '../assets/images/Certificado/cert6.png' },
    ];

    const stats = [
        { label: 'Projects Completed', value: 15 },
        { label: 'Hours of Development', value: 1500 },
        { label: 'Technologies Learned', value: 6 },
    ];

    const handleCertificateClick = (id) => {
        const cert = [...certificates, ...certificates2, ...certificates3].find((c) => c.id === id);
        setActiveCertificate(cert);
    };

    const closeCertificate = () => setActiveCertificate(null);

    return (
        <div className='about-container'>
            {/* Education Section */}
            <section className='education-section'>
                <h1 className='title-about'>Education</h1>
                <ul className='education-list'>
                    <li>Bachelor in Systems Engineering - Fundacion Universitaria San Jose (2020-2024)</li>
                    <li>Motorcycle Maintenance Technician (2016 - 2017)</li>
                </ul>
            </section>

            {/* Certification Section */}
            <section className='certification-section'>
                <h1 className='title-about'>Certifications</h1>
                {[certificates, certificates2, certificates3].map((group, index) => (
                    <ul key={index} className='certification-list'>
                        {group.map((cert) => (
                            <li key={cert.id}>
                                <button className='certification-button' onClick={() => handleCertificateClick(cert.id)}>
                                    {cert.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                ))}
                {activeCertificate && (
                    <div className='certificate-modal'>
                        <div className='modal-content'>
                            <img
                                src={activeCertificate.image}
                                alt={activeCertificate.name}
                                className='certificate-image'
                            />
                            <button className='close-button' onClick={closeCertificate}>
                                X
                            </button>
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
