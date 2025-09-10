import axios from 'axios';

// Base URL for the JSONPlaceholder API
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Transform the API response to match our task structure
const transformTaskData = (task) => ({
  id: task.id.toString(),
  title: task.title,
  description: task.body || '',
  status: task.completed ? 'completed' : 'pending',
  priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)], // Random priority since JSONPlaceholder doesn't have this
  dueDate: new Date(Date.now() + Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], // Random due date within next 7 days
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

// API functions for tasks
export const taskApi = {
  // Get all tasks
  getTasks: async () => {
    try {
      const response = await api.get('/todos?_limit=10');
      return response.data.map(transformTaskData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Get a single task by ID
  getTask: async (id) => {
    try {
      const response = await api.get(`/todos/${id}`);
      return transformTaskData(response.data);
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error);
      throw error;
    }
  },

  // Create a new task
  createTask: async (taskData) => {
    try {
      const response = await api.post('/todos', {
        title: taskData.title,
        body: taskData.description,
        completed: taskData.status === 'completed',
        userId: 1 // Default user ID for JSONPlaceholder
      });
      return transformTaskData(response.data);
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Update an existing task
  updateTask: async (id, taskData) => {
    try {
      const response = await api.put(`/todos/${id}`, {
        title: taskData.title,
        body: taskData.description,
        completed: taskData.status === 'completed',
        userId: 1 // Default user ID for JSONPlaceholder
      });
      return transformTaskData(response.data);
    } catch (error) {
      console.error(`Error updating task ${id}:`, error);
      throw error;
    }
  },

  // Delete a task
  deleteTask: async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      return { success: true, id };
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error);
      throw error;
    }
  }
};

// Add request interceptor for authentication if needed
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with an error status
      console.error('API Error:', error.response.status, error.response.data);
      
      // Handle authentication errors
      if (error.response.status === 401) {
        // Clear auth data and redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;