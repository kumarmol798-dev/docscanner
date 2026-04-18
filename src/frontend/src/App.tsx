import { Skeleton } from "@/components/ui/skeleton";
import {
  Navigate,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";

const CapturePage = lazy(() => import("./pages/CapturePage"));
const ReviewPage = lazy(() => import("./pages/ReviewPage"));
const LibraryPage = lazy(() => import("./pages/LibraryPage"));
const ImageToPdfPage = lazy(() => import("./pages/ImageToPdfPage"));
const PdfCompressorPage = lazy(() => import("./pages/PdfCompressorPage"));

function PageLoader() {
  return (
    <div className="flex-1 p-6 space-y-4" data-ocid="page.loading_state">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}

const rootRoute = createRootRoute({ component: Layout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to="/library" />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const captureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/capture",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <CapturePage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const reviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/review",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <ReviewPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const libraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/library",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <LibraryPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const imageToPdfRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/image-to-pdf",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <ImageToPdfPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const pdfCompressorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pdf-compressor",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <PdfCompressorPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  captureRoute,
  reviewRoute,
  libraryRoute,
  imageToPdfRoute,
  pdfCompressorRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
