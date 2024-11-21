// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

const ProjectFooter = () => {
    return (
        <footer>
    <p style={{color:'white', fontSize: '0.7rem', fontFamily:'VT323, monospace' }}>
                © 2024 Copyright <strong>
                <Link to="/"><span>David Rios</span></Link>
                </strong>. All Rights Reserved
            </p>
        </footer>
    );
};

export default ProjectFooter;