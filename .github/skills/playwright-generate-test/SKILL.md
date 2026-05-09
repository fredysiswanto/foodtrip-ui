---
name: playwright-generate-test
description: 'Generate Playwright E2E tests for user flows and scenarios. Uses Playwright MCP to explore website, interact with UI, and generate working test code.'
---

# Playwright E2E Test Generator

Generate end-to-end tests for your admin UI flows and scenarios.

## When to Use

- Test login and authentication flows
- Test admin CRUD operations (create, read, update, delete)
- Test user interactions with forms
- Test navigation and routing
- Test error handling and edge cases
- Validate UI behavior in workflows

## What It Does

1. **Explores Your App**
   - Opens admin dashboard
   - Maps available UI elements
   - Identifies interactive components

2. **Understands Your Scenario**
   - You describe the test scenario (e.g., "create a restaurant")
   - Breaks it into steps
   - Maps steps to UI interactions

3. **Generates Working Tests**
   - Creates TypeScript test code
   - Uses `@playwright/test` framework
   - Includes proper assertions
   - Handles async operations

4. **Executes & Validates**
   - Runs the test in your app
   - Fixes issues if needed
   - Saves to test file

## Usage Examples

Test restaurant creation flow:

```
Generate a Playwright test for the restaurant creation flow:
1. Login to admin
2. Navigate to Restaurant Management
3. Click "Create Restaurant"
4. Fill form with restaurant data
5. Submit
6. Verify restaurant appears in list
```

Test form validation:

```
Generate a Playwright test for form validation: test that required fields show errors when submitted empty
```

Test authentication:

```
Generate a Playwright test for login: enter email, password, click login, verify redirect to dashboard
```

## Test Structure

Generated tests include:

- **Setup**: Navigate to page, login if needed
- **Actions**: User interactions (click, fill, submit)
- **Assertions**: Verify expected outcomes
- **Cleanup**: Reset state if needed

## Key Features

- Works with your admin app directly
- Tests actual UI interactions
- No mocking required
- Generates ready-to-run code
- Works with TypeScript
- Integrates with your Jest/test setup
- Captures screenshots on failure
- Handles async operations

## Output

Tests are saved to: `apps/admin/tests/e2e/` directory with `.spec.ts` extension
