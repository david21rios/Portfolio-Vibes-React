// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './assets/styles/App.css'; // Estilos de la aplicación
import Header from './components/Header';
import ProjectFooter from './components/Footer';

// Uso de React.lazy para carga dinámica de componentes
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./components/Contact')); // Si tienes este componente

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Cargando...</div>}>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <ProjectFooter />
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
