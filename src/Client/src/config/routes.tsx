import { NewestVideosPage } from "../pages/NewestVideosPage";
import { Route, Routes as RouteList } from "react-router-dom";
import { LoginPage } from "../pages/auth/LoginPage/LoginPage";
import { useAuthenticatedUser } from "../api/auth/api";
import { UploadVideoPage } from "../pages/UploadVideo/UploadVideoPage";
import { SingleVideoPage } from "../pages/ViewVideo/SingleVideoPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export function Routes() {
  const isAuthenticated = useAuthenticatedUser().data != null;

  return (
    <RouteList>
      <Route index path="/" element={<NewestVideosPage />} />

      {isAuthenticated ? (
        <>
          <Route path="/upload" element={<UploadVideoPage />} />
          <Route path="/video/:id" element={<SingleVideoPage />} />
        </>
      ) : (
        <Route path="/login" element={<LoginPage />} />
      )}

      <Route path="*" element={<NotFoundPage />} />
    </RouteList>
  );
}
