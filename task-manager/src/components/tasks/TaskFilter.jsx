import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { useTask } from '../../contexts/TaskContext';
import { useTheme } from '../../contexts/ThemeContext';

const TaskFilter = () => {
  const { filter, setFilter, searchTerm, setSearchTerm } = useTask();
  const { theme } = useTheme();

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearFilters = () => {
    setFilter('all');
    setSearchTerm('');
  };

  const isDark = theme === 'dark';
  const inputClass = isDark ? 'bg-dark text-white' : 'bg-light text-black';
  const borderClass = isDark ? 'border-secondary' : '';

  // Function to inject styles into a <style> tag
  const injectStyle = (styleString) => {
    const style = document.createElement('style');
    style.innerHTML = styleString;
    document.head.appendChild(style);
  };

  const placeholderColor = isDark ? '#a0a0a0' : '#808080';
  const styleString = `
    .task-filter-input::placeholder {
      color: ${placeholderColor};
    }
  `;
  injectStyle(styleString);

  return (
    <div className={`filter-container mb-4 p-4 rounded shadow-sm scale-in ${isDark ? 'bg-dark text-light' : 'bg-light'}`}>
      <Row className="g-3">
        <Col md={5}>
          <Form.Group controlId="searchTerm">
            <Form.Label className="fw-semibold">Search Tasks</Form.Label>
            <InputGroup>
              <InputGroup.Text className={isDark ? 'bg-secondary text-light' : 'bg-transparent'}>
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={handleSearchChange}
                className={`border-start-0 ${inputClass} ${borderClass} task-filter-input`}
              />
            </InputGroup>
          </Form.Group>
        </Col>
        <Col md={5}>
          <Form.Group controlId="statusFilter">
            <Form.Label className="fw-semibold">Filter by Status</Form.Label>
            <InputGroup>
              <InputGroup.Text className={isDark ? 'bg-secondary text-light' : 'bg-transparent'}>
                <i className="bi bi-funnel"></i>
              </InputGroup.Text>
              <Form.Select 
                value={filter} 
                onChange={handleFilterChange}
                className={`border-start-0 ${inputClass} ${borderClass} task-filter-input`}
              >
                <option value="all">All Tasks</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col md={2} className="d-flex align-items-end">
          <Button 
            variant={isDark ? 'outline-light' : 'outline-secondary'} 
            className="w-100 py-2 d-flex align-items-center justify-content-center"
            onClick={clearFilters}
          >
            <i className="bi bi-x-circle me-2"></i> Clear
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default TaskFilter;
