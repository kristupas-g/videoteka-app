import { NewestVideosPage } from "../pages/NewestVideosPage";
import { Route, Routes as RouteList } from "react-router-dom";
import { LoginPage } from "../pages/auth/LoginPage/LoginPage";
import { useAuthenticatedUser } from "../api/auth/api";
import { UploadVideoPage } from "../pages/UploadVideo/UploadVideoPage";
import { SingleVideoPage } from "../pages/ViewVideo/SingleVideoPage";

import { NotFoundPage } from "../pages/NotFoundPage";

import { ProfilePage } from "../pages/Profile/ProfilePage";
import { UpdateVideoPage } from "../pages/UpdateVideo/UpdateVideoPage";
import { WelcomePage } from "../pages/WelcomePage";
import { SignupPage } from "../pages/auth/SignupPage/SignupPage";


export function Routes() {
  const isAuthenticated = useAuthenticatedUser().data != null;

  return (
    <RouteList>
      

      {isAuthenticated ? (
        <>
          <Route index path="/" element={<NewestVideosPage />} />
          <Route path="/upload" element={<UploadVideoPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/update/:id" element={<UpdateVideoPage />} />
          <Route path="/video/:id" element={<SingleVideoPage />} />
        </>
      ) : (
        <>
          <Route index path="/" element={<WelcomePage />} />
           <Route path="/login" element={<LoginPage />} />
           <Route path="/signup" element={<SignupPage />} />
         </>
      )}

      <Route path="*" element={<NotFoundPage />} />
    </RouteList>
  );
}
