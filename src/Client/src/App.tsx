import Container from "react-bootstrap/Container";
import { QueryClient, QueryClientProvider } from "react-query";
import { Main } from "./pages/Main";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Main />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
