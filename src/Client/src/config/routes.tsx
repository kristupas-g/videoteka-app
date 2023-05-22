import { NewestVideosPage } from "../pages/NewestVideosPage";
import { Route, Routes as RouteList } from "react-router-dom";
import { TestPage } from "../pages/TestPage";

export function Routes() {
  return (
    <RouteList>
      <Route path="/" element={<NewestVideosPage />} />
      <Route path="/about" element={<TestPage />} />
    </RouteList>
  );
}
