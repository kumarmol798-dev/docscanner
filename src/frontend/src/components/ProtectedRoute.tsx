import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "@tanstack/react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div
        className="flex-1 flex items-center justify-center"
        data-ocid="auth.loading_state"
      >
        <div className="flex flex-col items-center gap-4 p-8">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-scan">
            <div className="w-5 h-5 rounded-full bg-primary/60" />
          </div>
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
