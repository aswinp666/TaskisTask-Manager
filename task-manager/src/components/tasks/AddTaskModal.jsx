import { useState } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { useTask } from '../../contexts/TaskContext';

const AddTaskModal = ({ show, onHide }) => {
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
          borderRadius: '15px',
        }}
      >
        <Modal.Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: 'none',
            padding: '1rem',
          }}
        >
          <Modal.Title className="d-flex align-items-center">
            <span>Add New Task</span>
          </Modal.Title>
          <Button
            variant="link"
            onClick={onHide}
            style={{
              fontSize: '1.2rem',
              color: '#6c757d',
              textDecoration: 'none',
              padding: '0',
              margin: '0',
              lineHeight: '1',
              backgroundColor: 'transparent',
              border: 'none',
            }}
            aria-label="Close"
          >
            &times;
          </Button>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="pt-2">
           <Form.Group className="mb-2" controlId="title">
  <Form.Label className="fw-semibold small">Title</Form.Label>
  <InputGroup size="sm">
    <InputGroup.Text className="bg-transparent">
      {/* <i className="bi bi-type"></i> */}
    </InputGroup.Text>
    <Form.Control
      type="text"
      name="title"
      value={formData.title}
      onChange={handleChange}
      required
      placeholder="Enter task title"
      className="border-start-0"
    />
  </InputGroup>
</Form.Group>

            <Form.Group className="mb-2" controlId="description">
              <Form.Label className="fw-semibold small">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter task description"
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-2" controlId="status">
                  <Form.Label className="fw-semibold small">Status</Form.Label>
                  <InputGroup size="sm">
                    <InputGroup.Text className="bg-transparent">
                      <i className="bi bi-check2-square"></i>
                    </InputGroup.Text>
                    <Form.Select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="border-start-0"
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </Form.Select>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2" controlId="priority">
                  <Form.Label className="fw-semibold small">Priority</Form.Label>
                  <InputGroup size="sm">
                    <InputGroup.Text className="bg-transparent">
                      <i className="bi bi-flag"></i>
                    </InputGroup.Text>
                    <Form.Select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="border-start-0"
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
              <Col md={6}>
                <Form.Group className="mb-2" controlId="dueDate">
                  <Form.Label className="fw-semibold small">Due Date</Form.Label>
                  <InputGroup size="sm">
                    <InputGroup.Text className="bg-transparent">
                      <i className="bi bi-calendar-event"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                      className="border-start-0"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2" controlId="category">
                  <Form.Label className="fw-semibold small">Category</Form.Label>
                  <InputGroup size="sm">
                    <InputGroup.Text className="bg-transparent">
                      <i className="bi bi-tag"></i>
                    </InputGroup.Text>
                    <Form.Select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="border-start-0"
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
          <Modal.Footer className="border-0 pt-0">
            <Button variant="outline-secondary" onClick={onHide} className="px-3 btn-sm">
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
