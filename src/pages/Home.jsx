// src/pages/Home.js
// eslint-disable-next-line no-unused-vars
import React from 'react';

const Home = () => {
    return (
        <section className="intro">
            <h1>David Santiago Ríos Lara</h1>
            <p>Software Developer</p>
            <div className="social-links">
                <a href="https://www.linkedin.com/in/davidriosl/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com/david21rios" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
            <img src={""} alt="David Santiago Ríos Lara" className="profile-image" />
        </section>
    );
};

export default Home;
