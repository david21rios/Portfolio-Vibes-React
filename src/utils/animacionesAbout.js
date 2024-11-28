// animacionesAbout.js
export const animarAbout = () => {
    const sections = document.querySelectorAll('.education-section, .certification-section, .facts-section');

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));

    // Animar las listas de educación y certificación
    const educationItems = document.querySelectorAll('.education-list li');
    const certificationItems = document.querySelectorAll('.certification-list li');

    educationItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('shuffle');
    });

    certificationItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('shuffle');
    });
};
