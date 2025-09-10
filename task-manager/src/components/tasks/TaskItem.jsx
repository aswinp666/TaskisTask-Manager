import React, { useState } from 'react';
import { Card, Badge, Button, Form, Dropdown, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTask } from '../../contexts/TaskContext';
import { useTheme } from '../../contexts/ThemeContext';
import EditTaskForm from './EditTaskForm';

const TaskItem = ({ task, compact = false }) => {
  const { updateTask, deleteTask } = useTask();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [showEditModal, setShowEditModal] = useState(false);

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
      case 'low': return 'success';
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

  // --- COMPACT VIEW (Board) ---
  if (compact) {
    return (
      <>
        <Card className="task-item mb-2" style={taskCardStyle}>
          <Card.Body className="p-2 d-flex flex-column" style={{ flex: 1 }}>
            {/* Header row: status + title + priority + menu */}
            <div className="d-flex justify-content-between align-items-start mb-2">
              {/* Left side: status button + title */}
              <div className="d-flex flex-grow-1">
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
                <div className="ms-2">
                  <span style={titleStyle}>{task.title}</span>
                </div>
              </div>

              {/* Right side: priority + menu */}
              <div className="d-flex align-items-start gap-2">
                {task.priority && (
                  <Badge
                    bg={getPriorityBadgeVariant(task.priority)}
                    className="text-uppercase"
                    style={{ flexShrink: 0 }}
                  >
                    {task.priority}
                  </Badge>
                )}
                <Dropdown align="end">
                  <Dropdown.Toggle as="button" className="btn btn-link p-0 border-0">
                    <i className="bi bi-three-dots-vertical"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setShowEditModal(true)}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={() => deleteTask(task.id)} className="text-danger">
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

            {/* Description */}
            {task.description && (
              <small
                style={{
                  color: isDark ? '#ccc' : '#6c757d',
                  marginBottom: '0.25rem',
                  display: 'block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {task.description}
              </small>
            )}

            {/* Due Date */}
            {task.dueDate && (
              <small style={{ color: isDark ? '#ccc' : '#6c757d' }}>
                <i className="bi bi-calendar-event me-1"></i>
                {new Date(task.dueDate).toLocaleDateString()}
              </small>
            )}

            {/* Subtasks pinned bottom */}
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

        {/* Edit Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
          <EditTaskForm task={task} onCancel={() => setShowEditModal(false)} />
        </Modal>
      </>
    );
  }

  // --- FULL LIST VIEW ---
  return (
    <>
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

            {/* 3-dot menu */}
            <Dropdown align="end">
              <Dropdown.Toggle as="button" className="btn btn-link p-0 border-0">
                <i className="bi bi-three-dots-vertical"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setShowEditModal(true)}>Edit</Dropdown.Item>
                <Dropdown.Item onClick={() => deleteTask(task.id)} className="text-danger">
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <EditTaskForm task={task} onCancel={() => setShowEditModal(false)} />
      </Modal>
    </>
  );
};

export default TaskItem;
