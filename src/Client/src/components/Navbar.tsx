import Container from "react-bootstrap/Container";
import { Nav, Navbar as BootstrapNavbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuthenticatedUser } from "../api/auth/api";

export function Navbar() {
  const user = useAuthenticatedUser();

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <BootstrapNavbar.Brand as={NavLink} to="/">
          VUTube
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
          </Nav>
          <Nav>
            {user.data ? (
              <NavDropdown
                title={`Signed in as ${user.data?.username}`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>Upload</NavDropdown.Item>
                <NavDropdown.Item>Signout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
