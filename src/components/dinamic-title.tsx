import { useLocation } from "react-router";

/**
 * Componente que genera un título dinámico basado en la ruta actual.
 * @returns {string} El título formateado.
 */
const DynamicTitle = (): string => {
  // 1. Obtener la ubicación actual (pathname)
  const location = useLocation();
  const pathname = location.pathname; // Ejemplo: "/home/usuario"

  // 2. Función para formatear el título
  const formatTitle = (path: string) => {
    // a. Eliminar el prefijo "/home" y dividir la ruta por "/"
    const pathSegments = path
      .replace("/dashboard", "")
      .split("/")
      .filter((segment) => segment.length > 0);

    // b. Tomar el último segmento (ej. "usuario")
    const lastSegment = pathSegments[pathSegments.length - 1];

    if (!lastSegment) {
      // Si la ruta es solo "/home", mostrar "Inicio"
      return "Inicio";
    }

    // c. Reemplazar guiones por espacios y capitalizar la primera letra
    const formattedTitle = lastSegment
      .replace(/-/g, " ") // Reemplazar guiones por espacios (si los usas)
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalizar cada palabra

    // Manejar casos especiales si es necesario (ej. "usuarios" -> "Usuarios")
    // Si tu ruta es 'usuario' y quieres que se muestre 'Usuario' (ya cubierto por la capitalización)

    return formattedTitle;
  };

  return formatTitle(pathname);
};

export default DynamicTitle;
