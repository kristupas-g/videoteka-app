import Container from "react-bootstrap/Container";
import { QueryClient, QueryClientProvider } from "react-query";
import { Navbar } from "./components/Navbar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./config/routes";

function App() {
  const queryClient = new QueryClient();
  const router = createBrowserRouter(routes);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Container>
          <RouterProvider router={router} />
        </Container>
      </QueryClientProvider>
    </>
  );
}

export default App;
