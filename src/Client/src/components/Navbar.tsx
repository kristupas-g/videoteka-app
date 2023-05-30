import Container from "react-bootstrap/Container";
import { Nav, Navbar as BootstrapNavbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuthenticatedUser } from "../api/auth/api";
import { User } from "../api/auth/types";

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
            <LeftSideNavbar user={user.data} />
          </Nav>

          <Nav>
            <RightSideNavbar user={user.data} />
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

function LeftSideNavbar({ user }: { user?: User }) {
  return (
    <>
      <Nav.Link as={NavLink} to="/">
        Home
      </Nav.Link>
      {user && (
        <Nav.Link as={NavLink} to="/upload">
          Upload
        </Nav.Link>
      )}
    </>
  );
}

function RightSideNavbar({ user }: { user?: User }) {
  if (!!user) {
    return (
      <NavDropdown
        title={`Signed in as ${user.username}`}
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item>Signout</NavDropdown.Item>
      </NavDropdown>
    );
  }

  return (
    <>
      <Nav.Link as={NavLink} to="/login">
        Login
      </Nav.Link>
    </>
  );
}
