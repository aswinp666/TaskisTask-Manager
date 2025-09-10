import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, Outlet } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Badge, Spinner } from 'react-bootstrap';
import { useTask } from '../contexts/TaskContext';
import EditTaskForm from '../components/tasks/EditTaskForm';

const TaskDetails = () => {
  const { id } = useParams();
  const { tasks, loading, deleteTask } = useTask();
  const [task, setTask] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`TaskDetails mounted for task ${id}`);
    
    return () => {
      console.log(`TaskDetails unmounted for task ${id}`);
    };
  }, [id]);

  useEffect(() => {
    if (!loading && tasks.length > 0) {
      const foundTask = tasks.find(t => t.id === id);
      if (foundTask) {
        setTask(foundTask);
      } else {
        // Task not found
        navigate('/tasks');
      }
    }
  }, [id, tasks, loading, navigate]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
      navigate('/tasks');
    }
  };

  if (loading || !task) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'todo': return 'secondary';
      default: return 'primary';
    }
  };

  const getPriorityBadgeVariant = (priority) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'secondary';
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Task Details</h1>
        <div>
          <Button 
            variant="primary" 
            className="me-2" 
            onClick={() => setShowEditForm(!showEditForm)}
          >
            {showEditForm ? 'Cancel' : 'Edit'}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      {showEditForm ? (
        <EditTaskForm task={task} onCancel={() => setShowEditForm(false)} />
      ) : (
        <Card className="shadow">
          <Card.Body>
            <Card.Title className="mb-3">{task.title}</Card.Title>
            
            <Row className="mb-3">
              <Col md={6}>
                <div className="mb-2">
                  <strong>Status: </strong>
                  <Badge bg={getStatusBadgeVariant(task.status)}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="mb-2">
                  <strong>Priority: </strong>
                  <Badge bg={getPriorityBadgeVariant(task.priority)}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </Badge>
                </div>
                
                {task.category && (
                  <div className="mb-2">
                    <strong>Category: </strong>
                    <Badge bg="info">{task.category}</Badge>
                  </div>
                )}
              </Col>
              
              <Col md={6}>
                {task.dueDate && (
                  <div className="mb-2">
                    <strong>Due Date: </strong>
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                )}
                
                <div className="mb-2">
                  <strong>Created: </strong>
                  {new Date(task.createdAt).toLocaleDateString()}
                </div>
                
                <div className="mb-2">
                  <strong>Last Updated: </strong>
                  {new Date(task.updatedAt).toLocaleDateString()}
                </div>
              </Col>
            </Row>
            
            {task.description && (
              <div className="mb-3">
                <strong>Description:</strong>
                <p className="mt-2">{task.description}</p>
              </div>
            )}
            
            <div className="d-flex justify-content-between mt-4">
              <Button as={Link} to="/tasks" variant="outline-secondary">
                Back to Tasks
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}
      
      <Outlet />
    </Container>
  );
};

export default TaskDetails;