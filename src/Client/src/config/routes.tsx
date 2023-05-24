import { NewestVideosPage } from "../pages/NewestVideosPage";
import { Route, Routes as RouteList } from "react-router-dom";
import { TestPage } from "../pages/TestPage";
import { LoginPage } from "../pages/auth/LoginPage/LoginPage";
import { useAuthenticatedUser } from "../api/auth/api";
import React from "react";
import { UploadVideoPage } from "../pages/UploadVideo/UploadVideoPage";

export function Routes() {
  const isAuthenticated = useAuthenticatedUser().data != null;

  return (
    <RouteList>
      <Route index path="/" element={<NewestVideosPage />} />

      {isAuthenticated ? (
        <>
          <Route path="/about" element={<TestPage />} />
          <Route path="/upload" element={<UploadVideoPage />} />
        </>
      ) : (
        <Route path="/login" element={<LoginPage />} />
      )}

      <Route path="*" element={<NewestVideosPage />} />
    </RouteList>
  );
}
