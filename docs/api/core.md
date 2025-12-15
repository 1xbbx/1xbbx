# Core API

This document covers the core API functions that form the foundation of the library.

## Table of Contents

- [Client Class](#client-class)
- [Instance Methods](#instance-methods)
- [Static Methods](#static-methods)
- [Lifecycle Hooks](#lifecycle-hooks)

---

## Client Class

The `Client` class is the main entry point for interacting with the API.

### Constructor

```typescript
new Client(options?: ClientOptions)
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `ClientOptions` | No | Client configuration options |

**ClientOptions:**

```typescript
interface ClientOptions {
  /** Base URL for API requests */
  baseUrl?: string;
  /** Default request timeout (ms) */
  timeout?: number;
  /** Authentication token */
  authToken?: string;
  /** Enable request/response logging */
  debug?: boolean;
  /** Custom HTTP headers */
  headers?: Record<string, string>;
  /** Retry configuration */
  retry?: RetryConfig;
}

interface RetryConfig {
  /** Maximum number of retries */
  maxRetries: number;
  /** Initial delay between retries (ms) */
  initialDelay: number;
  /** Maximum delay between retries (ms) */
  maxDelay: number;
  /** Exponential backoff factor */
  factor: number;
}
```

**Example:**

```javascript
import { Client } from 'your-package-name';

// Basic initialization
const client = new Client();

// With full configuration
const client = new Client({
  baseUrl: 'https://api.example.com',
  timeout: 10000,
  authToken: 'your-auth-token',
  debug: process.env.NODE_ENV === 'development',
  headers: {
    'X-Custom-Header': 'value'
  },
  retry: {
    maxRetries: 3,
    initialDelay: 1000,
    maxDelay: 30000,
    factor: 2
  }
});
```

---

## Instance Methods

### `client.get(path, options)`

Performs a GET request.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Request path |
| `options` | `RequestOptions` | No | Request options |

**Returns:** `Promise<Response<T>>`

**Example:**

```javascript
// Simple GET
const users = await client.get('/users');

// GET with query parameters
const filteredUsers = await client.get('/users', {
  params: { role: 'admin', active: true }
});

// GET with custom headers
const data = await client.get('/protected-resource', {
  headers: { 'X-Request-ID': 'unique-id' }
});
```

---

### `client.post(path, data, options)`

Performs a POST request.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Request path |
| `data` | `unknown` | No | Request body |
| `options` | `RequestOptions` | No | Request options |

**Returns:** `Promise<Response<T>>`

**Example:**

```javascript
// Create a new resource
const newUser = await client.post('/users', {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user'
});

// POST with form data
const formData = new FormData();
formData.append('file', fileBlob);
formData.append('name', 'document.pdf');

const uploadResult = await client.post('/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

---

### `client.put(path, data, options)`

Performs a PUT request (full resource update).

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Request path |
| `data` | `unknown` | Yes | Complete resource data |
| `options` | `RequestOptions` | No | Request options |

**Returns:** `Promise<Response<T>>`

**Example:**

```javascript
// Update entire resource
const updatedUser = await client.put('/users/123', {
  name: 'John Smith',
  email: 'john.smith@example.com',
  role: 'admin',
  active: true
});
```

---

### `client.patch(path, data, options)`

Performs a PATCH request (partial resource update).

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Request path |
| `data` | `unknown` | Yes | Partial resource data |
| `options` | `RequestOptions` | No | Request options |

**Returns:** `Promise<Response<T>>`

**Example:**

```javascript
// Update only specific fields
const patchedUser = await client.patch('/users/123', {
  role: 'admin'
});
```

---

### `client.delete(path, options)`

Performs a DELETE request.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Request path |
| `options` | `RequestOptions` | No | Request options |

**Returns:** `Promise<Response<void>>`

**Example:**

```javascript
// Delete a resource
await client.delete('/users/123');

// Delete with confirmation header
await client.delete('/users/123', {
  headers: { 'X-Confirm-Delete': 'true' }
});
```

---

### `client.request(config)`

Performs a custom request with full control over the configuration.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `config` | `RequestConfig` | Yes | Full request configuration |

**RequestConfig:**

```typescript
interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';
  path: string;
  params?: Record<string, unknown>;
  data?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
  validateStatus?: (status: number) => boolean;
}
```

**Example:**

```javascript
const response = await client.request({
  method: 'POST',
  path: '/custom-endpoint',
  data: { key: 'value' },
  headers: { 'X-Custom': 'header' },
  timeout: 5000,
  responseType: 'json',
  validateStatus: (status) => status >= 200 && status < 300
});
```

---

## Static Methods

### `Client.create(options)`

Factory method for creating a new client instance.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `ClientOptions` | No | Client options |

**Returns:** `Client`

**Example:**

```javascript
const client = Client.create({
  baseUrl: 'https://api.example.com',
  timeout: 5000
});
```

---

### `Client.isClientError(error)`

Checks if an error is a client-side HTTP error (4xx).

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `error` | `unknown` | Yes | Error to check |

**Returns:** `boolean`

**Example:**

```javascript
try {
  await client.get('/resource');
} catch (error) {
  if (Client.isClientError(error)) {
    console.log('Client error:', error.status);
  }
}
```

---

### `Client.isServerError(error)`

Checks if an error is a server-side HTTP error (5xx).

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `error` | `unknown` | Yes | Error to check |

**Returns:** `boolean`

---

## Lifecycle Hooks

The Client provides lifecycle hooks for intercepting requests and responses.

### Request Interceptors

```javascript
// Add request interceptor
client.interceptors.request.use(
  (config) => {
    // Modify config before request is sent
    config.headers['Authorization'] = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);
```

### Response Interceptors

```javascript
// Add response interceptor
client.interceptors.response.use(
  (response) => {
    // Transform response data
    return response;
  },
  (error) => {
    // Handle response error
    if (error.status === 401) {
      // Refresh token and retry
      return refreshTokenAndRetry(error.config);
    }
    return Promise.reject(error);
  }
);
```

### Removing Interceptors

```javascript
// Store interceptor ID
const interceptorId = client.interceptors.request.use(config => config);

// Remove interceptor
client.interceptors.request.eject(interceptorId);
```

---

## See Also

- [API Overview](README.md)
- [Utilities Reference](utilities.md)
- [Type Definitions](types.md)
