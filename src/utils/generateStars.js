const generateStars = (canvas) => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const numberOfStars = 200; // Ajusta la cantidad de estrellas
    const stars = [];
    const blackHoleRadius = 60; // Radio del agujero negro
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    class Star {
        constructor() {
            this.resetPosition();
            this.speed = Math.random() * 0.2 + 0.1;
        }

        resetPosition() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 2;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        }

        update() {
            const dx = centerX - this.x;
            const dy = centerY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Mover hacia el agujero negro
            if (distance > blackHoleRadius) {
                this.x += (dx / distance) * this.speed;
                this.y += (dy / distance) * this.speed;
            } else {
                this.resetPosition();
            }
        }
    }


    class Planet {
        constructor(radius, color, speed) {
            this.radius = radius;
            this.color = color;
            this.speed = speed;
            this.angle = Math.random() * Math.PI * 2;
        }

        draw() {
            const x = centerX + Math.cos(this.angle) * this.radius;
            const y = centerY + Math.sin(this.angle) * this.radius;
            ctx.beginPath();
            ctx.arc(x, y, 15, 0, Math.PI * 2); // Planeta con radio fijo
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            this.angle += this.speed; // Movimiento circular
        }
    }

    class Moon {
        constructor(planet, distance, color, speed) {
            this.planet = planet;
            this.distance = distance;
            this.color = color;
            this.speed = speed;
            this.angle = Math.random() * Math.PI * 2;
        }

        draw() {
            const x = centerX + Math.cos(this.planet.angle) * this.planet.radius + Math.cos(this.angle) * this.distance;
            const y = centerY + Math.sin(this.planet.angle) * this.planet.radius + Math.sin(this.angle) * this.distance;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2); // Luna con radio fijo
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            this.angle += this.speed; // Movimiento circular alrededor del planeta
        }
    }

    // Crear estrellas
    for (let i = 0; i < numberOfStars; i++) {
        stars.push(new Star());
    }
    // Crear un planeta y su luna
    const planet = new Planet(200, 'blue', 0.002);  // Radio y velocidad de rotación

    const moon = new Moon(planet, 40, 'gray', 0.001); // Distancia y velocidad de la luna

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Mover y dibujar estrellas
        stars.forEach((star) => {
            star.update();
            star.draw();
        });

        // Mover y dibujar planeta y luna
        planet.update();
        planet.draw();

        moon.update();
        moon.draw();

        requestAnimationFrame(animate);
    };

    animate();
};

export { generateStars };
