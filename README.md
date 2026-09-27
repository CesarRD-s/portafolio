# Portafolio Personal — César Reyes

Este es el repositorio de mi portafolio personal: el sitio donde muestro quién soy, mis proyectos y cómo contactarme.

## ¿Qué encontrarás aquí?

Una página única con estas secciones:

- **Inicio** — una breve presentación con mi perfil y acceso directo a los proyectos.
- **Proyectos** — una selección de mis proyectos con enlace al repositorio y a una demo cuando está disponible.
- **Sobre mí** — mi experiencia, fortalezas y las tecnologías que utilizo.
- **Contacto** — un formulario para escribirme un mensaje.

El sitio es responsive, funciona en modo claro y oscuro, y el contenido no está "en piedra": se administra de forma dinámica desde un panel administrativo, para poder actualizar proyectos, habilidades e información de contacto sin tocar el código.

El panel está alojado en un repositorio aparte:

> 🔗 **[Panel Administrativo]** _(https://github.com/CesarRD-s/dashboard-portafolio)_

## Estructura

- `app/page.tsx` mantiene la entrada server-side y entrega directamente el contenido público.
- `app/lib/portfolio` concentra los tipos, consultas y transformación del contenido público.
- `app/lib/contact` contiene el contrato y la comunicación server-side con el backend de contacto.
- `app/components/sections` contiene las secciones visuales de la página.
- `app/components/ui` contiene piezas reutilizables de interfaz.

El contenido público se obtiene desde Supabase y se cachea durante cinco minutos. La caché está separada de la ruta para que pueda invalidarse desde el panel administrativo en el futuro mediante el tag `portfolio`. La página se renderiza en runtime, por lo que una falla de Supabase durante el build no congela el estado de error para los visitantes.

La respuesta inicial contiene la semántica real de la página, sin un skeleton intermedio. Si el backend no está disponible, se muestra un estado público y amigable. El contenido interactivo se limita a las islas cliente necesarias: navegación, formulario, filtros de tecnologías y expansión de proyectos.

## ¿Para quién?

Este portafolio es tanto una carta de presentación profesional como un proyecto personal en constante evolución para aplicar y mejorar buenas prácticas de desarrollo web. Puedes verlo en vivo en el enlace que se publique en el panel o en el perfil.

Si llegaste a este repositorio con curiosidad, ¡siéntete libre de explorar!
