# PostTask Components

This directory contains hierarchical components for the PostTask functionality, designed with a modern dark theme that matches the application's design system.

## Components

### PostTaskForm
The main form component that orchestrates all form elements and handles submission.

**Props:**
- Uses internal state management
- Integrates with `useTask` and `useAuth` hooks
- Handles form validation and submission

### TaskInput
A reusable input component for text, number, and date inputs.

**Props:**
- `name` (string): Input name attribute
- `type` (string): Input type (text, number, date, etc.)
- `placeholder` (string): Placeholder text
- `value` (string): Controlled input value
- `onChange` (function): Change handler
- `required` (boolean): Whether the field is required
- `label` (string): Field label

### TaskTextarea
A reusable textarea component for multiline text input.

**Props:**
- `name` (string): Textarea name attribute
- `placeholder` (string): Placeholder text
- `value` (string): Controlled textarea value
- `onChange` (function): Change handler
- `required` (boolean): Whether the field is required
- `label` (string): Field label
- `rows` (number): Number of visible rows

### TaskSelect
A custom dropdown select component with styled options.

**Props:**
- `name` (string): Select name attribute
- `value` (string): Controlled select value
- `onChange` (function): Change handler
- `options` (array): Array of option objects with `value` and `label` properties
- `required` (boolean): Whether the field is required
- `label` (string): Field label

### TaskButton
A button component with loading state support.

**Props:**
- `children` (node): Button content
- `type` (string): Button type (button, submit, reset)
- `disabled` (boolean): Whether the button is disabled
- `loading` (boolean): Whether to show loading spinner
- `className` (string): Additional CSS classes

## Styling

All components use CSS modules with:
- Dark theme colors (`#0f172a`, `#1e293b`, `#334155`)
- Teal accent color (`#14b8a6`)
- Glassmorphism effects with backdrop blur
- Smooth transitions and hover effects
- Responsive design for mobile devices
- Accessibility features (focus states, reduced motion support)

## Usage

```jsx
import { PostTaskForm } from '../components/PostTasks';

function MyPage() {
  return <PostTaskForm />;
}
```

## Theme Integration

The components are designed to match the application's theme:
- Uses Inter font family
- Consistent color palette
- Modern gradient backgrounds
- Glassmorphism effects
- Responsive breakpoints
- Accessibility considerations 