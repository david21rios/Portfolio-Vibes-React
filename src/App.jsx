import React, { Suspense, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/styles/App.css';
import './assets/styles/background.css';
import { generateStars } from './utils/generateStars';
import ProjectFooter from './components/Footer';
import { Link } from 'react-router-dom';

const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Habilidades = React.lazy(() => import('./pages/Skills'));
const Contact = React.lazy(() => import('./pages/Contact'));

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const adjustCanvasSize = () => {
      const container = document.getElementById('canvas-container');
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    adjustCanvasSize();  // Ajustar tamaño inicial

    // Inicializar las estrellas y planetas en el canvas
    generateStars(canvas);

    window.addEventListener('resize', adjustCanvasSize);  // Actualizar tamaño al redimensionar
    return () => {
      window.removeEventListener('resize', adjustCanvasSize);  // Limpiar al desmontar
    };
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>Cargando...</div>}>
        <div className="App">
          {/* Fondo Galáctico */}
          <div id="canvas-container" className="canvas-container">
            <canvas ref={canvasRef} id="galactic-canvas"></canvas>
          </div>

          {/* Barra de Navegación Vertical */}
          <div className="vertical-nav">
            <ul>
              <Link className="nav-item" to="/">Home</Link>
              <Link className="nav-item" to="/projects">Projects</Link>
              <Link className="nav-item" to="/skills">Skills</Link>
              <Link className="nav-item" to="/contact">Contact</Link>
            </ul>
          </div>

          {/* Rutas de la aplicación */}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Habilidades />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          {/* Pie de página */}
          <ProjectFooter />
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
