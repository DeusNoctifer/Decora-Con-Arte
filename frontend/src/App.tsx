import { lazy, Suspense, useEffect } from 'react';
import { checkBackendStatus } from './api/health';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Módulos de carga inmediata
import RegisterPage from './pages/RegisterPage';
// import Navbar from './components/Navbar'; 
// import Dashboard from './pages/Dashboard';

// Módulos pesados (Cargados bajo demanda - Comentados hasta que existan los archivos)
// const Personalizacion = lazy(() => import('./pages/Personalizacion'));
// const Estadisticas = lazy(() => import('./pages/Estadisticas'));
// const Pagos = lazy(() => import('./pages/Pagos'));

function App() {

    useEffect(() => {
        checkBackendStatus()
            .then((data) => {
                console.log("¡Conexión exitosa con el Backend!", data);
            })
            .catch((error) => {
                console.log("El backend se está despertando o hay un error:", error);
            });
    }, []);

    return (
        <Router>
            {/* <Navbar /> */}

            <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-gray-500 animate-pulse">Cargando módulo...</p>
                </div>
            }>
                <Routes>
                    {/* Ruta principal: Registro */}
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Redirección automática al registro por ahora */}
                    <Route path="/" element={<Navigate to="/register" />} />

                    {/* Rutas futuras (Comentadas para evitar errores de importación) */}
                    {/* 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/personalizar" element={<Personalizacion />} />
          <Route path="/pagos" element={<Pagos />} />
          <Route path="/stats" element={<Estadisticas />} /> 
          */}

                    {/* Fallback para rutas no encontradas */}
                    <Route path="*" element={<Navigate to="/register" />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;