# Context7 MCP Integration

Version: 2.0.0
Updated: 2025-01-19

## Critical Importance
Context7 is FUNDAMENTAL for Cypher operations. Provides real-time, version-specific documentation directly in AI context.

## Installation for Claude Code

### Prerequisites
- Internet connection
- NPX installed

### Setup Commands

#### Windows Users
```bash
# Required: Use cmd wrapper for npx on Windows
claude mcp add context7 -s project -- cmd /c npx -y @upstash/context7-mcp
```

#### macOS/Linux Users
```bash
# Add to project scope (shared via .mcp.json)
claude mcp add context7 -s project -- npx -y @upstash/context7-mcp

# Or add to user scope (personal, all projects)
claude mcp add context7 -s user -- npx -y @upstash/context7-mcp
```

### Verify Installation
```bash
# List configured servers
claude mcp list

# Check server status
/mcp
```

## Usage in Cypher

### For Documentation Research
```
use context7
Search for [library] documentation, version X.Y.Z
```

### For Pattern Discovery
```
use context7
Find best practices for [pattern] in [language]
```

### For Dependency Updates
```
use context7
Check latest version and breaking changes for [package]
```

## Integration Points

1. **During `cypher context`**: Fetch external library docs
2. **During `cypher learn`**: Research best practices
3. **During `cypher validate`**: Check security advisories
4. **During development**: Real-time documentation access

## Why Essential for Cypher

- **Accuracy**: Version-specific documentation prevents outdated patterns
- **Efficiency**: No manual documentation searching
- **Consistency**: All AI agents access same documentation source
- **Evolution**: Patterns stay current with ecosystem changes

## Verification
```bash
# In Claude/AI tool, test with:
"use context7 - get React 18 hooks documentation"
```