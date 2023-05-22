import { Main } from "../pages/Main";
import { TestPage } from "../pages/TestPage";

export const routes = [
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "about",
    element: <TestPage />,
  },
];
