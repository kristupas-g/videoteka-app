import Container from "react-bootstrap/Container";
import { QueryClient, QueryClientProvider } from "react-query";
import { Navbar } from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./config/routes";

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Container>
          <Routes />
        </Container>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
