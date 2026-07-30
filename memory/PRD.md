# Espiritudos - Fortnite Spirits Marketplace

## Problema Original
Aplicación de marketplace de Spirits de Fortnite llamada "Espiritudos" con:
- Soporte multi-país (PE, US, AR, MX, ES, CL) con detección automática
- Sistema de compra en pasos: catálogo → selección → resumen → datos → confirmación → generación de imagen
- Generación de imagen del pedido con html2canvas
- Todo configurable desde archivos JS separados
- Solo frontend (HTML/CSS/JS/React), sin backend
- Estilo gaming/Fortnite con efectos neón
- Idioma: solo español

## Arquitectura
- **Frontend**: React + Tailwind CSS + Lucide Icons + html2canvas
- **Sin Backend**: Aplicación 100% estática, config en archivos JS
- **Deployable a**: GitHub + Render sin modificaciones

## Estructura de Archivos
### Configuración (public/js/)
- `config.js` - Configuración general (logo, nombre, redes sociales, descuentos)
- `prices.js` - Países, monedas, precios por spirit
- `payments.js` - Métodos de pago por país
- `spirits.js` - Catálogo de spirits con rareza
- `reviews.js` - URLs de imágenes de reseñas

### Componentes (src/components/)
- `Header.jsx` - Header con logo y stepper (1..5)
- `CountrySelector.jsx` - Grid de países
- `SpiritsCatalog.jsx` - Grid de spirits con filtros por rareza
- `CartSummary.jsx` - Resumen con descuentos por cantidad
- `UserForm.jsx` - Formulario de datos del cliente
- `OrderConfirmation.jsx` - Confirmación final del pedido
- `ImageGenerator.jsx` - Genera imagen con html2canvas
- `NextSteps.jsx` - 9 pasos post-compra
- `ThankYou.jsx` - Pantalla final con redes sociales
- `ReviewsSection.jsx` - Carrusel de reseñas

## Funcionalidades Implementadas (Fecha: 2026-01-30)
- [x] Detección automática de país por zona horaria e idioma
- [x] Selector manual de país (6 países)
- [x] Catálogo con 10 spirits y 5 niveles de rareza
- [x] Filtros por rareza (Legendario, Épico, Raro, Poco Común, Común)
- [x] Sistema de carrito con contador +/-
- [x] Estado del carrito persistente entre navegaciones
- [x] Descuentos por cantidad (5%, 10%, 15%)
- [x] Formulario completo con validación
- [x] Métodos de pago dinámicos por país
- [x] Confirmación de pedido con resumen completo
- [x] Generación automática de imagen del pedido (html2canvas)
- [x] Descarga de imagen PNG
- [x] Pantalla de 9 pasos post-compra
- [x] Botones de redes sociales (Discord, WhatsApp, Facebook)
- [x] Carrusel de reseñas con imágenes
- [x] Diseño gaming/neón responsive
- [x] Todo configurable desde archivos JS

## Backlog / Enhancement Ideas
- P2: Reemplazar imágenes de Unsplash por imágenes reales de Spirits de Fortnite
- P2: Actualizar URLs reales de redes sociales (actualmente placeholders)
- P2: Agregar más spirits al catálogo
- P2: Sistema de compartir en redes sociales
- P2: Multi-idioma (ES/EN)
- P2: Modo temporadas (nuevas colecciones)
- P2: Cupones de descuento configurables

## Detalles Técnicos
- Datos expuestos como `window.APP_CONFIG`, `window.COUNTRIES`, `window.PAYMENT_METHODS`, `window.SPIRITS`, `window.REVIEWS`
- Diseño mobile-first responsive
- Fuentes: Unbounded (headers), Inter (body)
- Colores: Dark theme con acentos púrpura (#8b5cf6), rosa (#ec4899), cyan (#00f6ff)
- Rarezas con bordes de color:
  - Legendario: dorado (#f59e0b)
  - Épico: púrpura (#a855f7)
  - Raro: azul (#3b82f6)
  - Poco Común: verde (#22c55e)
  - Común: gris (#94a3b8)
