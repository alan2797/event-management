# Event Management Dashboard

Una aplicación de gestión de eventos construida con **React** y **TypeScript**, que permite crear, listar, editar y eliminar eventos utilizando una API REST pública de [MockAPI](https://mockapi.io). La aplicación está diseñada para ser moderna, responsiva y fácil de usar.

---

## Tecnologías y librerías utilizadas

- **React 18 + TypeScript**: Base de la aplicación.
- **Ant Design (v5)**: Componentes UI modernos, responsive y estilizados.
- **Axios**: Consumo de API REST para operaciones CRUD.
- **React Router v6**: Navegación entre páginas (Dashboard, Crear/Editar evento, Detalle).
- **Moment.js**: Formateo de fechas y horas.
- **Notificaciones de Ant Design**: Alertas al crear, actualizar o eliminar eventos.
- **Skeleton de Ant Design**: Indicador visual mientras se cargan los datos.
- **Modal y Confirm Dialog de Ant Design**: Confirmación de eliminación y detalle de eventos.
- **Validaciones de formularios**: Todos los campos obligatorios con mensajes de error.
- **Filtros y búsqueda**: Filtrado de eventos por título y tipo (chips o selectores).
- **Responsive**: Compatible con dispositivos móviles y escritorio.
- **Gráficos**: Estadísticas de eventos completados vs pendientes usando chart (opcional).

---

## Modelo de datos de un evento

Cada evento contiene los siguientes campos:

- `id: number`
- `title: string`
- `description: string`
- `type: string` (ej: Proyecto, Informe, Laboratorio, Práctico)
- `direction: string`
- `startDate: Date`
- `endDate: Date`
- `completed: boolean`

---

## Funcionalidades

1. **Listado de eventos**

   - Tab "Pendientes" y Tab "Completadas" con conteo.
   - Filtrado por título y tipo.
   - Skeleton mientras se cargan los eventos.
   - Botones de editar y eliminar con confirmación.
   - Checkbox o toggle para marcar completado.
   - Gráfico mostrando porcentaje de eventos completados y pendientes.

2. **Agregar y Editar evento**

   - Formulario con campos: título, descripción, tipo, dirección, fecha y hora de inicio/fin.
   - Validaciones en todos los campos.
   - Botón de guardar con spinner de carga.
   - Modal de detalle al hacer clic en un evento.

3. **Notificaciones**

   - Éxito al crear, actualizar o eliminar evento.
   - Información al cambiar estado de completado.

4. **Consumo de API REST**
   - Todos los datos se almacenan en [MockAPI](https://mockapi.io).
   - Operaciones CRUD mediante Axios.
5. **Responsive**
   - Adaptado a móviles y escritorio.
   - Inputs de fecha y hora separados para evitar desbordes en pantallas pequeñas.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
