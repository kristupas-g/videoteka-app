import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Page not found</h2>
      <p>Return to the homepage?</p>
      <Button onClick={() => navigate("/")}>Return</Button>
    </div>
  );
}
