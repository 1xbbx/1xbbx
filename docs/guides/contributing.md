# Contributing Guide

Thank you for your interest in contributing! This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Issue Guidelines](#issue-guidelines)

---

## Code of Conduct

We are committed to providing a welcoming and inclusive experience for everyone. Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

---

## Getting Started

### Prerequisites

- Node.js 16.0.0 or higher
- npm 8.0.0 or higher (or yarn/pnpm)
- Git

### Setting Up Development Environment

1. **Fork the Repository**
   
   Click the "Fork" button on GitHub to create your own copy.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/YOUR-USERNAME/PROJECT-NAME.git
   cd PROJECT-NAME
   ```

3. **Add Upstream Remote**

   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/PROJECT-NAME.git
   ```

4. **Install Dependencies**

   ```bash
   npm install
   ```

5. **Run Tests**

   ```bash
   npm test
   ```

6. **Start Development Server**

   ```bash
   npm run dev
   ```

---

## Development Workflow

### Creating a Feature Branch

```bash
# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create a new branch
git checkout -b feature/your-feature-name
```

### Branch Naming Convention

- `feature/` - New features (e.g., `feature/add-dark-mode`)
- `fix/` - Bug fixes (e.g., `fix/button-click-issue`)
- `docs/` - Documentation changes (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/simplify-auth`)
- `test/` - Test additions/changes (e.g., `test/add-button-tests`)

### Making Changes

1. **Make your changes**
   
   Follow the [coding standards](#coding-standards) below.

2. **Run linting**

   ```bash
   npm run lint
   ```

3. **Run tests**

   ```bash
   npm test
   ```

4. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes |
| `style` | Formatting, missing semicolons, etc. |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `chore` | Maintenance tasks |

**Examples:**

```bash
# Feature
git commit -m "feat(button): add loading state prop"

# Bug fix
git commit -m "fix(input): resolve focus issue on mobile"

# Documentation
git commit -m "docs: update installation instructions"

# Breaking change
git commit -m "feat(api)!: change response format

BREAKING CHANGE: The response format has changed from array to object."
```

---

## Pull Request Process

### Before Submitting

1. ✅ Ensure all tests pass
2. ✅ Update documentation if needed
3. ✅ Add tests for new features
4. ✅ Follow coding standards
5. ✅ Rebase on latest main branch

### Submitting a Pull Request

1. **Push your branch**

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   
   Go to GitHub and click "New Pull Request".

3. **Fill out the PR template**

   ```markdown
   ## Summary
   Brief description of changes.

   ## Changes
   - Added X feature
   - Fixed Y bug
   - Updated Z documentation

   ## Testing
   - [ ] Added unit tests
   - [ ] Tested manually
   - [ ] All existing tests pass

   ## Screenshots (if applicable)
   [Add screenshots here]

   ## Related Issues
   Closes #123
   ```

4. **Request Review**
   
   Add relevant reviewers to your PR.

### After Submitting

- Respond to review feedback promptly
- Make requested changes in new commits
- Keep the PR updated with main branch

### PR Review Checklist

Reviewers will check:

- [ ] Code follows project style guide
- [ ] Changes are well-tested
- [ ] Documentation is updated
- [ ] No breaking changes (or properly documented)
- [ ] Commit messages follow convention
- [ ] PR description is clear

---

## Coding Standards

### JavaScript/TypeScript

```javascript
// ✅ Good: Use const for values that don't change
const MAX_RETRIES = 3;

// ✅ Good: Use descriptive variable names
const userAuthenticated = checkAuth();

// ❌ Bad: Single-letter variables
const x = checkAuth();

// ✅ Good: Use async/await
async function fetchData() {
  try {
    const response = await client.get('/api/data');
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// ❌ Bad: Callback-based code
function fetchData(callback) {
  client.get('/api/data', (err, response) => {
    if (err) {
      callback(err);
    } else {
      callback(null, response.data);
    }
  });
}
```

### File Organization

```
src/
├── components/          # React components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   ├── Button.styles.ts
│   │   └── index.ts
├── hooks/               # Custom hooks
├── utils/               # Utility functions
├── types/               # TypeScript types
└── index.ts             # Main exports
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files (Components) | PascalCase | `Button.tsx` |
| Files (Utils) | camelCase | `formatDate.ts` |
| Components | PascalCase | `UserProfile` |
| Functions | camelCase | `getUserById` |
| Variables | camelCase | `isLoading` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| Types/Interfaces | PascalCase | `UserData` |
| Enums | PascalCase | `UserRole` |

### ESLint Rules

Key rules enforced by our ESLint config:

```javascript
{
  "rules": {
    "no-unused-vars": "error",
    "no-console": "warn",
    "prefer-const": "error",
    "eqeqeq": ["error", "always"],
    "curly": ["error", "all"],
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "error"
  }
}
```

---

## Testing Guidelines

### Test Structure

```javascript
describe('ComponentName', () => {
  describe('when rendered with default props', () => {
    it('should render correctly', () => {
      // Test implementation
    });
  });

  describe('when user interacts', () => {
    it('should handle click events', () => {
      // Test implementation
    });
  });
});
```

### Writing Tests

```javascript
// ✅ Good: Descriptive test names
it('should display error message when form validation fails', () => {
  // ...
});

// ❌ Bad: Vague test names
it('should work', () => {
  // ...
});

// ✅ Good: Test behavior, not implementation
it('should show user name after successful login', () => {
  render(<UserProfile />);
  fireEvent.click(screen.getByRole('button', { name: 'Login' }));
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});

// ❌ Bad: Testing implementation details
it('should call setState with user data', () => {
  // ...
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- Button.test.tsx
```

### Coverage Requirements

- Minimum 80% code coverage
- All new features must have tests
- All bug fixes must have regression tests

---

## Documentation

### When to Update Documentation

- Adding new features
- Changing existing APIs
- Fixing documentation bugs
- Adding examples

### Documentation Style

```markdown
# Function/Component Name

Brief description of what it does.

## Usage

\```javascript
// Code example
\```

## Props/Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| prop1 | string | - | Description |

## Examples

\```javascript
// Example code
\```

## See Also

- [Related Topic](./related.md)
```

### Building Documentation

```bash
# Generate documentation
npm run docs:build

# Preview documentation locally
npm run docs:serve
```

---

## Issue Guidelines

### Reporting Bugs

Use the bug report template:

```markdown
## Bug Description
Clear description of the bug.

## Steps to Reproduce
1. Step one
2. Step two
3. Step three

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Environment
- Package version:
- Node.js version:
- OS:

## Additional Context
Screenshots, error logs, etc.
```

### Requesting Features

Use the feature request template:

```markdown
## Feature Description
Clear description of the feature.

## Use Case
Why is this feature needed?

## Proposed Solution
How should this work?

## Alternatives Considered
Other solutions you've thought about.

## Additional Context
Any other relevant information.
```

### Issue Labels

| Label | Description |
|-------|-------------|
| `bug` | Something isn't working |
| `enhancement` | New feature or request |
| `documentation` | Documentation improvements |
| `good first issue` | Good for newcomers |
| `help wanted` | Extra attention needed |
| `priority: high` | High priority issue |
| `needs triage` | Needs review |

---

## Recognition

Contributors are recognized in our:

- [Contributors list](CONTRIBUTORS.md)
- Release notes
- README acknowledgments

Thank you for contributing! 🎉
