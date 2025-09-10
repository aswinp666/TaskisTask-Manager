import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Home = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // ✅ Use localStorage for auth check
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // Colors depending on theme
  const bgColor = isDark ? '#1c1c1e' : '#f8f9fa';
  const cardBg = isDark ? '#2c2c2e' : '#fff';
  const textColor = isDark ? '#f5f5f5' : '#333';
  const secondaryTextColor = isDark ? '#ccc' : '#555';
  const buttonGradient = 'linear-gradient(90deg, #7209B7, #B5179E)';

  return (
    <Container fluid className="py-5" style={{ backgroundColor: bgColor, minHeight: '100vh' }}>
      <Row className="justify-content-center text-center">
        <Col xs={12} md={8} lg={6}>
          <h1
            className="display-4 fw-bold mb-4"
            style={{ color: 'rgb(114, 9, 183)', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}
          >
            Taskis Manager
          </h1>

          <Card
            className="shadow-lg mb-4"
            style={{ borderRadius: '1rem', overflow: 'hidden', backgroundColor: cardBg }}
          >
            <Card.Body>
              <Card.Title className="fw-bold mb-3" style={{ fontSize: '1.5rem', color: textColor }}>
                Organize your tasks efficiently
              </Card.Title>
              <Card.Text style={{ fontSize: '1rem', color: secondaryTextColor }}>
                Taskis Manager helps you organize your work, track progress, and boost productivity.
                Create tasks, set priorities, add due dates, and never miss a deadline again.
              </Card.Text>

              {isAuthenticated ? (
                <Button
                  as={Link}
                  to="/tasks"
                  size="lg"
                  className="mt-3"
                  style={{
                    background: buttonGradient,
                    border: 'none',
                    color: '#fff',
                    padding: '0.75rem 2rem',
                    fontWeight: '600',
                    borderRadius: '0.75rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Go to My Tasks
                </Button>
              ) : (
                <div className="d-flex justify-content-center flex-wrap gap-3 mt-3">
                  <Button
                    as={Link}
                    to="/login"
                    size="lg"
                    style={{
                      background: buttonGradient,
                      border: 'none',
                      color: '#fff',
                      padding: '0.75rem 2rem',
                      fontWeight: '600',
                      borderRadius: '0.75rem',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    as={Link}
                    to="/signup"
                    size="lg"
                    style={{
                      background: isDark ? '#3a3a3c' : '#fff',
                      border: `2px solid #7209B7`,
                      color: isDark ? '#f5f5f5' : '#7209B7',
                      padding: '0.75rem 2rem',
                      fontWeight: '600',
                      borderRadius: '0.75rem',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Features Section */}
          <Row className="mt-5 g-4">
            {[
              { title: 'Organize', text: 'Create categories, set priorities, and organize tasks your way.', icon: 'bi-layout-text-window-reverse' },
              { title: 'Track', text: 'Monitor progress with status updates and completion tracking.', icon: 'bi-graph-up' },
              { title: 'Complete', text: 'Get things done on time with reminders and due dates.', icon: 'bi-check2-square' },
            ].map((feature, idx) => (
              <Col key={idx} xs={12} md={6} lg={4}>
                <Card
                  className="h-100 shadow-sm text-center"
                  style={{
                    borderRadius: '1rem',
                    padding: '1.5rem',
                    transition: 'all 0.3s ease',
                    backgroundColor: cardBg,
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <i className={`bi ${feature.icon} mb-3`} style={{ fontSize: '2rem', color: 'rgb(114, 9, 183)' }}></i>
                  <Card.Title className="fw-bold mb-2" style={{ color: textColor }}>{feature.title}</Card.Title>
                  <Card.Text style={{ color: secondaryTextColor }}>{feature.text}</Card.Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
