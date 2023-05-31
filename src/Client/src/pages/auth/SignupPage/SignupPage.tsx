import Image from "react-bootstrap/esm/Image";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { SignupPageForm } from "./SignupPageForm";
import { NavLink } from "react-router-dom";

export function SignupPage() {
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
          <h2 className="mb-4">Join a world of videos!</h2>

          <SignupPageForm />

          <p className="mt-3">
            Already have an account? <NavLink to="/login">Login</NavLink>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
