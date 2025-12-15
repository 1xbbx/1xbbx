# Basic Usage Examples

This document provides step-by-step examples for common use cases.

## Table of Contents

- [Installation](#installation)
- [Making API Requests](#making-api-requests)
- [Working with Components](#working-with-components)
- [Handling Forms](#handling-forms)
- [Error Handling](#error-handling)

---

## Installation

### Step 1: Install the Package

```bash
npm install your-package-name
```

### Step 2: Import What You Need

```javascript
// API Client
import { Client } from 'your-package-name';

// Components
import { Button, Input, Modal } from 'your-package-name';

// Utilities
import { debounce, formatDate } from 'your-package-name/utils';

// Types (TypeScript)
import type { Config, Response } from 'your-package-name';
```

### Step 3: Configure the Client

```javascript
import { Client } from 'your-package-name';

const client = new Client({
  baseUrl: 'https://api.example.com',
  timeout: 10000,
  debug: true,
});

export default client;
```

---

## Making API Requests

### GET Request

Fetching data from an API endpoint.

```javascript
import client from './client';

// Simple GET request
async function getUsers() {
  const response = await client.get('/users');
  return response.data;
}

// GET with query parameters
async function searchProducts(query) {
  const response = await client.get('/products', {
    params: {
      search: query,
      category: 'electronics',
      page: 1,
      limit: 10,
    },
  });
  return response.data;
}

// Usage
const users = await getUsers();
console.log('Users:', users);

const products = await searchProducts('laptop');
console.log('Products:', products);
```

### POST Request

Creating new resources.

```javascript
import client from './client';

// Create a new user
async function createUser(userData) {
  const response = await client.post('/users', {
    name: userData.name,
    email: userData.email,
    password: userData.password,
  });
  return response.data;
}

// Usage
const newUser = await createUser({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'securepassword123',
});
console.log('Created user:', newUser);
```

### PUT/PATCH Request

Updating existing resources.

```javascript
import client from './client';

// Full update with PUT
async function replaceUser(id, userData) {
  const response = await client.put(`/users/${id}`, userData);
  return response.data;
}

// Partial update with PATCH
async function updateUserEmail(id, newEmail) {
  const response = await client.patch(`/users/${id}`, {
    email: newEmail,
  });
  return response.data;
}

// Usage
await updateUserEmail(123, 'newemail@example.com');
```

### DELETE Request

Removing resources.

```javascript
import client from './client';

async function deleteUser(id) {
  await client.delete(`/users/${id}`);
  console.log(`User ${id} deleted`);
}

// Usage
await deleteUser(123);
```

---

## Working with Components

### Button Examples

```jsx
import { Button } from 'your-package-name';

function ButtonExamples() {
  return (
    <div>
      {/* Basic button */}
      <Button onClick={() => console.log('Clicked!')}>
        Click Me
      </Button>

      {/* Different variants */}
      <Button variant="solid">Solid</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="ghost">Ghost</Button>

      {/* Different colors */}
      <Button color="primary">Primary</Button>
      <Button color="success">Success</Button>
      <Button color="error">Error</Button>

      {/* Different sizes */}
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>

      {/* With loading state */}
      <Button loading>Submitting...</Button>

      {/* Disabled */}
      <Button disabled>Disabled</Button>

      {/* Full width */}
      <Button fullWidth>Full Width</Button>
    </div>
  );
}
```

### Input Examples

```jsx
import { useState } from 'react';
import { Input } from 'your-package-name';

function InputExamples() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      {/* Basic input */}
      <Input placeholder="Enter text..." />

      {/* With label */}
      <Input label="Username" placeholder="johndoe" />

      {/* Email input */}
      <Input
        type="email"
        label="Email"
        value={email}
        onChange={setEmail}
        placeholder="you@example.com"
      />

      {/* Password input */}
      <Input
        type="password"
        label="Password"
        value={password}
        onChange={setPassword}
      />

      {/* With error */}
      <Input
        label="Email"
        error="Please enter a valid email address"
      />

      {/* With helper text */}
      <Input
        label="Username"
        helperText="Your username must be 3-20 characters"
      />

      {/* Disabled */}
      <Input label="Read-only" value="Cannot edit" disabled />
    </div>
  );
}
```

### Modal Example

```jsx
import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'your-package-name';

function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>
          <p>This is the modal content. You can put any content here.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button color="primary" onClick={() => setIsOpen(false)}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

---

## Handling Forms

### Simple Login Form

```jsx
import { useState } from 'react';
import { Input, Button, Stack, Alert } from 'your-package-name';
import client from './client';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await client.post('/auth/login', {
        email,
        password,
      });
      
      // Store token
      localStorage.setItem('token', response.data.token);
      
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <h2>Sign In</h2>

        {error && (
          <Alert status="error" onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Input
          type="email"
          label="Email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          required
        />

        <Input
          type="password"
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Your password"
          required
        />

        <Button
          type="submit"
          color="primary"
          loading={isLoading}
          fullWidth
        >
          Sign In
        </Button>
      </Stack>
    </form>
  );
}
```

### Registration Form with Validation

```jsx
import { useState } from 'react';
import { Input, Button, Stack, Alert, Checkbox } from 'your-package-name';
import client from './client';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      await client.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      setSuccess(true);
    } catch (err) {
      setErrors({ submit: err.message || 'Registration failed' });
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Alert status="success">
        Registration successful! Please check your email to verify your account.
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <h2>Create Account</h2>

        {errors.submit && (
          <Alert status="error" onClose={() => setErrors((prev) => ({ ...prev, submit: '' }))}>
            {errors.submit}
          </Alert>
        )}

        <Input
          label="Full Name"
          value={formData.name}
          onChange={handleChange('name')}
          error={errors.name}
          placeholder="John Doe"
          required
        />

        <Input
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleChange('email')}
          error={errors.email}
          placeholder="you@example.com"
          required
        />

        <Input
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleChange('password')}
          error={errors.password}
          helperText="Must be at least 8 characters"
          required
        />

        <Input
          type="password"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          error={errors.confirmPassword}
          required
        />

        <Checkbox
          checked={formData.agreeToTerms}
          onChange={handleChange('agreeToTerms')}
          label="I agree to the Terms of Service and Privacy Policy"
        />
        {errors.agreeToTerms && (
          <span className="error-text">{errors.agreeToTerms}</span>
        )}

        <Button type="submit" color="primary" loading={isLoading} fullWidth>
          Create Account
        </Button>
      </Stack>
    </form>
  );
}
```

---

## Error Handling

### Basic Error Handling

```javascript
import client from './client';

async function fetchData() {
  try {
    const response = await client.get('/data');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}
```

### Typed Error Handling

```javascript
import client from './client';
import { NetworkError, ValidationError, AuthError } from 'your-package-name';

async function fetchUserData(userId) {
  try {
    const response = await client.get(`/users/${userId}`);
    return { success: true, data: response.data };
  } catch (error) {
    if (error instanceof NetworkError) {
      return {
        success: false,
        error: 'Network error. Please check your connection.',
      };
    }

    if (error instanceof AuthError) {
      return {
        success: false,
        error: 'Please log in to continue.',
        requiresAuth: true,
      };
    }

    if (error instanceof ValidationError) {
      return {
        success: false,
        error: 'Invalid request data.',
        validationErrors: error.errors,
      };
    }

    // Handle HTTP status codes
    if (error.status === 404) {
      return {
        success: false,
        error: 'User not found.',
      };
    }

    // Unknown error
    return {
      success: false,
      error: 'An unexpected error occurred.',
    };
  }
}

// Usage
const result = await fetchUserData(123);
if (result.success) {
  console.log('User:', result.data);
} else {
  console.error('Error:', result.error);
}
```

### Error Boundary Component

```jsx
import { Component } from 'react';
import { Alert, Button } from 'your-package-name';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <Alert status="error" title="Something went wrong">
            <p>We're sorry, but something went wrong. Please try again.</p>
            <Button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
            >
              Reload Page
            </Button>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <MainContent />
    </ErrorBoundary>
  );
}
```

---

## See Also

- [Advanced Examples](./advanced.md)
- [API Reference](../api/README.md)
- [Components](../components/README.md)
