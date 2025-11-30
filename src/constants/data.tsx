import { lazy, type ComponentType, type JSX } from "react";

// Define the structure of a Project item
interface Project {
  name: string;
  path: string;
  // Component uses the strict type for no props
  Component: ComponentType<Record<string, never>>;
}

// Define a strict type for a React component that takes no props.
type NoPropsStrictComponent =
  | ComponentType<Record<string, never>>
  | (() => JSX.Element);

// Vite API: Automatically finds all .tsx and .jsx files in the specified directory.
const componentModules = import.meta.glob("../Projects/*.{tsx,jsx}");

export const projects: Project[] = Object.entries(componentModules).map(
  ([path, moduleLoader]) => {
    // 1. Extract the base filename (e.g., "Counter.tsx")
    const fileName = path.split("/").pop()!;

    // 2. Get the name without the extension (e.g., "Counter")
    const nameWithoutExtension = fileName.replace(/\.(tsx|jsx)$/, "");

    // 3. Convert CamelCase/PascalCase to kebab-case for the URL path
    const routeName = nameWithoutExtension
      .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1$2")
      .toLowerCase(); // 4. Create the component loader using React.lazy

    const LazyComponent = lazy(async () => {
      // Use the strict type assertion here
      const module = await (
        moduleLoader as () => Promise<{
          default: NoPropsStrictComponent;
        }>
      )(); // Assume the component is the default export

      return { default: module.default };
    });

    return {
      name: nameWithoutExtension,
      path: `/${routeName}`, // The route, e.g., "/counter"
      Component: LazyComponent,
    } as Project;
  }
);
