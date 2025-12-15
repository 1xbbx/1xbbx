# Modal Component

The Modal component displays content in a layer above the main page content.

## Import

```javascript
import { 
  Modal, 
  ModalOverlay,
  ModalContent,
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  ModalCloseButton 
} from 'your-component-library';
```

## Usage

### Basic Modal

```jsx
function BasicModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>
          <p>This is the modal content.</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

### Modal Sizes

```jsx
// Available sizes: xs, sm, md, lg, xl, full
<Modal size="sm" isOpen={isOpen} onClose={onClose}>
  <ModalHeader>Small Modal</ModalHeader>
  <ModalBody>Content here</ModalBody>
</Modal>

<Modal size="xl" isOpen={isOpen} onClose={onClose}>
  <ModalHeader>Extra Large Modal</ModalHeader>
  <ModalBody>Content here</ModalBody>
</Modal>

<Modal size="full" isOpen={isOpen} onClose={onClose}>
  <ModalHeader>Full Screen Modal</ModalHeader>
  <ModalBody>Content here</ModalBody>
</Modal>
```

### Centered Modal

```jsx
<Modal isOpen={isOpen} onClose={onClose} centered>
  <ModalHeader>Centered Modal</ModalHeader>
  <ModalBody>
    This modal is vertically centered on the screen.
  </ModalBody>
</Modal>
```

### With Close Button

```jsx
<Modal isOpen={isOpen} onClose={onClose}>
  <ModalCloseButton />
  <ModalHeader>Modal with Close Button</ModalHeader>
  <ModalBody>
    Click the X button or press Escape to close.
  </ModalBody>
</Modal>
```

### Scrolling Behavior

```jsx
// Scroll inside modal (default)
<Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
  <ModalHeader>Scrollable Content</ModalHeader>
  <ModalBody>
    {/* Long content that scrolls within the modal body */}
  </ModalBody>
</Modal>

// Scroll outside modal (whole modal scrolls)
<Modal isOpen={isOpen} onClose={onClose} scrollBehavior="outside">
  <ModalHeader>Scrollable Modal</ModalHeader>
  <ModalBody>
    {/* Long content */}
  </ModalBody>
</Modal>
```

### Prevent Close on Overlay Click

```jsx
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  closeOnOverlayClick={false}
>
  <ModalHeader>Persistent Modal</ModalHeader>
  <ModalBody>
    This modal can only be closed using the close button.
  </ModalBody>
  <ModalFooter>
    <Button onClick={onClose}>Close</Button>
  </ModalFooter>
</Modal>
```

### Prevent Close on Escape Key

```jsx
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  closeOnEsc={false}
>
  <ModalHeader>No Escape Close</ModalHeader>
  <ModalBody>
    Pressing Escape will not close this modal.
  </ModalBody>
</Modal>
```

### Initial Focus

```jsx
function ModalWithInitialFocus() {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open</Button>
      
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        initialFocusRef={inputRef}
      >
        <ModalHeader>Create Account</ModalHeader>
        <ModalBody>
          <Input ref={inputRef} placeholder="Username" />
          <Input type="email" placeholder="Email" />
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button color="primary">Create</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

### Final Focus

```jsx
function ModalWithFinalFocus() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Button ref={buttonRef}>Focus returns here</Button>
      
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        finalFocusRef={buttonRef}
      >
        <ModalHeader>Modal</ModalHeader>
        <ModalBody>
          When closed, focus will return to the specified button.
        </ModalBody>
      </Modal>
    </>
  );
}
```

---

## Props

### Modal Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | Controls modal visibility |
| `onClose` | `() => void` | - | Called when modal should close |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Modal size |
| `centered` | `boolean` | `false` | Center modal vertically |
| `scrollBehavior` | `'inside' \| 'outside'` | `'outside'` | Scroll behavior |
| `closeOnOverlayClick` | `boolean` | `true` | Close on overlay click |
| `closeOnEsc` | `boolean` | `true` | Close on Escape key |
| `initialFocusRef` | `RefObject` | - | Element to focus on open |
| `finalFocusRef` | `RefObject` | - | Element to focus on close |
| `preserveScrollBarGap` | `boolean` | `true` | Prevent layout shift |
| `blockScrollOnMount` | `boolean` | `true` | Block body scroll |
| `motionPreset` | `'slideInBottom' \| 'slideInRight' \| 'scale' \| 'none'` | `'scale'` | Animation preset |

### ModalHeader Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Header content |

### ModalBody Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Body content |

### ModalFooter Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Footer content |
| `justify` | `'start' \| 'center' \| 'end' \| 'between'` | `'end'` | Justify content |

### ModalCloseButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |

---

## Accessibility

The Modal component follows WAI-ARIA dialog pattern:

- Sets `role="dialog"` and `aria-modal="true"`
- Traps focus within the modal when open
- Returns focus to trigger element when closed
- Closes on Escape key press (configurable)
- Body scroll is locked when modal is open

### ARIA Attributes

```jsx
<Modal 
  isOpen={isOpen} 
  onClose={onClose}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <ModalHeader id="modal-title">Confirm Action</ModalHeader>
  <ModalBody id="modal-description">
    Are you sure you want to proceed?
  </ModalBody>
</Modal>
```

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Move focus to next focusable element |
| `Shift + Tab` | Move focus to previous focusable element |
| `Escape` | Close the modal (if enabled) |

---

## Customization

### Custom Overlay

```jsx
<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay 
    bg="blackAlpha.600"
    backdropFilter="blur(10px)"
  />
  <ModalContent>
    <ModalHeader>Custom Overlay</ModalHeader>
    <ModalBody>Content with blurred background</ModalBody>
  </ModalContent>
</Modal>
```

### Custom Styling

```jsx
<Modal isOpen={isOpen} onClose={onClose}>
  <ModalContent
    bg="gray.900"
    color="white"
    borderRadius="xl"
    boxShadow="2xl"
  >
    <ModalHeader borderBottom="1px solid" borderColor="gray.700">
      Dark Modal
    </ModalHeader>
    <ModalBody>
      Custom styled modal content
    </ModalBody>
  </ModalContent>
</Modal>
```

### Extending Theme

```jsx
import { extendTheme } from 'your-component-library';

const theme = extendTheme({
  components: {
    Modal: {
      baseStyle: {
        overlay: {
          bg: 'blackAlpha.700',
        },
        dialog: {
          borderRadius: 'lg',
          boxShadow: 'xl',
        },
        header: {
          fontSize: 'xl',
          fontWeight: 'bold',
        },
        body: {
          py: 4,
        },
        footer: {
          borderTop: '1px solid',
          borderColor: 'gray.100',
          pt: 4,
        },
      },
      sizes: {
        md: {
          dialog: {
            maxW: '500px',
          },
        },
      },
    },
  },
});
```

---

## Examples

### Confirmation Dialog

```jsx
function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} centered size="sm">
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button 
          color="error" 
          onClick={handleConfirm}
          loading={isLoading}
        >
          Confirm
        </Button>
      </ModalFooter>
    </Modal>
  );
}

// Usage
<ConfirmDialog
  isOpen={showConfirm}
  onClose={() => setShowConfirm(false)}
  onConfirm={handleDelete}
  title="Delete Item?"
  message="This action cannot be undone."
/>
```

### Form Modal

```jsx
function CreateUserModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      onClose();
      setFormData({ name: '', email: '', role: 'user' });
    } catch (error) {
      setErrors(error.errors || {});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      initialFocusRef={initialRef}
    >
      <ModalCloseButton />
      <ModalHeader>Create New User</ModalHeader>
      
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <Stack spacing={4}>
            <Input
              ref={initialRef}
              label="Name"
              value={formData.name}
              onChange={(val) => setFormData(prev => ({ ...prev, name: val }))}
              error={errors.name}
              required
            />
            <Input
              type="email"
              label="Email"
              value={formData.email}
              onChange={(val) => setFormData(prev => ({ ...prev, email: val }))}
              error={errors.email}
              required
            />
            <Select
              label="Role"
              value={formData.role}
              onChange={(val) => setFormData(prev => ({ ...prev, role: val }))}
              options={[
                { value: 'user', label: 'User' },
                { value: 'admin', label: 'Admin' },
                { value: 'moderator', label: 'Moderator' },
              ]}
            />
          </Stack>
        </ModalBody>
        
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            color="primary"
            loading={isSubmitting}
          >
            Create User
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
```

### Image Lightbox

```jsx
function ImageLightbox({ src, alt, isOpen, onClose }) {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="xl"
      centered
    >
      <ModalOverlay bg="blackAlpha.900" />
      <ModalContent bg="transparent" boxShadow="none">
        <ModalCloseButton color="white" />
        <ModalBody p={0}>
          <img 
            src={src} 
            alt={alt} 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '90vh',
              objectFit: 'contain' 
            }} 
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
```

### Nested Modals

```jsx
function NestedModals() {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);

  return (
    <>
      <Button onClick={() => setShowFirst(true)}>Open First Modal</Button>
      
      <Modal isOpen={showFirst} onClose={() => setShowFirst(false)}>
        <ModalHeader>First Modal</ModalHeader>
        <ModalBody>
          <Button onClick={() => setShowSecond(true)}>
            Open Second Modal
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setShowFirst(false)}>Close</Button>
        </ModalFooter>
      </Modal>
      
      <Modal isOpen={showSecond} onClose={() => setShowSecond(false)} size="sm">
        <ModalHeader>Second Modal</ModalHeader>
        <ModalBody>
          This is a nested modal.
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setShowSecond(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

---

## Related Components

- [AlertDialog](alert-dialog.md) - For confirmation dialogs
- [Drawer](drawer.md) - Side panel overlay
- [Popover](popover.md) - Small overlays anchored to elements
