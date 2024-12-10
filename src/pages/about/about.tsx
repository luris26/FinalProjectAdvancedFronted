import React from 'react';

const App: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
                Acerca de Nuestro Sistema de Gestión de Inventario
            </h1>
            <p className="text-lg text-gray-600 text-center mb-8">
                Bienvenido a nuestro <span className="font-semibold text-gray-800">Sistema de Gestión de Inventario</span>, una herramienta diseñada para optimizar las operaciones de tu restaurante. Desde la gestión de inventarios y el seguimiento de ventas hasta el manejo de menús y promociones, este sistema simplifica las tareas diarias, haciendo que tu restaurante sea más eficiente y organizado.
            </p>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Objetivos</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Automatizar y centralizar los procesos clave del negocio.</li>
                    <li>Proporcionar acceso seguro basado en roles para los empleados del restaurante.</li>
                    <li>Adaptarse rápidamente a cambios en menús y promociones.</li>
                    <li>Habilitar un seguimiento completo de ventas, inventarios y promociones.</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Futuras Mejoras</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Integración de gráficas para análisis visual de ventas y promociones.</li>
                    <li>Notificaciones automáticas para productos bajos en inventario y órdenes pendientes.</li>
                    <li>Soporte para múltiples sucursales en una sola aplicación.</li>
                    <li>Integración de pagos digitales directamente en el sistema.</li>
                </ul>
            </section>
        </div>
    );
};

export default App;
