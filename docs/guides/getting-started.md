# Getting Started

This guide will help you get up and running with the project quickly.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Your First Project](#your-first-project)
- [Next Steps](#next-steps)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16.0.0 or higher)
- **npm** (version 8.0.0 or higher) or **yarn** or **pnpm**
- A code editor (we recommend VS Code)

### Verify Installation

```bash
# Check Node.js version
node --version
# Should output: v16.0.0 or higher

# Check npm version
npm --version
# Should output: 8.0.0 or higher
```

---

## Installation

### Using npm

```bash
npm install your-package-name
```

### Using yarn

```bash
yarn add your-package-name
```

### Using pnpm

```bash
pnpm add your-package-name
```

### Development Dependencies (Optional)

For TypeScript support and development tools:

```bash
npm install -D @types/your-package-name your-package-dev-tools
```

---

## Quick Start

### 1. Import the Package

```javascript
// ES Modules (recommended)
import { Client, initialize } from 'your-package-name';

// CommonJS
const { Client, initialize } = require('your-package-name');
```

### 2. Initialize the Client

```javascript
import { Client } from 'your-package-name';

// Create a new client instance
const client = new Client({
  baseUrl: 'https://api.example.com',
  timeout: 10000,
});

// Or use the initialize helper
import { initialize } from 'your-package-name';

const instance = await initialize({
  debug: true,
});
```

### 3. Make Your First Request

```javascript
// Fetch data
const users = await client.get('/users');
console.log(users.data);

// Create data
const newUser = await client.post('/users', {
  name: 'John Doe',
  email: 'john@example.com',
});
console.log(newUser.data);
```

### 4. Using Components (for UI library)

```jsx
import { ThemeProvider, Button, Input } from 'your-package-name';
import 'your-package-name/styles.css';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <h1>My Application</h1>
        <Input placeholder="Enter your name" />
        <Button color="primary">Submit</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
```

---

## Configuration

### Basic Configuration

Create a configuration file in your project root:

```javascript
// config.js
export default {
  // API Configuration
  api: {
    baseUrl: process.env.API_URL || 'https://api.example.com',
    timeout: 30000,
    retries: 3,
  },
  
  // Debug mode
  debug: process.env.NODE_ENV === 'development',
  
  // Feature flags
  features: {
    caching: true,
    logging: true,
  },
};
```

### Using Configuration

```javascript
import { Client } from 'your-package-name';
import config from './config';

const client = new Client({
  baseUrl: config.api.baseUrl,
  timeout: config.api.timeout,
  debug: config.debug,
  retry: {
    maxRetries: config.api.retries,
  },
});

export default client;
```

### Environment Variables

Create a `.env` file in your project root:

```env
# API Configuration
API_URL=https://api.example.com
API_KEY=your-api-key

# Feature Flags
ENABLE_DEBUG=true
ENABLE_CACHING=true
```

Load environment variables:

```javascript
import 'dotenv/config';

const client = new Client({
  baseUrl: process.env.API_URL,
  headers: {
    'Authorization': `Bearer ${process.env.API_KEY}`,
  },
});
```

### Configuration Options Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `baseUrl` | `string` | `''` | Base URL for API requests |
| `timeout` | `number` | `30000` | Request timeout in milliseconds |
| `debug` | `boolean` | `false` | Enable debug logging |
| `headers` | `object` | `{}` | Default headers for all requests |
| `retry.maxRetries` | `number` | `3` | Maximum retry attempts |
| `retry.delay` | `number` | `1000` | Initial retry delay |
| `cache.enabled` | `boolean` | `false` | Enable response caching |
| `cache.ttl` | `number` | `300000` | Cache TTL in milliseconds |

---

## Your First Project

Let's build a simple application step by step.

### Step 1: Project Setup

```bash
# Create a new project directory
mkdir my-project
cd my-project

# Initialize npm
npm init -y

# Install dependencies
npm install your-package-name
```

### Step 2: Create the Main File

Create `index.js`:

```javascript
import { Client } from 'your-package-name';

// Initialize the client
const client = new Client({
  baseUrl: 'https://jsonplaceholder.typicode.com',
});

async function main() {
  try {
    // Fetch posts
    console.log('Fetching posts...');
    const posts = await client.get('/posts', { params: { _limit: 5 } });
    console.log(`Found ${posts.data.length} posts\n`);
    
    // Display posts
    posts.data.forEach(post => {
      console.log(`📝 ${post.title}`);
      console.log(`   ${post.body.substring(0, 50)}...`);
      console.log('');
    });
    
    // Create a new post
    console.log('Creating a new post...');
    const newPost = await client.post('/posts', {
      title: 'My First Post',
      body: 'This is the content of my first post.',
      userId: 1,
    });
    console.log('Created post:', newPost.data);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
```

### Step 3: Update Package.json

Add a start script to `package.json`:

```json
{
  "type": "module",
  "scripts": {
    "start": "node index.js"
  }
}
```

### Step 4: Run the Application

```bash
npm start
```

Expected output:

```
Fetching posts...
Found 5 posts

📝 sunt aut facere repellat provident occaecati excepturi optio reprehenderit
   quia et suscipit\nsuscipit recusandae consequuntur ...

📝 qui est esse
   est rerum tempore vitae\nsequi sint nihil repreh...

...

Creating a new post...
Created post: { id: 101, title: 'My First Post', body: '...', userId: 1 }
```

---

## Next Steps

Now that you have the basics, here are some recommended next steps:

### 📚 Learn More

- [API Reference](../api/README.md) - Explore all available APIs
- [Components Guide](../components/README.md) - Learn about UI components
- [Examples](../examples/README.md) - See practical examples

### 🔧 Advanced Topics

- [Error Handling](../api/README.md#error-handling) - Handle errors gracefully
- [Authentication](./authentication.md) - Implement auth flows
- [Caching](./caching.md) - Optimize with caching
- [Testing](./testing.md) - Write tests for your code

### 🤝 Get Help

- [GitHub Issues](https://github.com/your-username/your-repo/issues) - Report bugs
- [Discussions](https://github.com/your-username/your-repo/discussions) - Ask questions
- [Discord](https://discord.gg/your-server) - Join the community

### 💡 Tips

1. **Use TypeScript** for better development experience with autocomplete and type checking
2. **Enable debug mode** during development to see detailed logs
3. **Check examples** when implementing new features
4. **Keep dependencies updated** for security and new features

---

## Troubleshooting

### Common Issues

#### Module Not Found Error

```
Error: Cannot find module 'your-package-name'
```

**Solution:** Make sure you've installed the package:

```bash
npm install your-package-name
```

#### ESM Import Error

```
SyntaxError: Cannot use import statement outside a module
```

**Solution:** Add `"type": "module"` to your `package.json` or use `.mjs` extension.

#### Network Errors

```
Error: Network request failed
```

**Solutions:**
- Check your internet connection
- Verify the API URL is correct
- Check if CORS is properly configured
- Increase timeout if dealing with slow networks

### Getting Help

If you encounter issues:

1. Check this documentation
2. Search [existing issues](https://github.com/your-username/your-repo/issues)
3. Create a [new issue](https://github.com/your-username/your-repo/issues/new) with:
   - Your package version
   - Node.js version
   - Steps to reproduce
   - Error messages
   - Code samples (if applicable)
