// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import '../assets/styles/Skills.css'; // Asegúrate de crear e importar este archivo CSS

const Skills = () => {
    const skills = [
        { name: 'HTML', level: '80%' },
        { name: 'CSS', level: '60%' },
        { name: 'JavaScript', level: '65%' },
        { name: 'Java', level: '40%' },
        { name: 'Python', level: '40%' },
        { name: 'WordPress/CMS', level: '50%' },
        { name: 'ReactJS', level: '60%' },
        { name: 'Team Work', level: '90%' },
    ];

    const languages = [
        { name: 'Spanish', level: '100%' },
        { name: 'English', level: '75%' },
        { name: 'Slovak', level: '50%' },
        { name: 'Polish', level: '30%' },
    ];

    useEffect(() => {
        const bars = document.querySelectorAll('.progress-bar');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.width = bar.getAttribute('aria-valuenow') + '%';
            }, index * 200); // Delay de 200ms entre cada barra para la animación
        });
    }, []);

    return (
        <div className="skills-container">
            <section id="skills" className="skills section-bg">
                <div className="container" data-aos="fade-up">
                    <div className="skills-content">
                        <div className="skills-column">
                            <h2>Skills</h2> {/* Encabezado para Skills */}
                            {skills.map((skill, index) => (
                                <div key={index} className="progress">
                                    <span className="skill-name">{skill.name}</span> {/* Nombre de la skill separado */}
                                    <div className="progress-bar-wrap skills-progress-bar">
                                        <div className="progress-bar" role="progressbar" aria-valuenow={parseInt(skill.level)} aria-valuemin="0" aria-valuemax="100">
                                            <span className="skill-val">{skill.level}</span> {/* Porcentaje dentro de la barra */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="languages-column">
                            <h2>Languages</h2> {/* Encabezado para Languages */}
                            {languages.map((language, index) => (
                                <div key={index} className="progress">
                                    <span className="skill-name">{language.name}</span> {/* Nombre del idioma separado */}
                                    <div className="progress-bar-wrap languages-progress-bar">
                                        <div className="progress-bar" role="progressbar" aria-valuenow={parseInt(language.level)} aria-valuemin="0" aria-valuemax="100">
                                            <span className="skill-val">{language.level}</span> {/* Porcentaje dentro de la barra */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Skills;
