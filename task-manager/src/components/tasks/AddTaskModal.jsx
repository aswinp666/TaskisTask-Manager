import { useState } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { useTask } from '../../contexts/TaskContext';
import { useTheme } from '../../contexts/ThemeContext'; // assume you have a theme context

const AddTaskModal = ({ show, onHide }) => {
  const { theme } = useTheme(); // 'light' or 'dark'
  const initialFormState = {
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    category: 'General',
  };

  const [formData, setFormData] = useState(initialFormState);
  const { addTask } = useTask();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(formData);
    setFormData(initialFormState);
    onHide();
  };

  // Styles depending on theme
  const isDark = theme === 'dark';
  const modalBg = isDark ? '#1c1c1e' : '#fff';
  const textColor = isDark ? '#f5f5f5' : '#333';
  const inputBg = isDark ? '#2c2c2e' : '#fff';
  const inputColor = isDark ? '#f5f5f5' : '#000';
  const borderColor = isDark ? '#444' : '#ced4da';

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      className="task-modal"
    >
      <div
        className="modal-content"
        style={{
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
          border: 'none',
          backgroundColor: modalBg,
          color: textColor,
        }}
      >
        <Modal.Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: 'none',
            padding: '1rem',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            backgroundColor: modalBg,
            color: textColor,
          }}
        >
          <Modal.Title>Add New Task</Modal.Title>
          <Button
            variant="link"
            onClick={onHide}
            style={{
              fontSize: '1.2rem',
              color: textColor,
              textDecoration: 'none',
              padding: 0,
              margin: 0,
              lineHeight: 1,
              backgroundColor: 'transparent',
              border: 'none',
            }}
            aria-label="Close"
          >
            &times;
          </Button>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body className="pt-2" style={{ borderRadius: '0 0 20px 20px' }}>
            {/* Title */}
            <Form.Group className="mb-2" controlId="title">
              <Form.Label className="fw-semibold small">Title</Form.Label>
              <InputGroup size="sm">
                <InputGroup.Text 
                  className="bg-transparent"
                  style={{ backgroundColor: inputBg, borderColor }}
                >
                  <i className="bi bi-type" style={{ color: textColor }}></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder=""
                  className="border-start-0"
                  style={{
                    backgroundColor: inputBg,
                    color: inputColor,
                    borderColor,
                  }}
                />
              </InputGroup>
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-2" controlId="description">
              <Form.Label className="fw-semibold small">Description</Form.Label>
              <InputGroup size="sm">
                <InputGroup.Text 
                  className="bg-transparent"
                  style={{ backgroundColor: inputBg, borderColor }}
                >
                  <i className="bi bi-card-text" style={{ color: textColor }}></i>
                </InputGroup.Text>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder=""
                  style={{
                    backgroundColor: inputBg,
                    color: inputColor,
                    borderColor,
                  }}
                />
              </InputGroup>
            </Form.Group>

            <Row>
              {/* Status */}
              <Col md={6}>
                <Form.Group className="mb-2" controlId="status">
                  <Form.Label className="fw-semibold small">Status</Form.Label>
                  <InputGroup size="sm">
                    <InputGroup.Text className="bg-transparent" style={{ backgroundColor: inputBg, borderColor }}>
                      <i className="bi bi-check2-square" style={{ color: textColor }}></i>
                    </InputGroup.Text>
                    <Form.Select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      style={{
                        backgroundColor: inputBg,
                        color: inputColor,
                        borderColor,
                      }}
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </Form.Select>
                  </InputGroup>
                </Form.Group>
              </Col>

              {/* Priority */}
              <Col md={6}>
                <Form.Group className="mb-2" controlId="priority">
                  <Form.Label className="fw-semibold small">Priority</Form.Label>
                  <InputGroup size="sm">
                    <InputGroup.Text className="bg-transparent" style={{ backgroundColor: inputBg, borderColor }}>
                      <i className="bi bi-flag" style={{ color: textColor }}></i>
                    </InputGroup.Text>
                    <Form.Select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      style={{
                        backgroundColor: inputBg,
                        color: inputColor,
                        borderColor,
                      }}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </Form.Select>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              {/* Due Date */}
              <Col md={6}>
                <Form.Group className="mb-2" controlId="dueDate">
                  <Form.Label className="fw-semibold small">Due Date</Form.Label>
                  <InputGroup size="sm">
                    <InputGroup.Text className="bg-transparent" style={{ backgroundColor: inputBg, borderColor }}>
                      <i className="bi bi-calendar-event" style={{ color: textColor }}></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                      style={{
                        backgroundColor: inputBg,
                        color: inputColor,
                        borderColor,
                      }}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              {/* Category */}
              <Col md={6}>
                <Form.Group className="mb-2" controlId="category">
                  <Form.Label className="fw-semibold small">Category</Form.Label>
                  <InputGroup size="sm">
                    <InputGroup.Text className="bg-transparent" style={{ backgroundColor: inputBg, borderColor }}>
                      <i className="bi bi-tag" style={{ color: textColor }}></i>
                    </InputGroup.Text>
                    <Form.Select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      style={{
                        backgroundColor: inputBg,
                        color: inputColor,
                        borderColor,
                      }}
                    >
                      <option value="General">General</option>
                      <option value="Work">Work</option>
                      <option value="Personal">Personal</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Health">Health</option>
                      <option value="Finance">Finance</option>
                      <option value="Education">Education</option>
                    </Form.Select>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer
            className="border-0 pt-0"
            style={{
              borderBottomLeftRadius: '20px',
              borderBottomRightRadius: '20px',
              backgroundColor: modalBg,
            }}
          >
            <Button variant="outline-secondary" onClick={onHide} className="px-3 btn-sm" style={{ color: textColor, borderColor }}>
              <i className="bi bi-x me-2"></i>Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="px-3 btn-sm"
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
              <i className="bi bi-plus-lg me-2"></i>Add Task
            </Button>
          </Modal.Footer>
        </Form>
      </div>
    </Modal>
  );
};

export default AddTaskModal;
