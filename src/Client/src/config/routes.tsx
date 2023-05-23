import { NewestVideosPage } from "../pages/NewestVideosPage";
import { Navigate, Route, Routes as RouteList } from "react-router-dom";
import { TestPage } from "../pages/TestPage";
import { LoginPage } from "../pages/auth/LoginPage/LoginPage";
import { useAuthenticatedUser } from "../api/auth/api";

export function Routes() {
  const isAuthenticated = useAuthenticatedUser().data != null;

  return (
    <RouteList>
      <Route index path="/" element={<NewestVideosPage />} />
      <Route path="/about" element={<TestPage />} />

      {!isAuthenticated && <Route path="/login" element={<LoginPage />} />}

      <Route path="*" element={<NewestVideosPage />} />
    </RouteList>
  );
}
