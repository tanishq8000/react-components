import { lazy, type ComponentType, type JSX } from "react";

// Define the structure of a Project item
interface Project {
  name: string;
  path: string;
  // Component is a dynamically loading React component
  Component: ComponentType<any>;
}

// Vite API: Automatically finds all .tsx and .jsx files in the specified directory.
// It maps the file path to an asynchronous function (the module loader) that performs the dynamic import.
const componentModules = import.meta.glob("../Projects/*.{tsx,jsx}");

export const projects: Project[] = Object.entries(componentModules).map(
  ([path, moduleLoader]) => {
    // 1. Extract the base filename (e.g., "Counter.tsx")
    const fileName = path.split("/").pop()!;

    // 2. Get the name without the extension (e.g., "Counter")
    const nameWithoutExtension = fileName.replace(/\.(tsx|jsx)$/, "");

    // 3. Convert CamelCase/PascalCase to kebab-case for the URL path (e.g., "Counter" -> "counter")
    const routeName = nameWithoutExtension
      .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1$2")
      .toLowerCase();

    // 4. Create the component loader using React.lazy
    const LazyComponent = lazy(async () => {
      // Call the dynamic import function provided by Vite.
      // We use a type assertion to correctly inform TypeScript about the module structure:
      // an object with a 'default' property containing the component.
      const module = await (
        moduleLoader as () => Promise<{
          default: ComponentType<any> | (() => JSX.Element);
        }>
      )();

      // Assume the component is the default export
      return { default: module.default };
    });

    return {
      name: nameWithoutExtension,
      path: `/${routeName}`, // The route, e.g., "/counter"
      Component: LazyComponent,
    } as Project;
  }
);

// Optional logging to verify the structure
// console.log("Dynamically discovered routes:", projects.map(p => ({ name: p.name, path: p.path })));
