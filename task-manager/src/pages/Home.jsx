import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Container>
      <Row className="justify-content-center text-center">
        <Col md={8}>
          <h1 className="display-4 mb-4">Welcome to Task Manager</h1>
          
          <Card className="shadow mb-4">
            <Card.Body>
              <Card.Title>Organize your tasks efficiently</Card.Title>
              <Card.Text>
                Task Manager helps you organize your work, track progress, and boost productivity.
                Create tasks, set priorities, add due dates, and never miss a deadline again.
              </Card.Text>
              
              {isAuthenticated ? (
                <Button as={Link} to="/tasks" variant="primary" size="lg" className="mt-3">
                  Go to My Tasks
                </Button>
              ) : (
              <div className="d-flex justify-content-center gap-3 mt-3">
  <Button 
    as={Link} 
    to="/login" 
    size="lg" 
    style={{ backgroundColor: "rgb(114, 8, 183)", borderColor: "rgb(114, 8, 183)", color: "#fff" }}
  >
    Login
  </Button>
  <Button 
    as={Link} 
    to="/signup" 
    size="lg" 
    style={{ backgroundColor: "white", borderColor: "rgb(114, 8, 183)", color: "rgb(114, 8, 183)" }}
  >
    Sign Up
  </Button>
</div>

              )}
            </Card.Body>
          </Card>
          
          <Row className="mt-5">
            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Organize</Card.Title>
                  <Card.Text>
                    Create categories, set priorities, and organize tasks your way.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Track</Card.Title>
                  <Card.Text>
                    Monitor progress with status updates and completion tracking.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Complete</Card.Title>
                  <Card.Text>
                    Get things done on time with reminders and due dates.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;