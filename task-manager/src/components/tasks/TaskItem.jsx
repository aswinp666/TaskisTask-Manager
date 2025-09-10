import React from 'react';
import { Card, Badge, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTask } from '../../contexts/TaskContext';

const TaskItem = ({ task, compact = false }) => {
  const { updateTask } = useTask();

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
      case 'high': return 'danger';   // red
      case 'medium': return 'warning'; // yellow
      case 'low': return 'success';   // green
      default: return 'secondary';
    }
  };

  const handleStatusToggle = () => {
    let newStatus;
    switch (task.status) {
      case 'todo': newStatus = 'in-progress'; break;
      case 'in-progress': newStatus = 'completed'; break;
      case 'completed': newStatus = 'todo'; break;
      default: newStatus = 'todo';
    }
    updateTask({ ...task, status: newStatus });
  };

  // Compact view (board)
  if (compact) {
    return (
      <Card className="task-item mb-2" style={{ height: '100%' }}>
        <Card.Body className="p-2 d-flex flex-column" style={{ height: '100%' }}>
          {/* Top row: Title and Priority */}
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div className="d-flex align-items-center flex-grow-1">
              <Button 
                variant="" 
                className={`status-indicator me-2 status-${task.status}`} 
                onClick={handleStatusToggle}
              >
                <i className={`bi ${task.status === 'todo' ? 'bi-circle' : task.status === 'in-progress' ? 'bi-hourglass-split' : 'bi-check-circle-fill'}`}></i>
              </Button>
              <span className={`task-title ${task.status === 'completed' ? 'text-decoration-line-through text-muted' : ''}`}>
                {task.title}
              </span>
            </div>

            {/* Priority badge pinned to right */}
            {task.priority && (
              <Badge 
                bg={getPriorityBadgeVariant(task.priority)} 
                className="text-uppercase"
                style={{ flexShrink: 0 }}
              >
                {task.priority}
              </Badge>
            )}
          </div>

          {/* Bottom row: Assignee and Subtasks */}
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <div className="task-assignee me-2">
              <small>{task.assignee || 'Unassigned'}</small>
            </div>

            {task.subtasks && task.subtasks.length > 0 && (
              <div className="task-subtasks">
                <div className="d-flex align-items-center">
                  <i className="bi bi-check2-square me-1 small"></i>
                  <span className="small text-muted">
                    {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
                  </span>
                </div>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    );
  }

  // Full list view
  return (
    <Card className="task-item fade-in">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Form.Check
              type="checkbox"
              checked={task.status === 'completed'}
              onChange={handleStatusToggle}
            />
            <h5 className={`mb-0 ms-2 ${task.status === 'completed' ? 'text-decoration-line-through text-muted' : 'fw-semibold'}`}>
              {task.title}
            </h5>
          </div>

          <div className="d-flex gap-2">
            {/* Status */}
            <Badge bg={getStatusBadgeVariant(task.status)} className="text-uppercase">
              {task.status ? task.status.charAt(0).toUpperCase() + task.status.slice(1) : 'Todo'}
            </Badge>

            {/* Priority */}
            {task.priority && (
              <Badge bg={getPriorityBadgeVariant(task.priority)} className="text-uppercase">
                {task.priority}
              </Badge>
            )}
          </div>
        </div>

        {task.description && (
          <Card.Text className="mt-2 mb-2 text-truncate">{task.description}</Card.Text>
        )}

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            {/* Assignee */}
            {task.assignee && <small className="me-2 text-muted">Assigned to: {task.assignee}</small>}

            {/* Category & Due date */}
            {task.category && <Badge bg="info" className="me-2">{task.category}</Badge>}
            {task.dueDate && (
              <small className="text-muted">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </small>
            )}
          </div>

          <Button as={Link} to={`/tasks/${task.id}`} variant="outline-primary" size="sm">
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskItem;
