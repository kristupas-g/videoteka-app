import { NewestVideosPage } from "../pages/NewestVideosPage";
import { Route, Routes as RouteList } from "react-router-dom";
import { TestPage } from "../pages/TestPage";
import { LoginPage } from "../pages/auth/LoginPage/LoginPage";
import { useAuthenticatedUser } from "../api/auth/api";

export function Routes() {
  const isAuthenticated = useAuthenticatedUser().data != null;

  return (
    <RouteList>
      <Route index path="/" element={<NewestVideosPage />} />

      {isAuthenticated ? <RoutesWithAuth /> : <RoutesWithoutAuth />}

      <Route path="*" element={<NewestVideosPage />} />
    </RouteList>
  );
}

function RoutesWithAuth() {
  return (
    <>
      <Route path="/about" element={<TestPage />} />
    </>
  );
}

function RoutesWithoutAuth() {
  return (
    <>
      <Route path="/login" element={<LoginPage />} />
    </>
  );
}
