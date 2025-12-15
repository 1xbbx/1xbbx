# Type Definitions

This document provides complete type definitions for all public APIs.

## Table of Contents

- [Core Types](#core-types)
- [Configuration Types](#configuration-types)
- [Request/Response Types](#requestresponse-types)
- [Component Types](#component-types)
- [Utility Types](#utility-types)
- [Event Types](#event-types)

---

## Core Types

### Base Types

```typescript
/**
 * Nullable type helper
 */
type Nullable<T> = T | null;

/**
 * Optional type helper  
 */
type Optional<T> = T | undefined;

/**
 * Deep partial type - makes all nested properties optional
 */
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Deep readonly type - makes all nested properties readonly
 */
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Extract keys of a specific type
 */
type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

/**
 * Make specific keys required
 */
type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Make specific keys optional
 */
type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
```

---

## Configuration Types

### Client Configuration

```typescript
/**
 * Main client configuration
 */
interface ClientConfig {
  /**
   * Base URL for all API requests
   * @default ''
   */
  baseUrl: string;

  /**
   * Default request timeout in milliseconds
   * @default 30000
   */
  timeout: number;

  /**
   * Enable debug mode for verbose logging
   * @default false
   */
  debug: boolean;

  /**
   * Default headers for all requests
   */
  headers: Record<string, string>;

  /**
   * Retry configuration
   */
  retry: RetryConfig;

  /**
   * Cache configuration
   */
  cache: CacheConfig;
}

/**
 * Retry configuration
 */
interface RetryConfig {
  /**
   * Enable automatic retries
   * @default true
   */
  enabled: boolean;

  /**
   * Maximum number of retry attempts
   * @default 3
   */
  maxRetries: number;

  /**
   * Initial delay between retries in milliseconds
   * @default 1000
   */
  initialDelay: number;

  /**
   * Maximum delay between retries in milliseconds
   * @default 30000
   */
  maxDelay: number;

  /**
   * Exponential backoff factor
   * @default 2
   */
  factor: number;

  /**
   * HTTP status codes that should trigger a retry
   * @default [408, 429, 500, 502, 503, 504]
   */
  retryableStatuses: number[];

  /**
   * Custom function to determine if a request should be retried
   */
  shouldRetry?: (error: RequestError) => boolean;
}

/**
 * Cache configuration
 */
interface CacheConfig {
  /**
   * Enable response caching
   * @default false
   */
  enabled: boolean;

  /**
   * Default cache TTL in milliseconds
   * @default 300000 (5 minutes)
   */
  ttl: number;

  /**
   * Maximum number of cached entries
   * @default 100
   */
  maxSize: number;

  /**
   * Cache storage implementation
   * @default 'memory'
   */
  storage: 'memory' | 'localStorage' | 'sessionStorage' | CacheStorage;
}

/**
 * Custom cache storage interface
 */
interface CacheStorage {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl: number): Promise<void>;
  delete(key: string): Promise<boolean>;
  clear(): Promise<void>;
}
```

---

## Request/Response Types

### Request Types

```typescript
/**
 * HTTP methods
 */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

/**
 * Request configuration
 */
interface RequestConfig<D = unknown> {
  /**
   * HTTP method
   */
  method: HttpMethod;

  /**
   * Request URL or path
   */
  url: string;

  /**
   * URL query parameters
   */
  params?: Record<string, string | number | boolean | undefined>;

  /**
   * Request body data
   */
  data?: D;

  /**
   * Request headers
   */
  headers?: Record<string, string>;

  /**
   * Request timeout in milliseconds
   */
  timeout?: number;

  /**
   * Response type
   * @default 'json'
   */
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer' | 'stream';

  /**
   * Custom status validation
   */
  validateStatus?: (status: number) => boolean;

  /**
   * AbortSignal for request cancellation
   */
  signal?: AbortSignal;

  /**
   * Upload progress callback
   */
  onUploadProgress?: (progress: ProgressEvent) => void;

  /**
   * Download progress callback
   */
  onDownloadProgress?: (progress: ProgressEvent) => void;
}

/**
 * Request options (simplified)
 */
interface RequestOptions {
  params?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
}

/**
 * Progress event
 */
interface ProgressEvent {
  /**
   * Bytes loaded
   */
  loaded: number;

  /**
   * Total bytes (if known)
   */
  total?: number;

  /**
   * Progress percentage (0-100)
   */
  percent: number;
}
```

### Response Types

```typescript
/**
 * API response wrapper
 */
interface Response<T = unknown> {
  /**
   * Response data
   */
  data: T;

  /**
   * HTTP status code
   */
  status: number;

  /**
   * HTTP status text
   */
  statusText: string;

  /**
   * Response headers
   */
  headers: Record<string, string>;

  /**
   * Original request configuration
   */
  config: RequestConfig;

  /**
   * Response metadata
   */
  meta: ResponseMeta;
}

/**
 * Response metadata
 */
interface ResponseMeta {
  /**
   * Request duration in milliseconds
   */
  duration: number;

  /**
   * Number of retry attempts made
   */
  retries: number;

  /**
   * Whether response was served from cache
   */
  cached: boolean;

  /**
   * Request timestamp
   */
  timestamp: number;

  /**
   * Request ID (if available)
   */
  requestId?: string;
}

/**
 * Paginated response
 */
interface PaginatedResponse<T> {
  /**
   * Array of items
   */
  items: T[];

  /**
   * Pagination metadata
   */
  pagination: PaginationMeta;
}

/**
 * Pagination metadata
 */
interface PaginationMeta {
  /**
   * Current page number
   */
  page: number;

  /**
   * Items per page
   */
  perPage: number;

  /**
   * Total number of items
   */
  total: number;

  /**
   * Total number of pages
   */
  totalPages: number;

  /**
   * Has next page
   */
  hasNext: boolean;

  /**
   * Has previous page
   */
  hasPrev: boolean;
}
```

---

## Component Types

### Base Component Types

```typescript
/**
 * Base component props
 */
interface BaseProps {
  /**
   * Component ID
   */
  id?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Inline styles
   */
  style?: CSSProperties;

  /**
   * Data attributes
   */
  data?: Record<string, string>;

  /**
   * ARIA attributes
   */
  aria?: AriaAttributes;
}

/**
 * CSS properties type
 */
type CSSProperties = {
  [K in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[K];
};

/**
 * ARIA attributes
 */
interface AriaAttributes {
  label?: string;
  labelledBy?: string;
  describedBy?: string;
  hidden?: boolean;
  live?: 'off' | 'polite' | 'assertive';
  role?: string;
  expanded?: boolean;
  selected?: boolean;
  disabled?: boolean;
  [key: `aria-${string}`]: string | boolean | undefined;
}

/**
 * Component size variants
 */
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Component color variants
 */
type Color = 
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

/**
 * Component variant
 */
type Variant = 'solid' | 'outlined' | 'ghost' | 'link';
```

### Form Component Types

```typescript
/**
 * Form field props
 */
interface FieldProps<T = string> extends BaseProps {
  /**
   * Field name
   */
  name: string;

  /**
   * Field value
   */
  value?: T;

  /**
   * Default value
   */
  defaultValue?: T;

  /**
   * Change handler
   */
  onChange?: (value: T) => void;

  /**
   * Blur handler
   */
  onBlur?: () => void;

  /**
   * Focus handler
   */
  onFocus?: () => void;

  /**
   * Field is disabled
   */
  disabled?: boolean;

  /**
   * Field is read-only
   */
  readOnly?: boolean;

  /**
   * Field is required
   */
  required?: boolean;

  /**
   * Error message
   */
  error?: string;

  /**
   * Helper text
   */
  helperText?: string;

  /**
   * Field label
   */
  label?: string;

  /**
   * Placeholder text
   */
  placeholder?: string;
}

/**
 * Select option
 */
interface SelectOption<T = string> {
  /**
   * Option value
   */
  value: T;

  /**
   * Display label
   */
  label: string;

  /**
   * Option is disabled
   */
  disabled?: boolean;

  /**
   * Option group
   */
  group?: string;
}

/**
 * Form state
 */
interface FormState<T extends Record<string, unknown>> {
  /**
   * Form values
   */
  values: T;

  /**
   * Field errors
   */
  errors: Partial<Record<keyof T, string>>;

  /**
   * Touched fields
   */
  touched: Partial<Record<keyof T, boolean>>;

  /**
   * Form is submitting
   */
  isSubmitting: boolean;

  /**
   * Form is valid
   */
  isValid: boolean;

  /**
   * Form is dirty (has changes)
   */
  isDirty: boolean;
}
```

---

## Utility Types

### Function Types

```typescript
/**
 * Generic async function
 */
type AsyncFunction<A extends unknown[] = unknown[], R = unknown> = 
  (...args: A) => Promise<R>;

/**
 * Debounced function
 */
interface DebouncedFunction<A extends unknown[], R> {
  (...args: A): R | undefined;
  cancel(): void;
  flush(): R | undefined;
  pending(): boolean;
}

/**
 * Throttled function
 */
interface ThrottledFunction<A extends unknown[], R> {
  (...args: A): R | undefined;
  cancel(): void;
}

/**
 * Comparator function
 */
type Comparator<T> = (a: T, b: T) => number;

/**
 * Predicate function
 */
type Predicate<T> = (value: T, index: number) => boolean;

/**
 * Mapper function
 */
type Mapper<T, U> = (value: T, index: number) => U;

/**
 * Reducer function
 */
type Reducer<T, U> = (accumulator: U, value: T, index: number) => U;
```

### Validation Types

```typescript
/**
 * Validation result
 */
interface ValidationResult<T = unknown> {
  /**
   * Validation passed
   */
  valid: boolean;

  /**
   * Validated data (if valid)
   */
  data: T | null;

  /**
   * Validation errors
   */
  errors: ValidationError[];
}

/**
 * Validation error
 */
interface ValidationError {
  /**
   * Field path (e.g., 'user.email')
   */
  path: string;

  /**
   * Error message
   */
  message: string;

  /**
   * Error code
   */
  code: string;

  /**
   * Additional context
   */
  context?: Record<string, unknown>;
}

/**
 * Validation schema
 */
interface Schema<T = unknown> {
  /**
   * Validate data against schema
   */
  validate(data: unknown): ValidationResult<T>;

  /**
   * Parse data (throws on invalid)
   */
  parse(data: unknown): T;

  /**
   * Safe parse (returns result object)
   */
  safeParse(data: unknown): ValidationResult<T>;
}
```

---

## Event Types

### Event System Types

```typescript
/**
 * Event emitter interface
 */
interface EventEmitter<Events extends Record<string, unknown>> {
  /**
   * Subscribe to an event
   */
  on<K extends keyof Events>(
    event: K,
    handler: EventHandler<Events[K]>
  ): () => void;

  /**
   * Subscribe to an event (once)
   */
  once<K extends keyof Events>(
    event: K,
    handler: EventHandler<Events[K]>
  ): () => void;

  /**
   * Unsubscribe from an event
   */
  off<K extends keyof Events>(
    event: K,
    handler: EventHandler<Events[K]>
  ): void;

  /**
   * Emit an event
   */
  emit<K extends keyof Events>(event: K, payload: Events[K]): void;
}

/**
 * Event handler function
 */
type EventHandler<T = unknown> = (payload: T) => void;

/**
 * Event object
 */
interface Event<T = unknown> {
  /**
   * Event type
   */
  type: string;

  /**
   * Event payload
   */
  payload: T;

  /**
   * Event timestamp
   */
  timestamp: number;

  /**
   * Stop event propagation
   */
  stopPropagation(): void;

  /**
   * Prevent default behavior
   */
  preventDefault(): void;
}

/**
 * Application events map
 */
interface AppEvents {
  'user:login': { userId: string; timestamp: number };
  'user:logout': { userId: string };
  'data:loaded': { key: string; data: unknown };
  'data:error': { key: string; error: Error };
  'notification:show': { message: string; type: 'info' | 'error' | 'success' };
}
```

---

## Type Guards

```typescript
/**
 * Check if value is defined (not null or undefined)
 */
function isDefined<T>(value: T | null | undefined): value is T;

/**
 * Check if value is a string
 */
function isString(value: unknown): value is string;

/**
 * Check if value is a number
 */
function isNumber(value: unknown): value is number;

/**
 * Check if value is an object
 */
function isObject(value: unknown): value is Record<string, unknown>;

/**
 * Check if value is an array
 */
function isArray<T = unknown>(value: unknown): value is T[];

/**
 * Check if value is a function
 */
function isFunction(value: unknown): value is Function;

/**
 * Check if value is a promise
 */
function isPromise<T = unknown>(value: unknown): value is Promise<T>;

/**
 * Check if value is an error
 */
function isError(value: unknown): value is Error;
```

---

## See Also

- [API Overview](README.md)
- [Core API](core.md)
- [Utilities Reference](utilities.md)
