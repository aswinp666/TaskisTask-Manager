import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// Create the task context
const TaskContext = createContext();

// Initial state for tasks
const initialState = {
  tasks: [],
  loading: true,
  error: null,
  filter: 'all', // all, completed, in-progress, todo
  searchTerm: '',
};

// Task reducer function
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_TASKS_SUCCESS':
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_TASKS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

// Task provider component
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Fetch tasks from JSONPlaceholder API on initial load
  useEffect(() => {
    const fetchTasks = async () => {
      dispatch({ type: 'SET_LOADING' });
      try {
        // Check if we have tasks in localStorage first
        const storedTasks = localStorage.getItem('tasks');
        
        if (storedTasks) {
          dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: JSON.parse(storedTasks) });
          console.log('TaskList mounted - loaded from localStorage');
        } else {
          // Fetch from API if no stored tasks
          const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
          
          // Transform the data to match our task structure
          const transformedTasks = response.data.map(task => ({
            id: task.id.toString(),
            title: task.title,
            description: '',
            status: task.completed ? 'completed' : 'todo',
            priority: 'medium',
            dueDate: null,
            category: 'General',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }));
          
          dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: transformedTasks });
          localStorage.setItem('tasks', JSON.stringify(transformedTasks));
          console.log('TaskList mounted - fetched from API');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        dispatch({ type: 'FETCH_TASKS_ERROR', payload: 'Failed to fetch tasks' });
      }
    };

    fetchTasks();
    
    // Cleanup function
    return () => {
      console.log('TaskList unmounted');
    };
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (!state.loading && state.tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      console.log('Tasks updated - saved to localStorage');
    }
  }, [state.tasks, state.loading]);

  // Add a new task
  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  // Update an existing task
  const updateTask = (task) => {
    const updatedTask = {
      ...task,
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
  };

  // Delete a task
  const deleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  // Set filter for tasks
  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  // Set search term
  const setSearchTerm = (term) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };

  // Get filtered and searched tasks
  const getFilteredTasks = () => {
    let filteredTasks = [...state.tasks];
    
    // Apply status filter
    if (state.filter !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.status === state.filter);
    }
    
    // Apply search filter
    if (state.searchTerm.trim() !== '') {
      const searchLower = state.searchTerm.toLowerCase();
      filteredTasks = filteredTasks.filter(
        task => 
          task.title.toLowerCase().includes(searchLower) ||
          (task.description && task.description.toLowerCase().includes(searchLower)) ||
          (task.category && task.category.toLowerCase().includes(searchLower))
      );
    }
    
    return filteredTasks;
  };

  return (
    <TaskContext.Provider
      value={{
        ...state,
        addTask,
        updateTask,
        deleteTask,
        setFilter,
        setSearchTerm,
        getFilteredTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the task context
export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};