import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import TaskItem from './TaskItem';
import { useTask } from '../../contexts/TaskContext';
import { useTheme } from '../../contexts/ThemeContext';

const TaskBoard = ({ tasks }) => {
  const { addTask } = useTask();
  const { theme } = useTheme();
  const [activeColumn, setActiveColumn] = useState('todo'); // mobile toggle state

  // Group tasks by status
  const groupedTasks = {
    'todo': tasks.filter(task => task.status === 'todo'),
    'in-progress': tasks.filter(task => task.status === 'in-progress'),
    'completed': tasks.filter(task => task.status === 'completed')
  };

  // Status column configuration with icons
  const columns = [
    { key: 'todo', title: 'TO DO', variant: 'secondary', icon: 'bi-list-check' },
    { key: 'in-progress', title: 'IN PROGRESS', variant: 'warning', icon: 'bi-hourglass-split' },
    { key: 'completed', title: 'COMPLETE', variant: 'success', icon: 'bi-check2-all' }
  ];

  return (
    <div className="task-board-container">
    {/* Mobile toggle buttons */}
<div className="d-md-none mb-3 text-center">
  {columns.map(column => (
    <Button
      key={column.key}
      variant={activeColumn === column.key ? column.variant : 'outline-secondary'}
      className="me-2 mb-2"  // 👉 adds right margin & bottom margin
      size="sm"
      onClick={() => setActiveColumn(column.key)}
    >
      <i className={`bi ${column.icon} me-1`}></i>
      {column.title}
    </Button>
  ))}
</div>


      {/* Desktop view = 3 columns | Mobile view = only active column */}
      <Row
        className="task-board g-0"
        style={{ flexWrap: 'nowrap', overflowX: 'auto' }}
      >
        {columns.map(column => (
          <Col
            key={column.key}
            className={`board-column ${activeColumn === column.key ? '' : 'd-none d-md-block'}`}
            xs={12} md={4}
          >
            <div className="column-header d-flex justify-content-between align-items-center px-3 py-2">
              <div className="d-flex align-items-center">
                <span className="column-count me-2">{groupedTasks[column.key].length}</span>
                <h6 className="mb-0 text-uppercase fw-bold">{column.title}</h6>
              </div>
              {column.key === 'todo' && (
                <Button
                  variant=""
                  className="btn-add-column-task p-0"
                  onClick={() => document.getElementById('addTaskButton').click()}
                >
                  <i className="bi bi-plus"></i>
                </Button>
              )}
            </div>
            <div className="column-content p-2" style={{ minHeight: '70vh' }}>
              {groupedTasks[column.key].length > 0 ? (
                <div className="d-flex flex-column gap-2">
                  {groupedTasks[column.key].map(task => (
                    <TaskItem key={task.id} task={task} compact />
                  ))}
                </div>
              ) : (
                <div className="empty-column text-center p-3">
                  <p className="text-muted small mb-0">No tasks</p>
                </div>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TaskBoard;
