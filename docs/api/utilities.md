# Utility Functions

This document covers the utility functions available in the library.

## Table of Contents

- [String Utilities](#string-utilities)
- [Object Utilities](#object-utilities)
- [Array Utilities](#array-utilities)
- [Async Utilities](#async-utilities)
- [Validation Utilities](#validation-utilities)

---

## String Utilities

### `capitalize(str)`

Capitalizes the first letter of a string.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | String to capitalize |

**Returns:** `string`

**Example:**

```javascript
import { capitalize } from 'your-package-name/utils';

capitalize('hello');      // 'Hello'
capitalize('HELLO');      // 'HELLO'
capitalize('hello world'); // 'Hello world'
```

---

### `slugify(str, options)`

Converts a string to a URL-friendly slug.

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `str` | `string` | Yes | - | String to slugify |
| `options` | `SlugifyOptions` | No | `{}` | Slugify options |
| `options.separator` | `string` | No | `'-'` | Word separator |
| `options.lowercase` | `boolean` | No | `true` | Convert to lowercase |
| `options.strict` | `boolean` | No | `true` | Remove special characters |

**Returns:** `string`

**Example:**

```javascript
import { slugify } from 'your-package-name/utils';

slugify('Hello World');           // 'hello-world'
slugify('Hello World', { separator: '_' }); // 'hello_world'
slugify('Über Café', { strict: true });     // 'uber-cafe'
```

---

### `truncate(str, length, options)`

Truncates a string to a specified length.

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `str` | `string` | Yes | - | String to truncate |
| `length` | `number` | Yes | - | Maximum length |
| `options` | `TruncateOptions` | No | `{}` | Truncate options |
| `options.suffix` | `string` | No | `'...'` | Suffix to append |
| `options.wordBoundary` | `boolean` | No | `false` | Break at word boundary |

**Returns:** `string`

**Example:**

```javascript
import { truncate } from 'your-package-name/utils';

truncate('Hello World', 8);                    // 'Hello...'
truncate('Hello World', 8, { suffix: '…' });   // 'Hello W…'
truncate('Hello World', 8, { wordBoundary: true }); // 'Hello...'
```

---

## Object Utilities

### `deepClone(obj)`

Creates a deep clone of an object.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `obj` | `T` | Yes | Object to clone |

**Returns:** `T`

**Example:**

```javascript
import { deepClone } from 'your-package-name/utils';

const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);

cloned.b.c = 3;
console.log(original.b.c); // 2 (unchanged)
console.log(cloned.b.c);   // 3
```

---

### `deepMerge(target, ...sources)`

Deep merges multiple objects into a target object.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `target` | `object` | Yes | Target object |
| `sources` | `object[]` | Yes | Source objects to merge |

**Returns:** `object`

**Example:**

```javascript
import { deepMerge } from 'your-package-name/utils';

const defaults = { a: 1, b: { c: 2, d: 3 } };
const overrides = { b: { c: 4 }, e: 5 };

const merged = deepMerge({}, defaults, overrides);
// { a: 1, b: { c: 4, d: 3 }, e: 5 }
```

---

### `pick(obj, keys)`

Creates an object with only the specified keys.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `obj` | `T` | Yes | Source object |
| `keys` | `K[]` | Yes | Keys to pick |

**Returns:** `Pick<T, K>`

**Example:**

```javascript
import { pick } from 'your-package-name/utils';

const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' };
const publicUser = pick(user, ['id', 'name', 'email']);
// { id: 1, name: 'John', email: 'john@example.com' }
```

---

### `omit(obj, keys)`

Creates an object without the specified keys.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `obj` | `T` | Yes | Source object |
| `keys` | `K[]` | Yes | Keys to omit |

**Returns:** `Omit<T, K>`

**Example:**

```javascript
import { omit } from 'your-package-name/utils';

const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' };
const safeUser = omit(user, ['password']);
// { id: 1, name: 'John', email: 'john@example.com' }
```

---

## Array Utilities

### `unique(array, key)`

Returns unique elements from an array.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `T[]` | Yes | Input array |
| `key` | `keyof T \| ((item: T) => unknown)` | No | Key or function for uniqueness check |

**Returns:** `T[]`

**Example:**

```javascript
import { unique } from 'your-package-name/utils';

// Primitive values
unique([1, 2, 2, 3, 3, 3]); // [1, 2, 3]

// By key
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John Doe' }
];
unique(users, 'id'); // [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]

// By function
unique(users, u => u.id); // Same result
```

---

### `groupBy(array, key)`

Groups array elements by a key.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `T[]` | Yes | Input array |
| `key` | `keyof T \| ((item: T) => string)` | Yes | Grouping key or function |

**Returns:** `Record<string, T[]>`

**Example:**

```javascript
import { groupBy } from 'your-package-name/utils';

const users = [
  { name: 'John', role: 'admin' },
  { name: 'Jane', role: 'user' },
  { name: 'Bob', role: 'admin' }
];

const byRole = groupBy(users, 'role');
// {
//   admin: [{ name: 'John', role: 'admin' }, { name: 'Bob', role: 'admin' }],
//   user: [{ name: 'Jane', role: 'user' }]
// }
```

---

### `chunk(array, size)`

Splits an array into chunks of specified size.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `T[]` | Yes | Input array |
| `size` | `number` | Yes | Chunk size |

**Returns:** `T[][]`

**Example:**

```javascript
import { chunk } from 'your-package-name/utils';

chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
chunk([1, 2, 3, 4, 5, 6], 3); // [[1, 2, 3], [4, 5, 6]]
```

---

## Async Utilities

### `sleep(ms)`

Pauses execution for the specified duration.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ms` | `number` | Yes | Duration in milliseconds |

**Returns:** `Promise<void>`

**Example:**

```javascript
import { sleep } from 'your-package-name/utils';

console.log('Starting...');
await sleep(1000);
console.log('1 second later...');
```

---

### `retry(fn, options)`

Retries a function with exponential backoff.

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fn` | `() => Promise<T>` | Yes | - | Function to retry |
| `options` | `RetryOptions` | No | `{}` | Retry options |
| `options.maxRetries` | `number` | No | `3` | Maximum retry attempts |
| `options.delay` | `number` | No | `1000` | Initial delay (ms) |
| `options.factor` | `number` | No | `2` | Backoff factor |
| `options.shouldRetry` | `(error: Error) => boolean` | No | `() => true` | Retry condition |

**Returns:** `Promise<T>`

**Example:**

```javascript
import { retry } from 'your-package-name/utils';

const result = await retry(
  () => fetchData('/api/unstable-endpoint'),
  {
    maxRetries: 5,
    delay: 1000,
    factor: 2,
    shouldRetry: (error) => error.status >= 500
  }
);
```

---

### `debounce(fn, wait, options)`

Creates a debounced version of a function.

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fn` | `(...args: A) => R` | Yes | - | Function to debounce |
| `wait` | `number` | Yes | - | Debounce delay (ms) |
| `options` | `DebounceOptions` | No | `{}` | Options |
| `options.leading` | `boolean` | No | `false` | Invoke on leading edge |
| `options.trailing` | `boolean` | No | `true` | Invoke on trailing edge |

**Returns:** `DebouncedFunction<A, R>`

**Example:**

```javascript
import { debounce } from 'your-package-name/utils';

const debouncedSearch = debounce(
  (query) => searchAPI(query),
  300
);

// In an input handler
input.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// Cancel pending invocation
debouncedSearch.cancel();
```

---

### `throttle(fn, wait)`

Creates a throttled version of a function.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fn` | `(...args: A) => R` | Yes | Function to throttle |
| `wait` | `number` | Yes | Throttle interval (ms) |

**Returns:** `ThrottledFunction<A, R>`

**Example:**

```javascript
import { throttle } from 'your-package-name/utils';

const throttledScroll = throttle(
  () => updateScrollPosition(),
  100
);

window.addEventListener('scroll', throttledScroll);
```

---

## Validation Utilities

### `isEmail(value)`

Validates if a string is a valid email address.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `string` | Yes | Value to validate |

**Returns:** `boolean`

**Example:**

```javascript
import { isEmail } from 'your-package-name/utils';

isEmail('user@example.com');  // true
isEmail('invalid-email');      // false
isEmail('user@.com');          // false
```

---

### `isURL(value, options)`

Validates if a string is a valid URL.

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `value` | `string` | Yes | - | Value to validate |
| `options` | `URLValidationOptions` | No | `{}` | Validation options |
| `options.protocols` | `string[]` | No | `['http', 'https']` | Allowed protocols |
| `options.requireProtocol` | `boolean` | No | `true` | Require protocol prefix |

**Returns:** `boolean`

**Example:**

```javascript
import { isURL } from 'your-package-name/utils';

isURL('https://example.com');                           // true
isURL('ftp://files.example.com', { protocols: ['ftp'] }); // true
isURL('example.com');                                    // false
isURL('example.com', { requireProtocol: false });        // true
```

---

### `isEmpty(value)`

Checks if a value is empty (null, undefined, empty string, empty array, or empty object).

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `unknown` | Yes | Value to check |

**Returns:** `boolean`

**Example:**

```javascript
import { isEmpty } from 'your-package-name/utils';

isEmpty(null);       // true
isEmpty(undefined);  // true
isEmpty('');         // true
isEmpty([]);         // true
isEmpty({});         // true
isEmpty('hello');    // false
isEmpty([1, 2, 3]);  // false
isEmpty({ a: 1 });   // false
isEmpty(0);          // false
isEmpty(false);      // false
```

---

## See Also

- [API Overview](README.md)
- [Core API](core.md)
- [Type Definitions](types.md)
