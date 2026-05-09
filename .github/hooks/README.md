# FoodTrip Copilot Hooks

Custom hooks to make GitHub Copilot agent more relevant to the FoodTrip project.

## Available Hooks

### `foodtrip-context-injector` (foodtrip-context.json)

Injects FoodTrip project context and enforces architecture rules.

**Triggers:**

- `SessionStart` — Injects context at the beginning of each session
- `PreToolUse` — Validates actions before tools are executed

**Enforces:**

- ✅ Feature isolation (no cross-feature imports)
- ✅ React Query only (never useEffect for data fetching)
- ✅ API layer abstraction (all calls through packages/api)
- ✅ Strict TypeScript (no `any` types)
- ✅ Presentational components (no API logic in components)

**What it injects:**

- Project structure overview
- App and feature details
- Shared package information
- Query key naming patterns
- Architecture rule reminders

## How to Use

### In VS Code Settings

Add to your `.vscode/settings.json`:

```json
{
  "copilot.customization": {
    "hooks": [".github/hooks/foodtrip-context.json"]
  }
}
```

### In Agent Configuration

Reference in your `.github/agents/local.agent.md`:

```yaml
hooks:
  - '.github/hooks/foodtrip-context.json'
```

## Hook Configuration Structure

```json
{
  "name": "hook-name",
  "description": "What this hook does",
  "triggers": ["SessionStart", "PreToolUse"],
  "config": {
    /* ... */
  },
  "projectContext": {
    /* ... */
  },
  "rules": [
    /* ... */
  ],
  "onSessionStart": {
    /* ... */
  },
  "onPreToolUse": {
    /* ... */
  }
}
```

## Testing Hooks

### 1. Validate JSON Structure

```bash
jq . .github/hooks/foodtrip-context.json
```

### 2. Check Hook is Referenced

```bash
grep -r "foodtrip-context" .github/
```

### 3. Test in VS Code

1. Open Command Palette (`Cmd+Shift+P`)
2. Run "Copilot: Clear Cache"
3. Start a new chat session
4. Verify context is injected in initial message

## Creating New Hooks

When creating a new hook:

1. **Define triggers** — When should this hook run? (SessionStart, PreToolUse, PreFileEdit, PostToolUse, etc.)
2. **Set severity** — error, warning, or info
3. **Specify action** — block, warn, or inject
4. **Provide suggestions** — Help developers fix violations

### Hook Template

```json
{
  "name": "my-hook",
  "description": "What this hook enforces",
  "version": "1.0.0",
  "triggers": ["SessionStart"],
  "config": {},
  "rules": [
    {
      "id": "rule-id",
      "severity": "error",
      "description": "Rule description",
      "pattern": "regex pattern",
      "action": "block|warn|inject",
      "suggestion": "How to fix"
    }
  ]
}
```

## Next Steps

1. ✅ Hook created and ready to use
2. ⬜ Reference hook in your agent configuration
3. ⬜ Test hook behavior in VS Code
4. ⬜ Create additional hooks as needed (e.g., routing rules, styling conventions)

## Troubleshooting

**Hook not being applied:**

- Verify JSON syntax: `jq . .github/hooks/foodtrip-context.json`
- Check agent configuration references the hook
- Clear Copilot cache and restart VS Code

**Rules not working as expected:**

- Review regex patterns in rules
- Test patterns independently
- Check severity and action settings

**Missing context injection:**

- Verify `onSessionStart.injectContext` is populated
- Check that hook is in applyTo patterns
- Review Copilot settings for hook configuration

## References

- [Copilot Instructions](../copilot-instructions.md)
- [Local Agent](../agents/local.agent.md)
- [Agent Customization Guide](https://github.com/github/copilot-docs/blob/main/docs/customization.md)
