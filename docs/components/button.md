# Button Component

The Button component is used to trigger actions and events.

## Import

```javascript
import { Button } from 'your-component-library';
```

## Usage

### Basic Button

```jsx
<Button>Click me</Button>
```

### Button Variants

The button comes in four variants: `solid`, `outlined`, `ghost`, and `link`.

```jsx
<Button variant="solid">Solid</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### Button Colors

```jsx
<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="success">Success</Button>
<Button color="warning">Warning</Button>
<Button color="error">Error</Button>
<Button color="neutral">Neutral</Button>
```

### Button Sizes

```jsx
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

### With Icons

```jsx
import { PlusIcon, ArrowRightIcon, DownloadIcon } from 'your-icon-library';

// Left icon
<Button leftIcon={<PlusIcon />}>Add Item</Button>

// Right icon
<Button rightIcon={<ArrowRightIcon />}>Continue</Button>

// Both icons
<Button leftIcon={<DownloadIcon />} rightIcon={<ArrowRightIcon />}>
  Download
</Button>

// Icon only
<Button aria-label="Add item">
  <PlusIcon />
</Button>
```

### Loading State

```jsx
// Loading with text
<Button loading>Submitting...</Button>

// Loading with custom spinner text
<Button loading loadingText="Please wait...">Submit</Button>

// Loading without text
<Button loading loadingText="">
  <Spinner />
</Button>
```

### Disabled State

```jsx
<Button disabled>Disabled Button</Button>
<Button disabled variant="outlined">Disabled Outlined</Button>
```

### Full Width

```jsx
<Button fullWidth>Full Width Button</Button>
```

### Button Group

```jsx
import { ButtonGroup } from 'your-component-library';

<ButtonGroup>
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>

// Attached buttons
<ButtonGroup attached>
  <Button>Left</Button>
  <Button>Center</Button>
  <Button>Right</Button>
</ButtonGroup>

// Vertical group
<ButtonGroup orientation="vertical">
  <Button>Top</Button>
  <Button>Middle</Button>
  <Button>Bottom</Button>
</ButtonGroup>
```

### As Link

```jsx
// As anchor tag
<Button as="a" href="/dashboard">
  Go to Dashboard
</Button>

// With React Router
import { Link } from 'react-router-dom';

<Button as={Link} to="/dashboard">
  Go to Dashboard
</Button>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'solid' \| 'outlined' \| 'ghost' \| 'link'` | `'solid'` | The visual style of the button |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'neutral'` | `'primary'` | The color scheme |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | The size of the button |
| `disabled` | `boolean` | `false` | If true, the button will be disabled |
| `loading` | `boolean` | `false` | If true, shows a loading spinner |
| `loadingText` | `string` | - | Text to show while loading |
| `fullWidth` | `boolean` | `false` | If true, button will take full width |
| `leftIcon` | `ReactNode` | - | Element to show on the left side |
| `rightIcon` | `ReactNode` | - | Element to show on the right side |
| `as` | `ElementType` | `'button'` | The element or component to render as |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | The HTML button type |
| `onClick` | `(event: MouseEvent) => void` | - | Click event handler |
| `onFocus` | `(event: FocusEvent) => void` | - | Focus event handler |
| `onBlur` | `(event: FocusEvent) => void` | - | Blur event handler |

---

## Accessibility

The Button component follows WAI-ARIA guidelines:

- Uses native `<button>` element by default for proper keyboard navigation
- Supports `aria-label` for icon-only buttons
- Disabled buttons are not focusable when using `disabled` prop
- Loading state adds `aria-busy="true"` attribute

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Enter` | Activates the button |
| `Space` | Activates the button |
| `Tab` | Moves focus to the button |

### Best Practices

```jsx
// ✅ Good: Icon button with aria-label
<Button aria-label="Close dialog">
  <CloseIcon />
</Button>

// ❌ Bad: Icon button without aria-label
<Button>
  <CloseIcon />
</Button>

// ✅ Good: Descriptive button text
<Button>Save Changes</Button>

// ❌ Bad: Vague button text
<Button>Click Here</Button>
```

---

## Customization

### Using CSS Variables

```css
:root {
  --button-border-radius: 8px;
  --button-font-weight: 600;
  --button-transition: all 0.2s ease;
}
```

### Custom Styles

```jsx
// Using className
<Button className="my-custom-button">Custom</Button>

// Using style prop
<Button style={{ borderRadius: '9999px' }}>Rounded</Button>

// Using styled-components
const CustomButton = styled(Button)`
  background: linear-gradient(to right, #667eea, #764ba2);
  border: none;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;
```

### Extending Theme

```jsx
import { extendTheme } from 'your-component-library';

const theme = extendTheme({
  components: {
    Button: {
      // Base styles
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'lg',
      },
      // Size variants
      sizes: {
        xl: {
          h: '56px',
          fontSize: 'lg',
          px: '32px',
        },
      },
      // Color variants
      variants: {
        solid: (props) => ({
          bg: `${props.color}.500`,
          color: 'white',
          _hover: {
            bg: `${props.color}.600`,
          },
        }),
        // Custom variant
        gradient: {
          bg: 'linear-gradient(to right, #667eea, #764ba2)',
          color: 'white',
          _hover: {
            opacity: 0.9,
          },
        },
      },
      // Default props
      defaultProps: {
        size: 'md',
        variant: 'solid',
        color: 'primary',
      },
    },
  },
});
```

---

## Examples

### Form Submit Button

```jsx
function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitForm(formData);
      toast({ status: 'success', title: 'Message sent!' });
    } catch (error) {
      toast({ status: 'error', title: 'Failed to send message' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <Button 
        type="submit" 
        loading={isSubmitting}
        loadingText="Sending..."
        fullWidth
      >
        Send Message
      </Button>
    </form>
  );
}
```

### Confirmation Dialog

```jsx
function DeleteButton({ onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete();
    setIsDeleting(false);
    setIsOpen(false);
  };

  return (
    <>
      <Button 
        color="error" 
        variant="outlined"
        onClick={() => setIsOpen(true)}
      >
        Delete
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure? This action cannot be undone.
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button 
            color="error" 
            onClick={handleDelete}
            loading={isDeleting}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

### Social Login Buttons

```jsx
function SocialLogin() {
  return (
    <Stack spacing={3}>
      <Button 
        leftIcon={<GoogleIcon />}
        variant="outlined"
        fullWidth
      >
        Continue with Google
      </Button>
      <Button 
        leftIcon={<GithubIcon />}
        variant="outlined"
        fullWidth
      >
        Continue with GitHub
      </Button>
      <Button 
        leftIcon={<TwitterIcon />}
        variant="outlined"
        fullWidth
      >
        Continue with Twitter
      </Button>
    </Stack>
  );
}
```

---

## See Also

- [ButtonGroup Component](button-group.md)
- [IconButton Component](icon-button.md)
- [Form Components](../guides/forms.md)
