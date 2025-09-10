import React from 'react';
import { Card, Badge, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
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
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'secondary';
    }
  };

  const handleStatusToggle = () => {
    let newStatus;
    switch (task.status) {
      case 'todo':
        newStatus = 'in-progress';
        break;
      case 'in-progress':
        newStatus = 'completed';
        break;
      case 'completed':
        newStatus = 'todo';
        break;
      default:
        newStatus = 'todo';
    }

    updateTask({ ...task, status: newStatus });
  };

  // Render compact view for board
  if (compact) {
    return (
      <Card className="task-item mb-2">
        <Card.Body className="p-2">
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div className="d-flex align-items-center">
                <Button 
                  variant="" 
                  className={`status-indicator me-2 status-${task.status}`} 
                  onClick={handleStatusToggle}
                  aria-label={`Mark as ${task.status === 'todo' ? 'in progress' : task.status === 'in-progress' ? 'completed' : 'todo'}`}
                >
                  <i className={`bi ${task.status === 'todo' ? 'bi-circle' : task.status === 'in-progress' ? 'bi-hourglass-split' : 'bi-check-circle-fill'}`}></i>
                </Button>
                <span 
                  className={`task-title ${task.status === 'completed' ? 'text-decoration-line-through text-muted' : ''}`}
                >
                  {task.title}
                </span>
              </div>
              <div className="d-flex">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>View details</Tooltip>}
                >
                <Link to={`/tasks/${task.id}`} className="task-action-btn ms-1 text-muted">
  <i className="bi bi-three-dots"></i>
</Link>


                </OverlayTrigger>
              </div>
            </div>
            
            <div className="d-flex justify-content-between align-items-center mt-auto">
              <div className="d-flex align-items-center">
                <div className="task-assignee me-2">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Assigned to: User</Tooltip>}
                  >
                    <div className="avatar">
                      <span>AK</span>
                    </div>
                  </OverlayTrigger>
                </div>
                
                {task.priority === 'high' && (
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>High Priority</Tooltip>}
                  >
                    <span className="priority-indicator high">
                      <i className="bi bi-star-fill"></i>
                    </span>
                  </OverlayTrigger>
                )}
              </div>
              
              {task.dueDate && (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Due date: {new Date(task.dueDate).toLocaleDateString()}</Tooltip>}
                >
                 <span className="task-due-date text-muted">
  {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}
</span>

                </OverlayTrigger>
              )}
            </div>
            
            {task.subtasks && task.subtasks.length > 0 && (
              <div className="task-subtasks mt-2">
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

  // Render full list view
  return (
    <Card className="task-item fade-in">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Form.Check
              type="checkbox"
              checked={task.status === 'completed'}
              onChange={handleStatusToggle}
              aria-label={`Mark ${task.title} as ${task.status === 'completed' ? 'incomplete' : 'complete'}`}
            />
            <h5 className={`mb-0 ms-2 ${task.status === 'completed' ? 'text-decoration-line-through text-muted' : 'fw-semibold'}`}>
              {task.title}
            </h5>
          </div>
          <div className="d-flex gap-2">
            <Badge bg={getStatusBadgeVariant(task.status)} className="d-flex align-items-center gap-1">
              <i className={`bi ${task.status === 'completed' ? 'bi-check-circle-fill' : task.status === 'in-progress' ? 'bi-play-circle-fill' : 'bi-circle'}`}></i>
              <span>{task.status ? task.status.charAt(0).toUpperCase() + task.status.slice(1) : 'Todo'}</span>
            </Badge>
            <Badge bg={getPriorityBadgeVariant(task.priority)} className="d-flex align-items-center gap-1">
              <i className={`bi ${task.priority === 'high' ? 'bi-flag-fill' : task.priority === 'medium' ? 'bi-flag' : 'bi-flag'}`}></i>
              <span>{task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'Normal'}</span>
            </Badge>
          </div>
        </div>

        {task.description && (
          <Card.Text className="mt-3 mb-2 text-truncate">
            {task.description}
          </Card.Text>
        )}

      <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            {task.category && <Badge bg="info">{task.category}</Badge>}
            {task.dueDate && (
              <span className={`ms-2 ${isDark ? 'text-white' : 'text-dark'}`}>
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
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