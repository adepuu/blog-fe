import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../feature/auth/hooks/useAuth";

const ProtectedRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth()
  console.log(isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}

export default ProtectedRoutes;