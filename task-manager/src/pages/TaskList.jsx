import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { useTask } from '../contexts/TaskContext';
import TaskFilter from '../components/tasks/TaskFilter';
import TaskBoard from '../components/tasks/TaskBoard';
import AddTaskModal from '../components/tasks/AddTaskModal';

const TaskList = () => {
  const { tasks, loading, error, filter, setFilter, getFilteredTasks } = useTask();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Log component lifecycle
  useEffect(() => {
    console.log('TaskList mounted');
    
    // Check for status filter in URL params
    const statusParam = searchParams.get('status');
    if (statusParam) {
      setFilter(statusParam);
    }
    
    return () => {
      console.log('TaskList unmounted');
    };
  }, []);
  
  // Update URL when filter changes
  useEffect(() => {
    if (filter !== 'all') {
      setSearchParams({ status: filter });
    } else {
      setSearchParams({});
    }
  }, [filter, setSearchParams]);
  
  const filteredTasks = getFilteredTasks();
  
  // Group tasks by status for board view
  const groupedTasks = {
    todo: filteredTasks.filter(task => task.status === 'todo'),
    'in-progress': filteredTasks.filter(task => task.status === 'in-progress'),
    completed: filteredTasks.filter(task => task.status === 'completed'),
  };
  
  // Board view is now the only view mode
  const viewMode = 'board';

  
  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container>
        <Card className="text-center p-4 mt-4">
          <Card.Body>
            <Card.Title className="text-danger">Error</Card.Title>
            <Card.Text>{error}</Card.Text>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }
  
  return (
    <Container>
      <Row className="mb-4 align-items-center py-3">
        <Col>
          <div className="d-flex align-items-center">
            <div className="task-icon-bg me-3 d-flex align-items-center justify-content-center">
              {/* <i className="bi bi-check2-square fs-3"></i> */}
            </div>
            <div>
              <h1 className="mb-0 fw-bold">My Tasks</h1>
              <p className="text-muted mb-0">{filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} {filter !== 'all' ? `(${filter})` : ''}</p>
            </div>
          </div>
        </Col>
        <Col xs="auto">
      <Button
  variant="primary"
  className="btn-add-task shadow-sm"
  onClick={() => setShowAddModal(true)}
  style={{
    backgroundColor: 'transparent',
    border: '2px solid #7209b7',
    color: '#7209b7',
    transition: 'all 0.3s ease',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = '#7209b7';
    e.currentTarget.style.color = 'white';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = 'transparent';
    e.currentTarget.style.color = '#7209b7';
  }}
>
  <i className="bi bi-plus-lg me-2"></i> Add Task
</Button>
        </Col>
      </Row>
      
      <Row className="mb-4 align-items-center">
        <Col>
          <TaskFilter />
        </Col>
      </Row>
      
      {loading ? (
        <div className="text-center py-5 my-4 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '300px' }}>
          <div className="spinner-grow text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading your tasks...</p>
        </div>
      ) : error ? (
        <Card className="text-center py-5 my-4 border-0 scale-in">
          <Card.Body className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '300px' }}>
            <div className="text-danger mb-3 fs-1">
              <i className="bi bi-exclamation-triangle-fill"></i>
            </div>
            <Card.Title className="text-danger mb-3">Error Loading Tasks</Card.Title>
            <Card.Text className="mb-4">{error}</Card.Text>
            <Button variant="primary" className="px-4 py-2" onClick={() => window.location.reload()}>
              <i className="bi bi-arrow-clockwise me-2"></i> Retry
            </Button>
          </Card.Body>
        </Card>
      ) : filteredTasks.length === 0 ? (
        <Card className="text-center py-5 my-4 border-0 scale-in">
          <Card.Body className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '300px' }}>
            <div className="text-muted mb-3 fs-1">
              <i className="bi bi-clipboard"></i>
            </div>
            <Card.Title className="mb-3">No Tasks Found</Card.Title>
            <Card.Text className="mb-4">
              {filter !== 'all' 
                ? `You don't have any ${filter} tasks.` 
                : "You don't have any tasks yet."}
            </Card.Text>
            <Button variant="primary" className="px-4 py-2" onClick={() => setShowAddModal(true)}>
              <i className="bi bi-plus-lg me-2"></i> Add Your First Task
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <TaskBoard tasks={filteredTasks} groupedTasks={groupedTasks} />
      )}
      
      <AddTaskModal show={showAddModal} onHide={() => setShowAddModal(false)} />
    </Container>
  );
};

export default TaskList;