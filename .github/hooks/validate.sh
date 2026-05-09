#!/bin/bash

# FoodTrip Hook Validation Script
# Validates that the foodtrip-context hook is properly configured

set -e

HOOK_FILE=".github/hooks/foodtrip-context.json"
AGENT_FILE=".github/agents/local.agent.md"

echo "🔍 Validating FoodTrip Copilot Hook Setup..."
echo ""

# Check 1: Hook file exists
if [ -f "$HOOK_FILE" ]; then
    echo "✅ Hook file exists: $HOOK_FILE"
else
    echo "❌ Hook file missing: $HOOK_FILE"
    exit 1
fi

# Check 2: Hook JSON is valid
if command -v jq &> /dev/null; then
    if jq . "$HOOK_FILE" > /dev/null 2>&1; then
        echo "✅ Hook JSON is valid"
    else
        echo "❌ Hook JSON is invalid"
        exit 1
    fi
else
    echo "⚠️  jq not installed, skipping JSON validation"
fi

# Check 3: Agent references hook
if grep -q "foodtrip-context.json" "$AGENT_FILE"; then
    echo "✅ Agent references hook"
else
    echo "❌ Agent does not reference hook"
    exit 1
fi

# Check 4: Required hook keys exist
REQUIRED_KEYS=("name" "description" "triggers" "config" "projectContext" "rules")
for key in "${REQUIRED_KEYS[@]}"; do
    if grep -q "\"$key\"" "$HOOK_FILE"; then
        echo "✅ Hook has required key: $key"
    else
        echo "❌ Hook missing required key: $key"
        exit 1
    fi
done

# Check 5: Project packages exist
REQUIRED_DIRS=("packages/api" "packages/types" "packages/ui" "packages/utils" "apps/admin" "apps/client")
for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ Project directory exists: $dir"
    else
        echo "❌ Project directory missing: $dir"
        exit 1
    fi
done

# Check 6: Required files in packages exist
REQUIRED_FILES=("packages/api/index.ts" "packages/types/index.ts")
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ Project file exists: $file"
    else
        echo "❌ Project file missing: $file"
        exit 1
    fi
done

echo ""
echo "🎉 All validations passed! Hook is properly configured."
echo ""
echo "📋 Hook Configuration Summary:"
echo "   - Hook file: $HOOK_FILE"
echo "   - Agent file: $AGENT_FILE"
echo "   - Triggers: SessionStart, PreToolUse"
echo "   - Rules: 6 architecture enforcement rules"
echo ""
echo "🚀 Next steps:"
echo "   1. Clear Copilot cache in VS Code"
echo "   2. Restart VS Code"
echo "   3. Start a new chat session to see context injection"
echo "   4. Try asking: 'Plan the User Management feature'"
