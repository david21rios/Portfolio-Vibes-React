
import { gsap } from 'gsap';

export const animarAbout = () => {
  // Animaciones que se deben ejecutar solo cuando About se muestra
    gsap.from('.education-section', { opacity: 2, y: 100, duration: 1, stagger: 0.3 });
    gsap.from('.certification-section', { opacity: 1, y: 100, duration: 1, stagger: 0.3 });
    gsap.from('.facts-section', { opacity: 1, y: 100, duration: 1, stagger: 0.3 });
};