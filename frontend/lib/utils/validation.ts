// Basic email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

export const isStrongPassword = (password: string): boolean => {
  // Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.
  const strongPasswordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return strongPasswordRegex.test(password);
};

export const isNotEmpty = (value: string | undefined | null): boolean => {
  return value !== undefined && value !== null && value.trim() !== '';
};

export const isPositiveNumber = (value: number | undefined | null): boolean => {
  return value !== undefined && value !== null && typeof value === 'number' && value > 0;
};

// Validation error functions that return error messages or empty strings
export const getEmailError = (email: string): string => {
  if (!email || email.trim() === '') {
    return 'Email is required';
  }
  if (!isValidEmail(email)) {
    return 'Please enter a valid email address';
  }
  return '';
};

export const getPasswordError = (password: string): string => {
  if (!password || password.trim() === '') {
    return 'Password is required';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  return '';
};

export const getTaskTitleError = (title: string): string => {
  if (!title || title.trim() === '') {
    return 'Task title is required';
  }
  if (title.trim().length < 3) {
    return 'Task title must be at least 3 characters long';
  }
  if (title.length > 200) {
    return 'Task title must not exceed 200 characters';
  }
  return '';
};

export const getTaskDescriptionError = (description: string): string => {
  // Description is optional, so empty is valid
  if (!description) {
    return '';
  }
  if (description.length > 2000) {
    return 'Task description must not exceed 2000 characters';
  }
  return '';
};