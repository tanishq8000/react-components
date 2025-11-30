import { Suspense } from "react";
import { projects } from "./constants/data";
import LoadingFallback from "./Components/LoadingFallback";
import { createBrowserRouter } from "react-router";
import Home from "./Components/Home";

// Component to display while the dynamic import is loading

const router = createBrowserRouter([
  {
    path: "/",
    // For static components, use 'element'
    element: <Home />,
  },
  // Dynamically map lazy-loaded components
  ...projects.map((project) => ({
    path: project.path,
    // Use 'element' property and wrap the lazy component in Suspense
    element: (
      <Suspense fallback={<LoadingFallback />}>
        {/* project.Component is the lazy-loaded component from data.tsx */}
        <project.Component />
      </Suspense>
    ),
  })),
]);

export default router;
