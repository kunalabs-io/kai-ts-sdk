# Contributing to @kunalabs-io/kai

Thank you for your interest in contributing to the Kai Finance TypeScript SDK! We welcome contributions from the community.

## Code of Conduct

Please be respectful and considerate in all interactions. We aim to maintain a welcoming and inclusive environment for everyone.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/kai-ts-sdk.git
   cd kai-ts-sdk
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/kunalabs-io/kai-ts-sdk.git
   ```

## Development Setup

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (package manager)

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Build the project:
   ```bash
   pnpm build
   ```

3. Run type checking:
   ```bash
   pnpm check
   ```

4. Run linting:
   ```bash
   pnpm lint
   ```

### Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm build` | Build the project |
| `pnpm watch` | Build in watch mode |
| `pnpm check` | Run TypeScript type checking |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Run ESLint with auto-fix |
| `pnpm clean` | Clean build artifacts |

## Making Changes

1. **Create a new branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes** following the coding standards

3. **Ensure your changes pass all checks**:
   ```bash
   pnpm check
   pnpm lint
   ```

4. **Commit your changes** with a clear and descriptive commit message:
   ```bash
   git commit -m "feat: add new feature description"
   # or
   git commit -m "fix: resolve issue with X"
   ```

### Commit Message Guidelines

We follow conventional commit messages:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks
- `test:` - Adding or updating tests

## Pull Request Process

1. **Update your fork** with the latest upstream changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Open a Pull Request** on GitHub with:
   - A clear title describing the change
   - A detailed description of what was changed and why
   - Reference to any related issues (e.g., "Fixes #123")

4. **Respond to feedback** from maintainers and make requested changes

5. **Wait for approval** - a maintainer will review and merge your PR

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Ensure strict type checking passes
- Avoid using `any` type when possible
- Use meaningful variable and function names

### Code Style

- Follow the existing code style in the project
- Use Prettier for formatting (configured in `.prettierrc.json`)
- Follow ESLint rules (configured in `.eslintrc.cjs`)

### Documentation

- Add JSDoc comments for public APIs
- Update README.md if adding new features
- Include code examples where helpful

### File Organization

- Place source files in the `src/` directory
- Generated code goes in `src/gen/`
- Follow the existing module structure

## Reporting Issues

When reporting issues, please include:

1. **Description** - A clear description of the issue
2. **Steps to reproduce** - How to reproduce the problem
3. **Expected behavior** - What you expected to happen
4. **Actual behavior** - What actually happened
5. **Environment** - Node.js version, OS, SDK version
6. **Code samples** - Minimal code to reproduce (if applicable)

### Feature Requests

For feature requests, please describe:

- The problem you're trying to solve
- Your proposed solution
- Any alternatives you've considered

## Questions?

If you have questions about contributing, feel free to open an issue for discussion.

Thank you for contributing to @kunalabs-io/kai! 🎉
