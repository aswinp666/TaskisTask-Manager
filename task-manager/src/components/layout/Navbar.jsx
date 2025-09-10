import { Link, useNavigate } from 'react-router-dom';
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Button,
  Dropdown,
} from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BootstrapNavbar
      expand="lg"
      className={`app-navbar py-2 border-0 ${theme === 'light' ? 'navbar-light' : ''}`}
      style={{
        background: `linear-gradient(to right, #7209b7, #a481d1)`,
        backgroundColor: theme === 'dark' ? '#212529' : '#f8f9fa',
        backgroundSize: '100% 2px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
      }}
      data-bs-theme={theme}
    >
      <Container fluid>
        {/* Brand */}
        <BootstrapNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <i className="bi bi-kanban me-2 fs-4"></i>
          <span className="fw-bold">Taskis</span>
        </BootstrapNavbar.Brand>

        {/* Mobile toggle button */}
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {/* Left side links (Home + Tasks + Login/Signup if guest) */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="me-3">
              Home
            </Nav.Link>
            {isAuthenticated && (
              <Nav.Link as={Link} to="/tasks" className="me-3">
                Tasks
              </Nav.Link>
            )}
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/login" className="me-3">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="me-3">
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>

          {/* Right side icons + user menu */}
          <div className="d-flex align-items-center mt-2 mt-lg-0">
            {/* Theme Toggle */}
            <Button
              variant="link"
              className="nav-icon-btn me-2"
              onClick={toggleTheme}
            >
              <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon'}`}></i>
            </Button>

            {/* Authenticated user menu */}
            {isAuthenticated && (
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" className="nav-user-dropdown p-0">
                  <div className="avatar">
                    <span>AK</span>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/settings">
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
