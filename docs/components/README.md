# Components

This document provides comprehensive documentation for all UI components.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Basic Components](#basic-components)
- [Form Components](#form-components)
- [Layout Components](#layout-components)
- [Feedback Components](#feedback-components)
- [Navigation Components](#navigation-components)
- [Theming](#theming)

---

## Overview

Our component library provides a set of reusable, accessible, and customizable UI components.

### Key Features

- 🎨 **Themeable**: Full theming support with CSS variables
- ♿ **Accessible**: WAI-ARIA compliant components
- 📱 **Responsive**: Mobile-first responsive design
- 🔧 **Customizable**: Extensive prop-based customization
- 📦 **Tree-shakeable**: Import only what you need

---

## Installation

```bash
npm install your-component-library
```

### Basic Setup

```javascript
import { ThemeProvider, Button, Input } from 'your-component-library';
import 'your-component-library/styles.css';

function App() {
  return (
    <ThemeProvider theme="light">
      <Button>Click me</Button>
    </ThemeProvider>
  );
}
```

---

## Basic Components

### Button

A versatile button component with multiple variants and sizes.

**Import:**

```javascript
import { Button } from 'your-component-library';
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'solid' \| 'outlined' \| 'ghost' \| 'link'` | `'solid'` | Button style variant |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Color scheme |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disable the button |
| `loading` | `boolean` | `false` | Show loading state |
| `fullWidth` | `boolean` | `false` | Expand to full width |
| `leftIcon` | `ReactNode` | - | Icon on the left |
| `rightIcon` | `ReactNode` | - | Icon on the right |
| `onClick` | `(event: MouseEvent) => void` | - | Click handler |

**Examples:**

```jsx
// Basic variants
<Button variant="solid">Solid Button</Button>
<Button variant="outlined">Outlined Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="link">Link Button</Button>

// Colors
<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="success">Success</Button>
<Button color="warning">Warning</Button>
<Button color="error">Error</Button>

// Sizes
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// With icons
<Button leftIcon={<PlusIcon />}>Add Item</Button>
<Button rightIcon={<ArrowRightIcon />}>Continue</Button>

// Loading state
<Button loading>Submitting...</Button>

// Full width
<Button fullWidth>Full Width Button</Button>
```

---

### Icon

Render SVG icons with consistent styling.

**Import:**

```javascript
import { Icon } from 'your-component-library';
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | Icon name from icon set |
| `size` | `number \| string` | `24` | Icon size |
| `color` | `string` | `'currentColor'` | Icon color |
| `strokeWidth` | `number` | `2` | Stroke width for line icons |

**Example:**

```jsx
<Icon name="home" size={24} color="primary" />
<Icon name="settings" size="32px" />
<Icon name="user" strokeWidth={1.5} />
```

---

### Badge

Display small count or status indicators.

**Import:**

```javascript
import { Badge } from 'your-component-library';
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `Color` | `'primary'` | Badge color |
| `variant` | `'solid' \| 'outlined' \| 'dot'` | `'solid'` | Badge variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| `count` | `number` | - | Number to display |
| `max` | `number` | `99` | Maximum count (shows 99+) |
| `showZero` | `boolean` | `false` | Show badge when count is 0 |

**Example:**

```jsx
// Basic badge
<Badge>New</Badge>

// Count badge
<Badge count={5}>
  <Button>Notifications</Button>
</Badge>

// With max
<Badge count={150} max={99}>
  <Button>Messages</Button>
</Badge>

// Dot variant
<Badge variant="dot" color="error">
  <Icon name="bell" />
</Badge>
```

---

## Form Components

### Input

Text input field with validation support.

**Import:**

```javascript
import { Input } from 'your-component-library';
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url'` | `'text'` | Input type |
| `value` | `string` | - | Controlled value |
| `defaultValue` | `string` | - | Default value |
| `placeholder` | `string` | - | Placeholder text |
| `label` | `string` | - | Label text |
| `helperText` | `string` | - | Helper text below input |
| `error` | `string \| boolean` | - | Error state/message |
| `disabled` | `boolean` | `false` | Disable input |
| `readOnly` | `boolean` | `false` | Read-only mode |
| `required` | `boolean` | `false` | Mark as required |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `leftElement` | `ReactNode` | - | Element on the left |
| `rightElement` | `ReactNode` | - | Element on the right |
| `onChange` | `(value: string, event: ChangeEvent) => void` | - | Change handler |
| `onFocus` | `(event: FocusEvent) => void` | - | Focus handler |
| `onBlur` | `(event: FocusEvent) => void` | - | Blur handler |

**Examples:**

```jsx
// Basic input
<Input placeholder="Enter your name" />

// With label
<Input label="Email" type="email" placeholder="you@example.com" />

// With error
<Input 
  label="Password" 
  type="password"
  error="Password must be at least 8 characters" 
/>

// With helper text
<Input 
  label="Username"
  helperText="Your username will be visible to other users"
/>

// With left/right elements
<Input 
  leftElement={<Icon name="search" />}
  placeholder="Search..."
/>
<Input 
  type="number"
  rightElement={<span>USD</span>}
/>

// Controlled
const [value, setValue] = useState('');
<Input 
  value={value} 
  onChange={(val) => setValue(val)} 
/>
```

---

### Select

Dropdown selection component.

**Import:**

```javascript
import { Select } from 'your-component-library';
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption[]` | `[]` | Array of options |
| `value` | `string \| string[]` | - | Selected value(s) |
| `placeholder` | `string` | `'Select...'` | Placeholder text |
| `label` | `string` | - | Label text |
| `multiple` | `boolean` | `false` | Allow multiple selection |
| `searchable` | `boolean` | `false` | Enable search/filter |
| `clearable` | `boolean` | `false` | Allow clearing selection |
| `disabled` | `boolean` | `false` | Disable select |
| `error` | `string \| boolean` | - | Error state/message |
| `onChange` | `(value: string \| string[]) => void` | - | Change handler |

**Examples:**

```jsx
// Basic select
<Select 
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ]}
  onChange={(value) => console.log(value)}
/>

// Multiple selection
<Select 
  label="Tags"
  multiple
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
  ]}
/>

// Searchable
<Select 
  label="Search Countries"
  searchable
  options={countries}
/>

// With option groups
<Select 
  label="Framework"
  options={[
    { value: 'react', label: 'React', group: 'JavaScript' },
    { value: 'vue', label: 'Vue', group: 'JavaScript' },
    { value: 'django', label: 'Django', group: 'Python' },
    { value: 'flask', label: 'Flask', group: 'Python' },
  ]}
/>
```

---

### Checkbox

Checkbox input component.

**Import:**

```javascript
import { Checkbox } from 'your-component-library';
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | - | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Default checked state |
| `indeterminate` | `boolean` | `false` | Indeterminate state |
| `label` | `string \| ReactNode` | - | Checkbox label |
| `disabled` | `boolean` | `false` | Disable checkbox |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Checkbox size |
| `color` | `Color` | `'primary'` | Checkbox color |
| `onChange` | `(checked: boolean, event: ChangeEvent) => void` | - | Change handler |

**Examples:**

```jsx
// Basic checkbox
<Checkbox label="I agree to the terms" />

// Controlled
const [checked, setChecked] = useState(false);
<Checkbox 
  checked={checked} 
  onChange={(val) => setChecked(val)}
  label="Subscribe to newsletter"
/>

// Indeterminate
<Checkbox indeterminate label="Select all" />

// Sizes
<Checkbox size="sm" label="Small" />
<Checkbox size="md" label="Medium" />
<Checkbox size="lg" label="Large" />
```

---

### Switch

Toggle switch component.

**Import:**

```javascript
import { Switch } from 'your-component-library';
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | - | Controlled state |
| `defaultChecked` | `boolean` | `false` | Default state |
| `label` | `string` | - | Switch label |
| `disabled` | `boolean` | `false` | Disable switch |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Switch size |
| `color` | `Color` | `'primary'` | Active color |
| `onChange` | `(checked: boolean) => void` | - | Change handler |

**Example:**

```jsx
<Switch label="Enable notifications" />
<Switch label="Dark mode" defaultChecked />
<Switch label="Disabled" disabled />
```

---

## Layout Components

### Container

Centered container with max-width.

**Import:**

```javascript
import { Container } from 'your-component-library';
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxWidth` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'lg'` | Maximum width |
| `padding` | `boolean \| string` | `true` | Horizontal padding |
| `center` | `boolean` | `true` | Center horizontally |

**Example:**

```jsx
<Container maxWidth="lg">
  <h1>Page Content</h1>
  <p>This content is contained within a max-width container.</p>
</Container>
```

---

### Stack

Flex-based stacking layout.

**Import:**

```javascript
import { Stack } from 'your-component-library';
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'` | `'column'` | Stack direction |
| `spacing` | `number \| string` | `0` | Space between items |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'` | `'stretch'` | Align items |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | `'start'` | Justify content |
| `wrap` | `boolean` | `false` | Allow wrapping |
| `divider` | `ReactNode` | - | Divider between items |

**Example:**

```jsx
// Vertical stack
<Stack spacing={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</Stack>

// Horizontal stack
<Stack direction="row" spacing={2} align="center">
  <Button>Cancel</Button>
  <Button color="primary">Submit</Button>
</Stack>

// With divider
<Stack spacing={2} divider={<Divider />}>
  <Text>Section 1</Text>
  <Text>Section 2</Text>
  <Text>Section 3</Text>
</Stack>
```

---

### Grid

CSS Grid-based layout.

**Import:**

```javascript
import { Grid, GridItem } from 'your-component-library';
```

**Props (Grid):**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `number \| string` | `12` | Number of columns |
| `gap` | `number \| string` | `0` | Gap between items |
| `rowGap` | `number \| string` | - | Row gap |
| `columnGap` | `number \| string` | - | Column gap |

**Props (GridItem):**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `colSpan` | `number` | `1` | Columns to span |
| `rowSpan` | `number` | `1` | Rows to span |
| `colStart` | `number` | - | Starting column |
| `colEnd` | `number` | - | Ending column |

**Example:**

```jsx
<Grid columns={12} gap={4}>
  <GridItem colSpan={8}>Main content</GridItem>
  <GridItem colSpan={4}>Sidebar</GridItem>
</Grid>

// Responsive columns
<Grid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</Grid>
```

---

## Feedback Components

### Alert

Display important messages.

**Import:**

```javascript
import { Alert } from 'your-component-library';
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Alert status |
| `variant` | `'solid' \| 'subtle' \| 'left-accent' \| 'top-accent'` | `'subtle'` | Alert variant |
| `title` | `string` | - | Alert title |
| `closable` | `boolean` | `false` | Show close button |
| `icon` | `ReactNode \| boolean` | `true` | Custom icon or show default |
| `onClose` | `() => void` | - | Close handler |

**Example:**

```jsx
<Alert status="info" title="Information">
  This is an informational alert.
</Alert>

<Alert status="success" title="Success!">
  Your changes have been saved.
</Alert>

<Alert status="warning" closable onClose={() => setShow(false)}>
  Please review your settings.
</Alert>

<Alert status="error" variant="solid">
  An error occurred. Please try again.
</Alert>
```

---

### Modal

Overlay dialog component.

**Import:**

```javascript
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'your-component-library';
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | Control modal visibility |
| `onClose` | `() => void` | - | Close handler |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Modal size |
| `closeOnOverlayClick` | `boolean` | `true` | Close on overlay click |
| `closeOnEsc` | `boolean` | `true` | Close on Escape key |
| `centered` | `boolean` | `false` | Center vertically |

**Example:**

```jsx
const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open Modal</Button>

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader>Confirm Action</ModalHeader>
  <ModalBody>
    Are you sure you want to proceed with this action?
  </ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button color="primary" onClick={handleConfirm}>
      Confirm
    </Button>
  </ModalFooter>
</Modal>
```

---

### Toast

Temporary notification messages.

**Import:**

```javascript
import { useToast } from 'your-component-library';
```

**Toast Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | `string` | - | Toast title |
| `description` | `string` | - | Toast description |
| `status` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Toast status |
| `duration` | `number` | `5000` | Duration in ms (0 for persistent) |
| `position` | `'top' \| 'top-right' \| 'bottom' \| 'bottom-right'` | `'bottom-right'` | Position |
| `isClosable` | `boolean` | `true` | Show close button |

**Example:**

```jsx
function MyComponent() {
  const toast = useToast();

  const handleSuccess = () => {
    toast({
      title: 'Success!',
      description: 'Your profile has been updated.',
      status: 'success',
      duration: 3000,
    });
  };

  const handleError = () => {
    toast({
      title: 'Error',
      description: 'Failed to save changes.',
      status: 'error',
      isClosable: true,
    });
  };

  return (
    <>
      <Button onClick={handleSuccess}>Show Success</Button>
      <Button onClick={handleError}>Show Error</Button>
    </>
  );
}
```

---

## Navigation Components

### Tabs

Tabbed navigation component.

**Import:**

```javascript
import { Tabs, TabList, Tab, TabPanels, TabPanel } from 'your-component-library';
```

**Example:**

```jsx
<Tabs defaultIndex={0}>
  <TabList>
    <Tab>Overview</Tab>
    <Tab>Settings</Tab>
    <Tab>Activity</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Overview content</TabPanel>
    <TabPanel>Settings content</TabPanel>
    <TabPanel>Activity content</TabPanel>
  </TabPanels>
</Tabs>

// Controlled
const [tabIndex, setTabIndex] = useState(0);
<Tabs index={tabIndex} onChange={setTabIndex}>
  ...
</Tabs>
```

---

### Breadcrumb

Navigation breadcrumb component.

**Import:**

```javascript
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from 'your-component-library';
```

**Example:**

```jsx
<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbLink href="/products">Products</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem isCurrentPage>
    <BreadcrumbLink>Widget</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
```

---

## Theming

### ThemeProvider

Wrap your app with `ThemeProvider` to enable theming.

```jsx
import { ThemeProvider } from 'your-component-library';

function App() {
  return (
    <ThemeProvider theme="light">
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### Custom Theme

```jsx
import { ThemeProvider, extendTheme } from 'your-component-library';

const customTheme = extendTheme({
  colors: {
    primary: {
      50: '#e3f2fd',
      100: '#bbdefb',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
    },
  },
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Inter, sans-serif',
  },
  components: {
    Button: {
      defaultProps: {
        size: 'md',
        variant: 'solid',
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### Dark Mode

```jsx
import { ThemeProvider, useColorMode } from 'your-component-library';

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <Button onClick={toggleColorMode}>
      {colorMode === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  );
}
```

---

## See Also

- [Getting Started Guide](../guides/getting-started.md)
- [API Reference](../api/README.md)
- [Examples](../examples/README.md)
