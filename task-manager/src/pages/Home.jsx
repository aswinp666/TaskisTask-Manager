import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Container fluid className="py-5" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
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
            style={{ borderRadius: '1rem', overflow: 'hidden' }}
          >
            <Card.Body>
              <Card.Title className="fw-bold mb-3" style={{ fontSize: '1.5rem', color: '#333' }}>
                Organize your tasks efficiently
              </Card.Title>
              <Card.Text style={{ fontSize: '1rem', color: '#555' }}>
                Taskis Manager helps you organize your work, track progress, and boost productivity.
                Create tasks, set priorities, add due dates, and never miss a deadline again.
              </Card.Text>
              
              {isAuthenticated ? (
                <Button
                  as={Link}
                  to="/tasks"
                  variant="primary"
                  size="lg"
                  className="mt-3"
                  style={{
                    background: 'linear-gradient(90deg, #7209B7, #B5179E)',
                    border: 'none',
                    color: '#fff',
                    padding: '0.75rem 2rem',
                    fontWeight: '600',
                    borderRadius: '0.75rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
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
                      background: 'linear-gradient(90deg, #7209B7, #B5179E)',
                      border: 'none',
                      color: '#fff',
                      padding: '0.75rem 2rem',
                      fontWeight: '600',
                      borderRadius: '0.75rem',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    Login
                  </Button>
                  <Button 
                    as={Link} 
                    to="/signup" 
                    size="lg" 
                    style={{
                      background: '#fff',
                      border: '2px solid #7209B7',
                      color: '#7209B7',
                      padding: '0.75rem 2rem',
                      fontWeight: '600',
                      borderRadius: '0.75rem',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.backgroundColor = 'rgb(114, 9, 183)';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.backgroundColor = '#fff';
                      e.currentTarget.style.color = 'rgb(114, 9, 183)';
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
          
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
                    backgroundColor: '#fff',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <i className={`bi ${feature.icon} mb-3`} style={{ fontSize: '2rem', color: 'rgb(114, 9, 183)' }}></i>
                  <Card.Title className="fw-bold mb-2">{feature.title}</Card.Title>
                  <Card.Text style={{ color: '#555' }}>{feature.text}</Card.Text>
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
