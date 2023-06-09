import Image from "react-bootstrap/esm/Image";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { LoginPageForm } from "./LoginPageForm";
import { NavLink } from "react-router-dom";

export function LoginPage() {
  return (
    <Container className="my-5">
      <Row style={{ minHeight: "600px" }}>
        <Col md={6}>
          <Image
            src="./assets/login-page.jpg"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "fill",
              borderRadius: "36px",
            }}
          />
        </Col>
        <Col md={6}>
          <h2 className="mb-4">Welcome back!</h2>

          <LoginPageForm />

          <p className="mt-3">
            Want to create an account? <NavLink to="/signup">Signup</NavLink>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
