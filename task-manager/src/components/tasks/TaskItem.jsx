import React from 'react';
import { Card, Badge, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTask } from '../../contexts/TaskContext';
import { useTheme } from '../../contexts/ThemeContext'; // import theme

const TaskItem = ({ task, compact = false }) => {
  const { updateTask } = useTask();
  const { theme } = useTheme(); // get current theme
  const isDark = theme === 'dark';

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

  const taskCardStyle = {
    transition: 'all 0.3s ease',
    opacity: task.status === 'completed' ? 0.6 : 1,
    transform: task.status === 'completed' ? 'scale(0.98)' : 'scale(1)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: isDark ? '#1e1e1e' : '#fff',
    color: isDark ? '#fff' : '#000',
  };

  const titleStyle = {
    textDecoration: task.status === 'completed' ? 'line-through' : 'none',
    color: task.status === 'completed' ? '#6c757d' : isDark ? '#fff' : '#000',
    fontWeight: '600',
    marginBottom: '0.25rem',
  };

  const statusButtonStyle = {
    transition: 'transform 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '0.5rem',
  };

  // Compact view (board)
  if (compact) {
    return (
      <Card className="task-item mb-2" style={taskCardStyle}>
        <Card.Body className="p-2 d-flex flex-column" style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            {/* Left: Status + Task Info */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flexGrow: 1 }}>
              <Button
                variant=""
                className={`status-indicator status-${task.status}`}
                onClick={handleStatusToggle}
                style={statusButtonStyle}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <i className={`bi ${task.status === 'todo' ? 'bi-circle' : task.status === 'in-progress' ? 'bi-hourglass-split' : 'bi-check-circle-fill'}`}></i>
              </Button>

              {/* Vertical info */}
              <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <span style={titleStyle}>{task.title}</span>
                {task.dueDate && <small style={{ color: isDark ? '#ccc' : '#6c757d', marginBottom: '0.25rem' }}>Due: {new Date(task.dueDate).toLocaleDateString()}</small>}
                {task.assignee && <small style={{ color: isDark ? '#ccc' : '#6c757d' }}>Assigned to: {task.assignee}</small>}
              </div>
            </div>

            {/* Right: Priority */}
            {task.priority && (
              <Badge
                bg={getPriorityBadgeVariant(task.priority)}
                className="text-uppercase"
                style={{ flexShrink: 0, alignSelf: 'flex-start' }}
              >
                {task.priority}
              </Badge>
            )}
          </div>

          {/* Subtasks */}
          {task.subtasks && task.subtasks.length > 0 && (
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center' }}>
              <i className="bi bi-check2-square me-1 small"></i>
              <span style={{ fontSize: '0.75rem', color: isDark ? '#ccc' : '#6c757d' }}>
                {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
              </span>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  }

  // Full list view
  return (
    <Card className="task-item fade-in" style={taskCardStyle}>
      <Card.Body>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Check
              type="checkbox"
              checked={task.status === 'completed'}
              onChange={handleStatusToggle}
            />
            <h5 style={{ marginLeft: '0.5rem', ...titleStyle }}>
              {task.title}
            </h5>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Badge bg={getStatusBadgeVariant(task.status)} className="text-uppercase">
              {task.status ? task.status.charAt(0).toUpperCase() + task.status.slice(1) : 'Todo'}
            </Badge>
            {task.priority && (
              <Badge bg={getPriorityBadgeVariant(task.priority)} className="text-uppercase">
                {task.priority}
              </Badge>
            )}
          </div>
        </div>

        {task.description && (
          <Card.Text style={{ marginTop: '0.5rem', marginBottom: '0.5rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', color: isDark ? '#fff' : '#000' }}>
            {task.description}
          </Card.Text>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
          <div>
            {task.assignee && <small style={{ marginRight: '0.5rem', color: isDark ? '#ccc' : '#6c757d' }}>Assigned to: {task.assignee}</small>}
            {task.category && <Badge bg="info" style={{ marginRight: '0.5rem' }}>{task.category}</Badge>}
            {task.dueDate && <small style={{ color: isDark ? '#ccc' : '#6c757d' }}>Due: {new Date(task.dueDate).toLocaleDateString()}</small>}
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
