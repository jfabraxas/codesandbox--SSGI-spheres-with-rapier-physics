# Next.js 15+ (App Router) & React 19 Migration Plan

This document outlines the steps to migrate the current React application to a Next.js 15+ application using the App Router, TypeScript, React 19, and CSS Modules. The core Three.js/Rapier components will be moved to a `components/canvas` directory.

## The Plan

### 1. Update Dependencies in `package.json`

*   **File**: `package.json`
*   **Changes**:
    *   Remove `react-scripts` from `dependencies` and `devDependencies`.
    *   Update `react` and `react-dom` to version `19.0.0` (e.g., `"react": "19.0.0"`, `"react-dom": "19.0.0"`).
    *   Add `next` to `dependencies` with version `15.0.0` or later (e.g., `"next": "^15.0.0"`).
    *   Add `typescript`, `@types/react`, `@types/node`, and `@types/react-dom` to `devDependencies`.
    *   Update the `scripts` section:
        *   Change `"start": "react-scripts start"` to `"dev": "next dev"`.
        *   Change `"build": "react-scripts build"` to `"build": "next build"`.
        *   Change `"test": "react-scripts test --env=jsdom"` to `"start": "next start"` (or remove if not needed).
        *   Remove `"eject": "react-scripts eject"`.

### 2. Initialize Next.js and TypeScript Configuration

*   **Action**: After updating `package.json`, run `npm install` (or `yarn install`) in your terminal to install the new dependencies.
*   **Action**: Then, run `npm run dev` (or `yarn dev`). Next.js will automatically create `tsconfig.json` and `next-env.d.ts` files in your project root, configuring TypeScript for your Next.js project.

### 3. Restructure Project Files

*   **Action**: Create a new directory named `app/` in your project root.
*   **Action**: Create a new file named `app/layout.tsx`. This will be your root layout for the Next.js application.
*   **Action**: Create a new file named `app/page.tsx`. This will serve as the main entry page for your application.
*   **Action**: Create a new directory named `components/canvas/` in your project root.
*   **Action**: Create a new directory named `components/canvas/realism-effects/`.
*   **Action**: Move `src/App.js` to `components/canvas/App.tsx`.
*   **Action**: Move `src/Effects.js` to `components/canvas/Effects.tsx`.
*   **Action**: Move `src/realism-effects/v2.js` to `components/canvas/realism-effects/v2.ts`.
*   **Action**: Move `src/realism-effects/index.js` to `components/canvas/realism-effects/index.ts`.
*   **Action**: Delete the `src/index.js` file as Next.js handles the entry point.
*   **Action**: Delete the `public/index.html` file as Next.js generates its own HTML structure.

### 4. Migrate Global Styles to `app/layout.tsx`

*   **File**: `app/layout.tsx`
*   **Changes**:
    *   Add the `'use client'` directive at the top if any client-side hooks or browser APIs are used within the layout or its children that are not wrapped in a client component. (For global styles, it's usually not needed here unless you add client-side logic directly).
    *   Import `src/styles.css` directly into this file.
    *   Define the `RootLayout` component to wrap your application's content.

    ```typescript
    // app/layout.tsx
    import '../src/styles.css'; // Your global styles

    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <html lang="en">
          <body>{children}</body>
        </html>
      );
    }
    ```

### 5. Convert `App.js` to `App.tsx` and Integrate into `app/page.tsx`

*   **File**: `components/canvas/App.tsx`
*   **Changes**:
    *   Rename the file to `App.tsx`.
    *   Add the `'use client'` directive at the very top of the file, as this component uses client-side React hooks (`useRef`, `useReducer`, `useMemo`, `useFrame`).
    *   Change `export default function App(props)` to `export function App(props: any)`. (You will need to define proper TypeScript types for `props` later for better type safety).
    *   Add TypeScript types for any variables, function arguments, and return values within the component.

*   **File**: `app/page.tsx`
*   **Changes**:
    *   Add the `'use client'` directive at the very top of the file, as it will render a client component (`App`).
    *   Import the `App` component from `components/canvas/App`.
    *   Define the default export for the page component, rendering your `App`.

    ```typescript
    // app/page.tsx
    'use client'; // This component renders client-side content

    import { App } from '../components/canvas/App'; // Adjust path as needed

    export default function HomePage() {
      return <App />;
    }
    ```

### 6. Convert `Effects.js` to `Effects.tsx`

*   **File**: `components/canvas/Effects.tsx`
*   **Changes**:
    *   Rename the file to `Effects.tsx`.
    *   Add the `'use client'` directive at the very top of the file, as this component uses client-side React hooks (`useThree`, `useFrame`, `useState`, `useEffect`).
    *   Add TypeScript types for `gl`, `scene`, `camera`, `size` (obtained from `useThree`), the `composer` state, and the `config` object.

### 7. Convert `realism-effects` files

*   **Files**: `components/canvas/realism-effects/v2.js` and `components/canvas/realism-effects/index.js`
*   **Changes**:
    *   Rename these files to `.ts` (or `.tsx` if they contain JSX).
    *   Add the `'use client'` directive at the very top of each file if they contain client-side logic or are imported by client components.
    *   Add TypeScript types for any variables, function arguments, and return values within these files.

### 8. CSS Modules (Optional, for new component-specific styles)

*   **Note**: While `src/styles.css` will remain a global stylesheet, for any new component-specific styling, you should create CSS Module files (e.g., `MyComponent.module.css`).
*   **Usage**: Import them into your components like `import styles from './MyComponent.module.css';` and use them as `className={styles.myClass}`.

