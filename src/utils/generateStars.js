// src/utils/generateStars.js
const generateStars = (canvas) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const numberOfStars = 100; // Número de estrellas que quieres
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const blackHoleRadius = 100; // Radio del agujero negro

    // Array para almacenar las estrellas
    const stars = [];

    // Clase para crear estrellas
    class Star {
        constructor() {
            this.x = Math.random() * canvas.width; // Posición aleatoria en el eje X
            this.y = Math.random() * canvas.height; // Posición aleatoria en el eje Y
            this.radius = Math.random() * 2; // Radio aleatorio para cada estrella
            this.speed = Math.random() * 0.5 + 0.2; // Velocidad aleatoria para el movimiento
            this.angle = Math.random() * Math.PI * 2; // Ángulo aleatorio para el movimiento
        }

      // Método para dibujar la estrella
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        }

        // Método para actualizar la posición de la estrella
        update() {
            // Mover las estrellas hacia el centro (simulando que son absorbidas)
            const dx = centerX - this.x;
            const dy = centerY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const moveX = dx / distance * this.speed;
            const moveY = dy / distance * this.speed;

            this.x += moveX;
            this.y += moveY;

            // Si la estrella llega al agujero negro, la reiniciamos en una nueva posición aleatoria
            if (distance < blackHoleRadius) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
            }
        }
    }

    // Crear las estrellas
    for (let i = 0; i < numberOfStars; i++) {
        stars.push(new Star());
    }

    // Función para dibujar el agujero negro
    const drawBlackHole = () => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, blackHoleRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
    };

    // Función para animar las estrellas y el agujero negro
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

      // Dibujar las estrellas
        stars.forEach(star => {
            star.update();
            star.draw();
        });

        // Dibujar el agujero negro
        drawBlackHole();

      requestAnimationFrame(animate); // Volver a llamar a la función para el siguiente frame
    };

    // Iniciar la animación
    animate();
};

export { generateStars };
