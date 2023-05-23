import { NewestVideosPage } from "../pages/NewestVideosPage";
import { Route, Routes as RouteList } from "react-router-dom";
import { TestPage } from "../pages/TestPage";
import { LoginPage } from "../pages/auth/LoginPage/LoginPage";

export function Routes() {
  return (
    <RouteList>
      <Route path="/" element={<NewestVideosPage />} />
      <Route path="/about" element={<TestPage />} />
      <Route path="/login" element={<LoginPage />} />
    </RouteList>
  );
}
