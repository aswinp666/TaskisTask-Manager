/**
 * Form validation utility functions
 */

// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation (at least 8 characters, 1 uppercase, 1 lowercase, 1 number)
export const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};

// Required field validation
export const isRequired = (value) => {
  return value && value.trim() !== '';
};

// Min length validation
export const minLength = (value, min) => {
  return value && value.length >= min;
};

// Max length validation
export const maxLength = (value, max) => {
  return value && value.length <= max;
};

// Validate login form
export const validateLoginForm = (values) => {
  const errors = {};
  
  if (!isRequired(values.email)) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Invalid email format';
  }
  
  if (!isRequired(values.password)) {
    errors.password = 'Password is required';
  }
  
  return errors;
};

// Validate signup form
export const validateSignupForm = (values) => {
  const errors = {};
  
  if (!isRequired(values.name)) {
    errors.name = 'Name is required';
  }
  
  if (!isRequired(values.email)) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Invalid email format';
  }
  
  if (!isRequired(values.password)) {
    errors.password = 'Password is required';
  } else if (!isValidPassword(values.password)) {
    errors.password = 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number';
  }
  
  if (!isRequired(values.confirmPassword)) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return errors;
};

// Validate task form
export const validateTaskForm = (values) => {
  const errors = {};
  
  if (!isRequired(values.title)) {
    errors.title = 'Title is required';
  } else if (!minLength(values.title, 3)) {
    errors.title = 'Title must be at least 3 characters';
  } else if (!maxLength(values.title, 100)) {
    errors.title = 'Title must be less than 100 characters';
  }
  
  if (!isRequired(values.status)) {
    errors.status = 'Status is required';
  }
  
  if (!isRequired(values.priority)) {
    errors.priority = 'Priority is required';
  }
  
  return errors;
};