import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'flowbite';
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { CartProvider } from './context/cartContext.js'

// Renderiza el router que maneja las rutas de la aplicación
// Esto permite que el contenido cambie dinámicamente según la ruta actual



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router}/>
    </CartProvider>
  </StrictMode>,
)
