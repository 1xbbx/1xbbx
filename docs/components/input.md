# Input Component

The Input component is used to capture user text input.

## Import

```javascript
import { Input } from 'your-component-library';
```

## Usage

### Basic Input

```jsx
<Input placeholder="Enter your name" />
```

### With Label

```jsx
<Input 
  label="Email"
  type="email"
  placeholder="you@example.com"
/>
```

### Input Types

```jsx
<Input type="text" placeholder="Text input" />
<Input type="email" placeholder="Email input" />
<Input type="password" placeholder="Password input" />
<Input type="number" placeholder="Number input" />
<Input type="tel" placeholder="Phone input" />
<Input type="url" placeholder="URL input" />
<Input type="search" placeholder="Search input" />
```

### Input Sizes

```jsx
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium (default)" />
<Input size="lg" placeholder="Large" />
```

### With Helper Text

```jsx
<Input
  label="Username"
  placeholder="Choose a username"
  helperText="Your username must be 3-20 characters long"
/>
```

### Error State

```jsx
// Boolean error (shows red border)
<Input
  label="Email"
  error={true}
  placeholder="Enter email"
/>

// Error message
<Input
  label="Email"
  error="Please enter a valid email address"
  placeholder="Enter email"
/>
```

### With Left/Right Elements

```jsx
import { SearchIcon, EmailIcon, CheckIcon } from 'your-icon-library';

// Left icon
<Input
  leftElement={<SearchIcon />}
  placeholder="Search..."
/>

// Right icon
<Input
  rightElement={<CheckIcon color="green" />}
  placeholder="Validated input"
/>

// Left addon text
<Input
  leftElement={<span>https://</span>}
  placeholder="your-site.com"
/>

// Right addon text
<Input
  rightElement={<span>.com</span>}
  placeholder="domain"
/>

// Both sides
<Input
  leftElement={<EmailIcon />}
  rightElement={<span>@company.com</span>}
  placeholder="username"
/>
```

### Disabled and Read-Only

```jsx
// Disabled
<Input
  label="Disabled"
  value="Cannot edit"
  disabled
/>

// Read-only
<Input
  label="Read-only"
  value="Can select but not edit"
  readOnly
/>
```

### Required Field

```jsx
<Input
  label="Full Name"
  required
  placeholder="Enter your full name"
/>
```

### Controlled Input

```jsx
function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <Input
      value={value}
      onChange={(val) => setValue(val)}
      placeholder="Controlled input"
    />
  );
}
```

### With Validation

```jsx
function ValidatedInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (value) => {
    if (!value) {
      setError('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Please enter a valid email');
    } else {
      setError('');
    }
  };

  return (
    <Input
      type="email"
      label="Email"
      value={email}
      onChange={(val) => {
        setEmail(val);
        validateEmail(val);
      }}
      onBlur={() => validateEmail(email)}
      error={error}
      placeholder="you@example.com"
    />
  );
}
```

### Password Input with Toggle

```jsx
function PasswordInput() {
  const [show, setShow] = useState(false);

  return (
    <Input
      type={show ? 'text' : 'password'}
      label="Password"
      placeholder="Enter password"
      rightElement={
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShow(!show)}
        >
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </Button>
      }
    />
  );
}
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'` | Input type |
| `value` | `string` | - | Controlled value |
| `defaultValue` | `string` | - | Default value for uncontrolled |
| `placeholder` | `string` | - | Placeholder text |
| `label` | `string` | - | Input label |
| `helperText` | `string` | - | Helper text below input |
| `error` | `string \| boolean` | - | Error state or message |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `disabled` | `boolean` | `false` | Disable input |
| `readOnly` | `boolean` | `false` | Read-only mode |
| `required` | `boolean` | `false` | Mark as required |
| `autoFocus` | `boolean` | `false` | Auto focus on mount |
| `autoComplete` | `string` | - | Autocomplete attribute |
| `leftElement` | `ReactNode` | - | Element on the left |
| `rightElement` | `ReactNode` | - | Element on the right |
| `onChange` | `(value: string, event: ChangeEvent) => void` | - | Change handler |
| `onFocus` | `(event: FocusEvent) => void` | - | Focus handler |
| `onBlur` | `(event: FocusEvent) => void` | - | Blur handler |
| `onKeyDown` | `(event: KeyboardEvent) => void` | - | Key down handler |
| `onKeyUp` | `(event: KeyboardEvent) => void` | - | Key up handler |

---

## Accessibility

The Input component follows WAI-ARIA guidelines:

- Properly associates labels with inputs using `htmlFor`/`id`
- Error messages are linked via `aria-describedby`
- Required fields have `aria-required="true"`
- Invalid fields have `aria-invalid="true"`

### Best Practices

```jsx
// ✅ Good: Input with label
<Input label="Email" type="email" />

// ❌ Bad: Input without label (use aria-label if no visible label)
<Input type="email" />

// ✅ Good: Input with aria-label
<Input
  type="search"
  placeholder="Search..."
  aria-label="Search products"
/>

// ✅ Good: Error linked to input
<Input
  label="Password"
  error="Password must be at least 8 characters"
  aria-describedby="password-error"
/>
```

---

## Customization

### Using CSS Variables

```css
:root {
  --input-border-radius: 8px;
  --input-border-color: #e2e8f0;
  --input-focus-border-color: #3182ce;
  --input-error-border-color: #e53e3e;
  --input-bg: #ffffff;
  --input-placeholder-color: #a0aec0;
}
```

### Custom Styles

```jsx
// Using className
<Input className="my-custom-input" />

// Using style prop
<Input style={{ borderRadius: '20px' }} />
```

### Extending Theme

```jsx
import { extendTheme } from 'your-component-library';

const theme = extendTheme({
  components: {
    Input: {
      baseStyle: {
        field: {
          borderRadius: 'md',
          _focus: {
            boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.6)',
          },
        },
      },
      sizes: {
        md: {
          field: {
            h: '40px',
            fontSize: 'md',
          },
        },
      },
      variants: {
        filled: {
          field: {
            bg: 'gray.100',
            _hover: { bg: 'gray.200' },
            _focus: { bg: 'white', borderColor: 'primary.500' },
          },
        },
      },
      defaultProps: {
        size: 'md',
        variant: 'outline',
      },
    },
  },
});
```

---

## Examples

### Login Form

```jsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      await login({ email, password });
    } catch (error) {
      setErrors({ password: 'Invalid email or password' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          error={errors.email}
          autoComplete="email"
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          error={errors.password}
          autoComplete="current-password"
          required
        />
        <Button type="submit" loading={isLoading} fullWidth>
          Sign In
        </Button>
      </Stack>
    </form>
  );
}
```

### Search with Debounce

```jsx
function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('');
  
  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        onSearch(query);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <Input
      type="search"
      placeholder="Search products..."
      leftElement={<SearchIcon />}
      rightElement={
        query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuery('')}
          >
            <CloseIcon />
          </Button>
        )
      }
      value={query}
      onChange={setQuery}
    />
  );
}
```

### Credit Card Input

```jsx
function CreditCardInput() {
  const [cardNumber, setCardNumber] = useState('');

  const formatCardNumber = (value) => {
    // Remove non-digits
    const cleaned = value.replace(/\D/g, '');
    // Add spaces every 4 digits
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.slice(0, 19); // Max 16 digits + 3 spaces
  };

  return (
    <Input
      label="Card Number"
      placeholder="1234 5678 9012 3456"
      leftElement={<CreditCardIcon />}
      value={cardNumber}
      onChange={(val) => setCardNumber(formatCardNumber(val))}
      maxLength={19}
      autoComplete="cc-number"
    />
  );
}
```

---

## Related Components

- [Textarea](textarea.md) - Multi-line text input
- [Select](select.md) - Dropdown selection
- [InputGroup](input-group.md) - Group related inputs
- [Form](form.md) - Form container with validation
