import { useState, useEffect } from 'react';

const useKeyboardAndClickListener = (startGame, projectRedirect) => {
    const [isShooting, setIsShooting] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                startGame();  // Inicia el juego
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [startGame]);

    const handleClick = (event) => {
        const projectUrl = event.target.getAttribute('data-url');
        if (projectUrl) {
            projectRedirect(projectUrl);  // Redirige al enlace del proyecto
        }
    };

    return { isShooting, setIsShooting, handleClick };
};

export default useKeyboardAndClickListener;
