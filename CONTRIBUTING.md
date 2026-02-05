# Contributing to WP Trac Triager

Thank you for your interest in contributing to WP Trac Triager! This document provides guidelines for contributing to the project.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/wp-trac-triager.git
   cd wp-trac-triager
   ```
3. **Install dependencies** (optional, for linting):
   ```bash
   npm install
   ```
4. **Load the extension** in Chrome:
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the project directory

## Development Workflow

### Making Changes

1. **Create a new branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the code style guidelines below

3. **Test your changes** thoroughly:
   - Test on multiple WordPress Trac tickets
   - Verify all features work as expected
   - Check the browser console for errors

4. **Run linting** (if you installed dependencies):
   ```bash
   npm run lint
   npm run format:check
   ```

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings (except when avoiding escapes)
- Add semicolons at the end of statements
- Write descriptive variable and function names
- Add comments for complex logic
- Follow existing code patterns

### Commit Messages

Write clear, concise commit messages:
- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters
- Reference issues and pull requests when relevant

Example:
```
Add keyboard shortcuts for sidebar

- Add Ctrl+K to toggle sidebar
- Add Ctrl+Shift+K to collapse/expand
- Update documentation

Fixes #123
```

## Updating Data

### Component Maintainers

Update `data/maintainers-data.js` based on https://make.wordpress.org/core/components/:

1. Update `COMPONENT_MAINTAINERS` object
2. Add new maintainers to `MAINTAINER_PROFILES`
3. Test on a ticket for that component

### Keywords

Update `data/keyword-data.js` based on https://make.wordpress.org/core/handbook/contribute/trac/keywords/:

1. Add new keywords with proper structure
2. Ensure color coding is consistent
3. Test display in the sidebar

## Submitting Changes

1. **Push your changes** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request** on GitHub:
   - Provide a clear description of the changes
   - Reference any related issues
   - Add screenshots for UI changes
   - Ensure all tests pass

3. **Respond to feedback** from reviewers:
   - Make requested changes
   - Push updates to the same branch
   - Be patient and respectful

## Reporting Issues

When reporting bugs or requesting features:

1. **Check existing issues** to avoid duplicates
2. **Use issue templates** if available
3. **Provide detailed information**:
   - Browser version
   - Extension version
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots or error messages

## Questions or Need Help?

- Open an issue with the "question" label
- Check existing documentation
- Review closed issues for similar questions

## License

By contributing to WP Trac Triager, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 🎉
