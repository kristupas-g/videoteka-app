import Container from "react-bootstrap/Container";
import { QueryClient, QueryClientProvider } from "react-query";
import { Main } from "./pages/Main";
import { Navbar } from "./components/Navbar";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Container>
        <Main />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
