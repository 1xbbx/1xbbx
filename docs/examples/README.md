# Examples

This section contains practical examples and code patterns for common use cases.

## Table of Contents

- [Basic Examples](#basic-examples)
- [API Integration](#api-integration)
- [Form Handling](#form-handling)
- [Authentication](#authentication)
- [State Management](#state-management)
- [Component Patterns](#component-patterns)
- [Advanced Patterns](#advanced-patterns)

---

## Basic Examples

### Hello World

The simplest example to get started.

```javascript
import { Client } from 'your-package-name';

const client = new Client({
  baseUrl: 'https://api.example.com',
});

async function main() {
  const response = await client.get('/hello');
  console.log(response.data);
}

main();
```

### Configuration

Setting up the client with full configuration.

```javascript
import { Client } from 'your-package-name';

const client = new Client({
  baseUrl: 'https://api.example.com',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Version': '1.0',
  },
  retry: {
    maxRetries: 3,
    initialDelay: 1000,
    factor: 2,
  },
  debug: process.env.NODE_ENV === 'development',
});

export default client;
```

---

## API Integration

### Fetching Data

```javascript
import client from './client';

// Simple GET request
async function getUsers() {
  const response = await client.get('/users');
  return response.data;
}

// GET with query parameters
async function searchUsers(query, page = 1) {
  const response = await client.get('/users', {
    params: {
      q: query,
      page,
      limit: 20,
    },
  });
  return response.data;
}

// GET single resource
async function getUserById(id) {
  const response = await client.get(`/users/${id}`);
  return response.data;
}
```

### Creating Data

```javascript
import client from './client';

// Create a new resource
async function createUser(userData) {
  const response = await client.post('/users', userData);
  return response.data;
}

// Example usage
const newUser = await createUser({
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
});
```

### Updating Data

```javascript
import client from './client';

// Full update (PUT)
async function updateUser(id, userData) {
  const response = await client.put(`/users/${id}`, userData);
  return response.data;
}

// Partial update (PATCH)
async function updateUserEmail(id, email) {
  const response = await client.patch(`/users/${id}`, { email });
  return response.data;
}
```

### Deleting Data

```javascript
import client from './client';

async function deleteUser(id) {
  await client.delete(`/users/${id}`);
  return true;
}
```

### Error Handling

```javascript
import client from './client';
import { NetworkError, ValidationError } from 'your-package-name';

async function fetchUserSafely(id) {
  try {
    const response = await client.get(`/users/${id}`);
    return { data: response.data, error: null };
  } catch (error) {
    if (error instanceof NetworkError) {
      console.error('Network error:', error.message);
      return { data: null, error: 'Unable to connect. Please check your internet.' };
    }
    
    if (error instanceof ValidationError) {
      console.error('Validation error:', error.message);
      return { data: null, error: 'Invalid request data.' };
    }
    
    if (error.status === 404) {
      return { data: null, error: 'User not found.' };
    }
    
    console.error('Unexpected error:', error);
    return { data: null, error: 'An unexpected error occurred.' };
  }
}
```

---

## Form Handling

### Basic Form

```jsx
import { useState } from 'react';
import { Input, Button, Stack, Alert } from 'your-component-library';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const handleChange = (field) => (value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
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
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    setSubmitResult(null);
    
    try {
      await client.post('/contact', formData);
      setSubmitResult({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitResult({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        {submitResult && (
          <Alert status={submitResult.type}>
            {submitResult.message}
          </Alert>
        )}
        
        <Input
          label="Name"
          value={formData.name}
          onChange={handleChange('name')}
          error={errors.name}
          required
        />
        
        <Input
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleChange('email')}
          error={errors.email}
          required
        />
        
        <Textarea
          label="Message"
          value={formData.message}
          onChange={handleChange('message')}
          error={errors.message}
          rows={5}
          required
        />
        
        <Button type="submit" loading={isSubmitting} fullWidth>
          Send Message
        </Button>
      </Stack>
    </form>
  );
}
```

### Form with Validation Library

```jsx
import { useForm } from 'your-form-library';
import { z } from 'zod';
import { Input, Button, Stack } from 'your-component-library';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[0-9]/, 'Password must contain a number'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

function RegistrationForm() {
  const { register, handleSubmit, errors, isSubmitting } = useForm({
    schema: userSchema,
  });

  const onSubmit = async (data) => {
    await client.post('/users/register', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Input
          label="Full Name"
          {...register('name')}
          error={errors.name?.message}
        />
        
        <Input
          type="email"
          label="Email"
          {...register('email')}
          error={errors.email?.message}
        />
        
        <Input
          type="password"
          label="Password"
          {...register('password')}
          error={errors.password?.message}
        />
        
        <Input
          type="password"
          label="Confirm Password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
        
        <Button type="submit" loading={isSubmitting}>
          Create Account
        </Button>
      </Stack>
    </form>
  );
}
```

---

## Authentication

### Login Flow

```jsx
import { useState, createContext, useContext } from 'react';
import client from './client';

// Auth Context
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      client.configure({
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await client.get('/auth/me');
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('authToken');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await client.post('/auth/login', { email, password });
    const { token, user } = response.data;
    
    localStorage.setItem('authToken', token);
    client.configure({
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(user);
    
    return user;
  };

  const logout = async () => {
    await client.post('/auth/logout');
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const register = async (userData) => {
    const response = await client.post('/auth/register', userData);
    const { token, user } = response.data;
    
    localStorage.setItem('authToken', token);
    client.configure({
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(user);
    
    return user;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      logout,
      register,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

### Protected Route

```jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { Spinner } from 'your-component-library';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="loading-container">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Usage
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
```

---

## State Management

### Using React Context

```jsx
import { createContext, useContext, useReducer } from 'react';

// Actions
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_DATA: 'SET_DATA',
  SET_ERROR: 'SET_ERROR',
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
};

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_DATA:
      return { ...state, items: action.payload, isLoading: false };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case ACTIONS.ADD_ITEM:
      return { ...state, items: [...state.items, action.payload] };
    case ACTIONS.UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case ACTIONS.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
}

// Context
const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    items: [],
    isLoading: false,
    error: null,
  });

  const fetchItems = async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const response = await client.get('/items');
      dispatch({ type: ACTIONS.SET_DATA, payload: response.data });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  const addItem = async (item) => {
    const response = await client.post('/items', item);
    dispatch({ type: ACTIONS.ADD_ITEM, payload: response.data });
    return response.data;
  };

  const updateItem = async (id, updates) => {
    const response = await client.patch(`/items/${id}`, updates);
    dispatch({ type: ACTIONS.UPDATE_ITEM, payload: response.data });
    return response.data;
  };

  const deleteItem = async (id) => {
    await client.delete(`/items/${id}`);
    dispatch({ type: ACTIONS.DELETE_ITEM, payload: id });
  };

  return (
    <DataContext.Provider value={{
      ...state,
      fetchItems,
      addItem,
      updateItem,
      deleteItem,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
```

### Custom Data Hook

```jsx
import { useState, useEffect, useCallback } from 'react';
import client from './client';

function useApi(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(!options.manual);

  const fetchData = useCallback(async (params) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await client.get(endpoint, { params });
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    if (!options.manual) {
      fetchData(options.params);
    }
  }, [fetchData, options.manual, options.params]);

  const refetch = useCallback((params) => {
    return fetchData(params || options.params);
  }, [fetchData, options.params]);

  return { data, error, isLoading, refetch };
}

// Usage
function UserList() {
  const { data: users, isLoading, error, refetch } = useApi('/users');

  if (isLoading) return <Spinner />;
  if (error) return <Alert status="error">{error.message}</Alert>;

  return (
    <div>
      <Button onClick={() => refetch()}>Refresh</Button>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Component Patterns

### Compound Components

```jsx
import { createContext, useContext, useState } from 'react';

// Context
const AccordionContext = createContext(null);

// Parent component
function Accordion({ children, defaultIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <AccordionContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

// Child components
function AccordionItem({ children, index }) {
  const { activeIndex, setActiveIndex } = useContext(AccordionContext);
  const isOpen = activeIndex === index;

  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
      {children}
    </div>
  );
}

function AccordionHeader({ children, index }) {
  const { setActiveIndex, activeIndex } = useContext(AccordionContext);
  const isOpen = activeIndex === index;

  return (
    <button
      className="accordion-header"
      onClick={() => setActiveIndex(isOpen ? -1 : index)}
      aria-expanded={isOpen}
    >
      {children}
      <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} />
    </button>
  );
}

function AccordionPanel({ children, index }) {
  const { activeIndex } = useContext(AccordionContext);
  const isOpen = activeIndex === index;

  if (!isOpen) return null;

  return <div className="accordion-panel">{children}</div>;
}

// Attach child components
Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Panel = AccordionPanel;

// Usage
function FAQ() {
  return (
    <Accordion defaultIndex={0}>
      <Accordion.Item index={0}>
        <Accordion.Header index={0}>What is this?</Accordion.Header>
        <Accordion.Panel index={0}>
          This is an accordion component.
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item index={1}>
        <Accordion.Header index={1}>How does it work?</Accordion.Header>
        <Accordion.Panel index={1}>
          Click the header to expand/collapse.
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
```

### Render Props

```jsx
function DataFetcher({ url, children }) {
  const [state, setState] = useState({
    data: null,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    fetchData();
  }, [url]);

  const fetchData = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await client.get(url);
      setState({ data: response.data, error: null, isLoading: false });
    } catch (error) {
      setState({ data: null, error, isLoading: false });
    }
  };

  return children({ ...state, refetch: fetchData });
}

// Usage
function UserProfile({ userId }) {
  return (
    <DataFetcher url={`/users/${userId}`}>
      {({ data: user, isLoading, error, refetch }) => {
        if (isLoading) return <Spinner />;
        if (error) return <Alert status="error">{error.message}</Alert>;

        return (
          <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <Button onClick={refetch}>Refresh</Button>
          </div>
        );
      }}
    </DataFetcher>
  );
}
```

---

## Advanced Patterns

### Optimistic Updates

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    
    // Optimistically update UI
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

    try {
      await client.patch(`/todos/${id}`, { completed: !todo.completed });
    } catch (err) {
      // Revert on error
      setTodos(prev =>
        prev.map(t => (t.id === id ? { ...t, completed: todo.completed } : t))
      );
      setError('Failed to update todo');
    }
  };

  return (
    <div>
      {error && <Alert status="error" onClose={() => setError(null)}>{error}</Alert>}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              label={todo.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Infinite Scroll

```jsx
import { useState, useEffect, useRef, useCallback } from 'react';

function InfiniteList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef();

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await client.get('/items', {
        params: { page, limit: 20 },
      });
      
      setItems(prev => [...prev, ...response.data.items]);
      setHasMore(response.data.pagination.hasNext);
      setPage(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const lastElementRef = useCallback(node => {
    if (isLoading) return;
    
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });

    if (node) {
      observerRef.current.observe(node);
    }
  }, [isLoading, hasMore]);

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <div className="infinite-list">
      {items.map((item, index) => {
        if (index === items.length - 1) {
          return (
            <div key={item.id} ref={lastElementRef}>
              <ItemCard item={item} />
            </div>
          );
        }
        return <ItemCard key={item.id} item={item} />;
      })}
      
      {isLoading && (
        <div className="loading-indicator">
          <Spinner />
        </div>
      )}
      
      {!hasMore && (
        <div className="end-message">
          No more items to load
        </div>
      )}
    </div>
  );
}
```

### Debounced Search

```jsx
import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'your-package-name/utils';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchApi = useCallback(
    debounce(async (searchQuery) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await client.get('/search', {
          params: { q: searchQuery },
        });
        setResults(response.data);
      } finally {
        setIsSearching(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    searchApi(query);
  }, [query, searchApi]);

  return (
    <div className="search-page">
      <Input
        type="search"
        placeholder="Search..."
        value={query}
        onChange={setQuery}
        leftElement={<Icon name="search" />}
        rightElement={isSearching && <Spinner size="sm" />}
      />

      <div className="search-results">
        {results.length === 0 && query && !isSearching && (
          <p>No results found for "{query}"</p>
        )}

        {results.map(result => (
          <SearchResult key={result.id} result={result} query={query} />
        ))}
      </div>
    </div>
  );
}
```

---

## See Also

- [API Reference](../api/README.md)
- [Components](../components/README.md)
- [Getting Started](../guides/getting-started.md)
