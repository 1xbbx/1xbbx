# API Reference

This document provides comprehensive documentation for all public APIs, functions, and methods.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Core API](#core-api)
- [Functions](#functions)
- [Types & Interfaces](#types--interfaces)
- [Error Handling](#error-handling)

## Overview

The API is designed to be intuitive and easy to use. All public functions follow consistent naming conventions and error handling patterns.

### Design Principles

1. **Consistency**: All APIs follow the same patterns and conventions
2. **Type Safety**: Full TypeScript support with comprehensive type definitions
3. **Error Handling**: Predictable error handling with descriptive messages
4. **Async/Await**: Promise-based APIs for asynchronous operations

## Installation

```bash
npm install your-package-name
```

```javascript
// ES Modules
import { functionName, ClassName } from 'your-package-name';

// CommonJS
const { functionName, ClassName } = require('your-package-name');
```

---

## Core API

### `initialize(config)`

Initializes the main instance with the provided configuration.

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `config` | `Config` | No | `{}` | Configuration object |
| `config.debug` | `boolean` | No | `false` | Enable debug mode |
| `config.timeout` | `number` | No | `5000` | Request timeout in ms |
| `config.retries` | `number` | No | `3` | Number of retry attempts |

**Returns:** `Promise<Instance>`

**Example:**

```javascript
import { initialize } from 'your-package-name';

const instance = await initialize({
  debug: true,
  timeout: 10000,
  retries: 5
});
```

**Throws:**

- `ConfigurationError` - If the configuration is invalid
- `InitializationError` - If initialization fails

---

### `configure(options)`

Updates the configuration of an existing instance.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `Partial<Config>` | Yes | Configuration options to update |

**Returns:** `void`

**Example:**

```javascript
instance.configure({
  debug: false,
  timeout: 3000
});
```

---

### `destroy()`

Cleans up resources and destroys the instance.

**Returns:** `Promise<void>`

**Example:**

```javascript
await instance.destroy();
```

---

## Functions

### Data Operations

#### `fetchData(endpoint, options)`

Fetches data from the specified endpoint.

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `endpoint` | `string` | Yes | - | The API endpoint to fetch from |
| `options` | `FetchOptions` | No | `{}` | Fetch options |
| `options.method` | `'GET' \| 'POST' \| 'PUT' \| 'DELETE'` | No | `'GET'` | HTTP method |
| `options.headers` | `Record<string, string>` | No | `{}` | Custom headers |
| `options.body` | `unknown` | No | - | Request body |

**Returns:** `Promise<Response<T>>`

**Example:**

```javascript
// Simple GET request
const users = await fetchData('/api/users');

// POST request with body
const newUser = await fetchData('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: { name: 'John', email: 'john@example.com' }
});
```

---

#### `transformData(data, transformer)`

Transforms data using the provided transformer function.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `T` | Yes | The data to transform |
| `transformer` | `(item: T) => U` | Yes | Transformation function |

**Returns:** `U`

**Example:**

```javascript
const users = [
  { id: 1, firstName: 'John', lastName: 'Doe' },
  { id: 2, firstName: 'Jane', lastName: 'Smith' }
];

const names = transformData(users, user => 
  `${user.firstName} ${user.lastName}`
);
// Result: ['John Doe', 'Jane Smith']
```

---

### Utility Functions

#### `validateInput(schema, data)`

Validates input data against a schema.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `schema` | `Schema` | Yes | Validation schema |
| `data` | `unknown` | Yes | Data to validate |

**Returns:** `ValidationResult`

```typescript
interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  data: T | null;
}
```

**Example:**

```javascript
const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', required: true },
    age: { type: 'number', min: 0 }
  }
};

const result = validateInput(schema, { name: 'John', age: 25 });

if (result.valid) {
  console.log('Valid data:', result.data);
} else {
  console.error('Validation errors:', result.errors);
}
```

---

#### `formatOutput(data, format)`

Formats output data according to the specified format.

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `data` | `unknown` | Yes | - | Data to format |
| `format` | `'json' \| 'xml' \| 'csv'` | No | `'json'` | Output format |

**Returns:** `string`

**Example:**

```javascript
const data = { name: 'John', age: 25 };

// JSON output (default)
const json = formatOutput(data);
// '{"name":"John","age":25}'

// CSV output
const csv = formatOutput(data, 'csv');
// 'name,age\nJohn,25'
```

---

## Types & Interfaces

### Core Types

```typescript
/**
 * Main configuration interface
 */
interface Config {
  /** Enable debug mode */
  debug?: boolean;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Number of retry attempts */
  retries?: number;
  /** Base URL for API requests */
  baseUrl?: string;
  /** Custom headers for all requests */
  headers?: Record<string, string>;
}

/**
 * API Response wrapper
 */
interface Response<T> {
  /** Response data */
  data: T;
  /** HTTP status code */
  status: number;
  /** Response headers */
  headers: Record<string, string>;
  /** Request metadata */
  meta: ResponseMeta;
}

/**
 * Response metadata
 */
interface ResponseMeta {
  /** Request duration in milliseconds */
  duration: number;
  /** Number of retries attempted */
  retries: number;
  /** Cache hit indicator */
  cached: boolean;
}
```

### Event Types

```typescript
/**
 * Event handler type
 */
type EventHandler<T = unknown> = (event: Event<T>) => void;

/**
 * Event object
 */
interface Event<T = unknown> {
  /** Event type identifier */
  type: string;
  /** Event payload */
  payload: T;
  /** Event timestamp */
  timestamp: number;
  /** Event source */
  source: string;
}

/**
 * Available event types
 */
type EventType = 
  | 'data:loaded'
  | 'data:error'
  | 'connection:open'
  | 'connection:close'
  | 'state:change';
```

### Error Types

```typescript
/**
 * Base error class
 */
class BaseError extends Error {
  code: string;
  details?: unknown;
}

/**
 * Configuration error
 */
class ConfigurationError extends BaseError {
  code: 'CONFIG_INVALID' | 'CONFIG_MISSING';
}

/**
 * Network error
 */
class NetworkError extends BaseError {
  code: 'NETWORK_TIMEOUT' | 'NETWORK_UNREACHABLE';
  statusCode?: number;
}

/**
 * Validation error
 */
class ValidationError extends BaseError {
  code: 'VALIDATION_FAILED';
  field: string;
  constraint: string;
}
```

---

## Error Handling

All API functions follow a consistent error handling pattern. Errors are thrown as typed exceptions that can be caught and handled appropriately.

### Error Handling Pattern

```javascript
import { fetchData, NetworkError, ValidationError } from 'your-package-name';

try {
  const data = await fetchData('/api/users');
  console.log(data);
} catch (error) {
  if (error instanceof NetworkError) {
    console.error('Network issue:', error.message);
    // Handle network errors (retry, fallback, etc.)
  } else if (error instanceof ValidationError) {
    console.error('Invalid data:', error.field, error.constraint);
    // Handle validation errors (show form errors, etc.)
  } else {
    // Handle unexpected errors
    console.error('Unexpected error:', error);
    throw error;
  }
}
```

### Error Codes Reference

| Code | Error Type | Description |
|------|------------|-------------|
| `CONFIG_INVALID` | ConfigurationError | Invalid configuration provided |
| `CONFIG_MISSING` | ConfigurationError | Required configuration missing |
| `NETWORK_TIMEOUT` | NetworkError | Request timed out |
| `NETWORK_UNREACHABLE` | NetworkError | Unable to reach the server |
| `VALIDATION_FAILED` | ValidationError | Data validation failed |

---

## See Also

- [Getting Started Guide](../guides/getting-started.md)
- [Components Reference](../components/README.md)
- [Examples](../examples/README.md)
