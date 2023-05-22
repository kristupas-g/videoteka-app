import { Main } from "../pages/Main";
import { Route, Routes as RouteList } from "react-router-dom";
import { TestPage } from "../pages/TestPage";

export function Routes() {
  return (
    <RouteList>
      <Route path="/" element={<Main />} />
      <Route path="/about" element={<TestPage />} />
    </RouteList>
  );
}
