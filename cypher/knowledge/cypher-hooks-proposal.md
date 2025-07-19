# Cypher Hooks: Minimal Philosophy, Maximum Value

## Core Principle
> "The best tool is the one that teaches you to not need it."

Hooks should be **INVISIBLE until valuable**. No friction, no interruptions, just silent wisdom capture.

## The Single Hook Philosophy

### CypherWisdom Hook - The Only Hook You Need (For Now)

```python
#!/usr/bin/env python3
"""
Un solo hook que captura sabiduría SIN interrumpir el flujo.
Filosofía: Invisible hasta que sea valioso.
"""
import json, sys, os

def should_intervene(tool_name, tool_input):
    """Solo intervenir cuando hay valor real"""
    
    # Solo para comandos cypher específicos
    if tool_name == "Bash":
        command = tool_input.get("command", "")
        
        # Solo comandos cypher que realmente necesitan guía
        critical_commands = ["cypher plan", "cypher learn"]
        if any(cmd in command for cmd in critical_commands):
            return True
    
    return False

def silent_wisdom_capture(tool_name, tool_input):
    """Captura sabiduría silenciosamente, sin archivos masivos"""
    
    # Solo actualizar evolution-log.md existente
    # No crear archivos nuevos constantemente
    if tool_name in ["Write", "Edit"] and "cypher/" in tool_input.get("file_path", ""):
        append_to_evolution_log(tool_input)

def main():
    data = json.load(sys.stdin)
    
    tool_name = data.get("tool_name")
    tool_input = data.get("tool_input", {})
    
    # PostToolUse: Captura silenciosa
    if "tool_response" in data:
        silent_wisdom_capture(tool_name, tool_input)
    
    # PreToolUse: Solo intervenir si es crítico
    elif should_intervene(tool_name, tool_input):
        # Momento de enseñanza MUY específico
        print(json.dumps({
            "decision": "approve",
            "reason": "🎓 Starting dialogue - check existing guides first"
        }))
    
    # Default: transparente
    print(json.dumps({"decision": "approve"}))

if __name__ == "__main__":
    main()
```

## Minimal Configuration

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "python3 ~/.cypher/hooks/wisdom.py",
            "timeout": 5
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "python3 ~/.cypher/hooks/wisdom.py",
            "timeout": 3
          }
        ]
      }
    ]
  }
}
```

## Design Principles

1. **Invisible by Default** - Only noticed when there's value
2. **Single evolution-log.md** - No file explosion
3. **Timeout <5 seconds** - No perceptible friction
4. **Selective Intervention** - Only critical commands
5. **Cumulative Wisdom** - Not retrospection for every action

## Result

A hook that **teaches without bothering**, **learns without interrupting**, and **evolves without saturating**.

This DOES respect Cypher philosophy: Simplicity that enables intelligence, not complexity that impresses.

---

# Practical Project Hooks Library

## Design Philosophy

Each hook must pass the **"Grandma Test"**: Would your grandma notice it while using Claude Code? If yes, it's badly designed.

## I. Silent Security Hooks

### 1. SafeGuard Hook - Invisible Protection

```python
#!/usr/bin/env python3
"""
Blocks dangerous commands without bothering with safe ones.
Timeout: 2 seconds max.
"""
import json, sys, re

DANGER_PATTERNS = [
    r"rm\s+-rf\s+/",
    r"sudo\s+rm",
    r"chmod\s+777",
    r">.*/etc/",
    r"curl.*\|\s*bash",
    r"wget.*\|\s*sh"
]

def is_dangerous(command):
    return any(re.search(pattern, command, re.IGNORECASE) for pattern in DANGER_PATTERNS)

def main():
    data = json.load(sys.stdin)
    
    if data.get("tool_name") == "Bash":
        command = data.get("tool_input", {}).get("command", "")
        
        if is_dangerous(command):
            print(json.dumps({
                "decision": "block",
                "reason": "🛡️ Potentially dangerous command blocked. Review and use with caution."
            }))
            sys.exit(0)
    
    # Invisible for safe commands
    print(json.dumps({"decision": "approve"}))

if __name__ == "__main__":
    main()
```

### 2. SecretGuard Hook - Secrets Protection

```python
#!/usr/bin/env python3
"""
Prevents accidental commits of secrets.
Only activates on git operations.
"""
import json, sys, re

SECRET_PATTERNS = [
    r"password\s*=\s*['\"]"+[^'\"]+['\"]",
    r"api_key\s*=\s*['\"]"+[^'\"]+['\"]",
    r"secret\s*=\s*['\"]"+[^'\"]+['\"]",
    r"token\s*=\s*['\"]"+[^'\"]+['\"]"
]

def contains_secrets(content):
    return any(re.search(pattern, content, re.IGNORECASE) for pattern in SECRET_PATTERNS)

def main():
    data = json.load(sys.stdin)
    
    if data.get("tool_name") in ["Write", "Edit"]:
        content = data.get("tool_input", {}).get("content", "")
        
        if contains_secrets(content):
            print(json.dumps({
                "decision": "block", 
                "reason": "🔐 Potential secret detected. Consider using environment variables."
            }))
            sys.exit(0)
    
    print(json.dumps({"decision": "approve"}))

if __name__ == "__main__":
    main()
```

## II. Silent Productivity Hooks

### 3. AutoFormat Hook - Transparent Formatting

```python
#!/usr/bin/env python3
"""
Auto-formats code after editing.
Only for languages with fast formatters.
"""
import json, sys, subprocess, os

FORMATTERS = {
    ".py": ["black", "--quiet"],
    ".js": ["prettier", "--write"],
    ".ts": ["prettier", "--write"], 
    ".tsx": ["prettier", "--write"],
    ".json": ["prettier", "--write"]
}

def main():
    data = json.load(sys.stdin)
    
    if data.get("tool_name") in ["Write", "Edit", "MultiEdit"]:
        file_path = data.get("tool_input", {}).get("file_path", "")
        
        if file_path and os.path.exists(file_path):
            ext = os.path.splitext(file_path)[1]
            
            if ext in FORMATTERS:
                try:
                    cmd = FORMATTERS[ext] + [file_path]
                    subprocess.run(cmd, timeout=3, capture_output=True)
                    # Silent - no output unless it fails
                except:
                    pass  # Fail silently
    
    print(json.dumps({"decision": "allow"}))

if __name__ == "__main__":
    main()
```

### 4. SmartCommit Hook - Git Intelligence

```python
#!/usr/bin/env python3
"""
Auto-add and smart commit message suggestions.
Only activates on git commit commands.
"""
import json, sys, subprocess, re

def get_smart_commit_message():
    """Generate commit message based on changes"""
    try:
        # Get modified files
        result = subprocess.run(["git", "diff", "--name-only", "--cached"], 
                              capture_output=True, text=True, timeout=2)
        
        files = result.stdout.strip().split('\n')
        
        if len(files) == 1 and files[0]:
            file_path = files[0]
            
            # Simple heuristics for message
            if file_path.endswith('.md'):
                return f"docs: update {file_path}"
            elif 'test' in file_path:
                return f"test: update {file_path}"
            elif file_path.endswith(('.py', '.js', '.ts')):
                return f"feat: update {file_path}"
            else:
                return f"chore: update {file_path}"
        
        return "chore: update multiple files"
    except:
        return None

def main():
    data = json.load(sys.stdin)
    
    if data.get("tool_name") == "Bash":
        command = data.get("tool_input", {}).get("command", "")
        
        # Auto-add before commit if there are unstaged files
        if "git commit" in command and "-m" not in command:
            try:
                # Check if there are unstaged changes
                result = subprocess.run(["git", "status", "--porcelain"], 
                                      capture_output=True, text=True, timeout=2)
                
                if result.stdout.strip():
                    subprocess.run(["git", "add", "-A"], timeout=2)
                
                # Suggest commit message
                smart_msg = get_smart_commit_message()
                if smart_msg:
                    print(json.dumps({
                        "decision": "approve",
                        "reason": f"📝 Suggested commit message: {smart_msg}"
                    }))
                    sys.exit(0)
            except:
                pass
    
    print(json.dumps({"decision": "approve"}))

if __name__ == "__main__":
    main()
```

## III. Quality Assurance Hooks

### 5. TestRunner Hook - Automatic Tests

```python
#!/usr/bin/env python3
"""
Runs relevant tests after code changes.
Only for modified test files.
"""
import json, sys, subprocess, os

TEST_COMMANDS = {
    "test_": "python -m pytest",
    ".test.": "npm test", 
    ".spec.": "npm test",
    "_test.": "go test"
}

def main():
    data = json.load(sys.stdin)
    
    if data.get("tool_name") in ["Write", "Edit"]:
        file_path = data.get("tool_input", {}).get("file_path", "")
        
        # Only run if it's a test file
        for pattern, cmd in TEST_COMMANDS.items():
            if pattern in os.path.basename(file_path):
                try:
                    # Run specific test
                    result = subprocess.run(
                        cmd.split() + [file_path], 
                        capture_output=True, text=True, timeout=10
                    )
                    
                    if result.returncode != 0:
                        print(json.dumps({
                            "decision": "block",
                            "reason": f"❌ Test failed:\n{result.stdout[:200]}..."
                        }))
                        sys.exit(0)
                except:
                    pass  # Fail silently
    
    print(json.dumps({"decision": "allow"}))

if __name__ == "__main__":
    main()
```

### 6. LintGuard Hook - Basic Linting

```python
#!/usr/bin/env python3
"""
Quick linting for obvious errors.
Only for Python and JavaScript.
"""
import json, sys, subprocess, os

LINTERS = {
    ".py": ["python", "-m", "py_compile"],
    ".js": ["node", "-c"],
    ".ts": ["tsc", "--noEmit"]
}

def main():
    data = json.load(sys.stdin)
    
    if data.get("tool_name") in ["Write", "Edit"]:
        file_path = data.get("tool_input", {}).get("file_path", "")
        
        if file_path and os.path.exists(file_path):
            ext = os.path.splitext(file_path)[1]
            
            if ext in LINTERS:
                try:
                    cmd = LINTERS[ext] + [file_path]
                    result = subprocess.run(cmd, capture_output=True, text=True, timeout=5)
                    
                    if result.returncode != 0:
                        print(json.dumps({
                            "decision": "block",
                            "reason": f"🚨 Syntax error:\n{result.stderr[:150]}..."
                        }))
                        sys.exit(0)
                except:
                    pass
    
    print(json.dumps({"decision": "allow"}))

if __name__ == "__main__":
    main()
```

## IV. Project Intelligence Hooks

### 7. DependencyWatch Hook - Dependency Updates

```python
#!/usr/bin/env python3
"""
Notifies about outdated dependencies.
Only on package.json/requirements.txt modifications.
"""
import json, sys, subprocess, os

def check_outdated_deps(file_path):
    """Check for outdated dependencies"""
    
    if "package.json" in file_path:
        try:
            result = subprocess.run(["npm", "outdated"], 
                                  capture_output=True, text=True, timeout=10)
            return result.stdout if result.stdout else None
        except:
            return None
    
    elif "requirements.txt" in file_path:
        try:
            result = subprocess.run(["pip", "list", "--outdated"], 
                                  capture_output=True, text=True, timeout=10)
            return result.stdout if result.stdout else None
        except:
            return None
    
    return None

def main():
    data = json.load(sys.stdin)
    
    if data.get("tool_name") in ["Write", "Edit"]:
        file_path = data.get("tool_input", {}).get("file_path", "")
        
        if any(dep_file in file_path for dep_file in ["package.json", "requirements.txt"]):
            outdated = check_outdated_deps(file_path)
            
            if outdated:
                print(json.dumps({
                    "decision": "approve",
                    "reason": f"📦 Outdated dependencies detected:\n{outdated[:200]}..."
                }))
                sys.exit(0)
    
    print(json.dumps({"decision": "approve"}))

if __name__ == "__main__":
    main()
```

### 8. PathSanitizer Hook - Path Validation

```python
#!/usr/bin/env python3
"""
Validates paths before file operations.
Prevents common path errors.
"""
import json, sys, os

def validate_path(file_path):
    """Validate file path for common issues"""
    
    issues = []
    
    # Check for spaces without quotes
    if " " in file_path and not (file_path.startswith('"') and file_path.endswith('"')):
        issues.append("Path contains spaces but isn't quoted")
    
    # Check for invalid characters
    invalid_chars = ['<', '>', ':', '|', '?', '*']
    if any(char in file_path for char in invalid_chars):
        issues.append("Path contains invalid characters")
    
    # Check for extremely long paths
    if len(file_path) > 260:  # Windows limit
        issues.append("Path is too long (>260 characters)")
    
    # Check for directory traversal
    if ".." in file_path:
        issues.append("Path contains directory traversal (..) - potential security risk")
    
    return issues

def main():
    data = json.load(sys.stdin)
    
    if data.get("tool_name") in ["Write", "Edit", "Read"]:
        file_path = data.get("tool_input", {}).get("file_path", "")
        
        if file_path:
            issues = validate_path(file_path)
            
            if issues:
                print(json.dumps({
                    "decision": "block",
                    "reason": f"🚫 Path issues:\n" + "\n".join(f"• {issue}" for issue in issues)
                }))
                sys.exit(0)
    
    print(json.dumps({"decision": "approve"}))

if __name__ == "__main__":
    main()
```

## V. Complete Configuration Template

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "python3 ~/.cypher/hooks/safeguard.py",
            "timeout": 3
          },
          {
            "type": "command", 
            "command": "python3 ~/.cypher/hooks/smart-commit.py",
            "timeout": 5
          }
        ]
      },
      {
        "matcher": "Write|Edit|Read",
        "hooks": [
          {
            "type": "command",
            "command": "python3 ~/.cypher/hooks/path-sanitizer.py", 
            "timeout": 2
          },
          {
            "type": "command",
            "command": "python3 ~/.cypher/hooks/secret-guard.py",
            "timeout": 3
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "python3 ~/.cypher/hooks/auto-format.py",
            "timeout": 5
          },
          {
            "type": "command",
            "command": "python3 ~/.cypher/hooks/lint-guard.py",
            "timeout": 8
          },
          {
            "type": "command",
            "command": "python3 ~/.cypher/hooks/test-runner.py",
            "timeout": 15
          },
          {
            "type": "command",
            "command": "python3 ~/.cypher/hooks/dependency-watch.py",
            "timeout": 10
          }
        ]
      }
    ]
  }
}
```

## Key Insights

### 1. The Invisibility Principle
The best hook is the one you never notice. Only intervenes when there's real value.

### 2. Time Budget Strategy
Each hook has a "time budget". If it can't complete in <10 seconds, it shouldn't exist.

### 3. Fail Silent Philosophy
If a hook fails, the flow continues. The hook should never break the user experience.

### 4. Value-First Design
Each hook must answer: "What specific and frequent problem does this solve?"

### 5. Progressive Enhancement
Hooks can be activated gradually. Start with 1-2, add more as needed.

## Result

A **curated hook library** that adds real value without friction, transforming Claude Code into a smarter and safer development platform, **silently**.

The secret: **Hooks that work for you, not against you**.

---

## VI. Cypher-Specific Hooks

### 9. SmartCommitTracker Hook - Dual-Level Git Documentation

Based on Cypher's git integration philosophy and `cypher/project-rules/git-workflow.md`, this hook automatically documents commits at the appropriate level.

```python
#!/usr/bin/env python3
"""
Smart Commit Tracker - Documents commits at the appropriate level
Based on cypher/project-rules/git-workflow.md conventions
"""
import json, sys, subprocess, os, re
from datetime import datetime
from pathlib import Path

def get_commit_context(commit_message, branch_name):
    """Determine if commit is session-level or task-level"""
    
    # Session-level indicators
    session_keywords = ['[PHASE', 'merge:', 'milestone', 'feat: Add', 'feat: Remove', 'refactor:']
    
    # Task-level indicators  
    task_id_pattern = r'\[task-(\d+)\]'
    task_branch_pattern = r'task-(\d+)-'
    
    context = {
        "level": None,
        "task_id": None,
        "is_significant": False
    }
    
    # Check for explicit task ID in commit message
    task_match = re.search(task_id_pattern, commit_message)
    if task_match:
        context["level"] = "task"
        context["task_id"] = task_match.group(1)
        context["is_significant"] = True
        return context
    
    # Check for task branch
    branch_match = re.search(task_branch_pattern, branch_name)
    if branch_match:
        context["level"] = "task"
        context["task_id"] = branch_match.group(1)
        context["is_significant"] = True
        return context
    
    # Check for session-level significance
    if any(keyword.lower() in commit_message.lower() for keyword in session_keywords):
        context["level"] = "session"
        context["is_significant"] = True
        return context
    
    # Check if we're in a CDD directory (indicating task work)
    cwd = os.getcwd()
    if "cypher/cdd/" in cwd and "/sessions/" not in cwd:
        # Try to extract task ID from current directory
        cdd_match = re.search(r'cypher/cdd/([^/]+)', cwd)
        if cdd_match:
            context["level"] = "task"
            context["task_id"] = cdd_match.group(1)
            context["is_significant"] = True
    
    return context

def add_to_session_file(commit_info):
    """Add commit to most recent session file"""
    session_dir = Path("cypher/cdd/sessions")
    if not session_dir.exists():
        return False
    
    session_files = list(session_dir.glob("*.md"))
    if not session_files:
        return False
    
    # Most recent session file
    latest_session = max(session_files, key=lambda f: f.stat().st_mtime)
    
    content = latest_session.read_text(encoding='utf-8')
    
    # Add to "### Commits Clave" section
    if "### Commits Clave" in content:
        pattern = r"(### Commits Clave\n)(.*?)(\n\n## |\Z)"
        
        def replacer(match):
            header = match.group(1)
            existing = match.group(2)
            after = match.group(3) if match.group(3) else ""
            
            new_commit = f"- `{commit_info['hash'][:7]}`: {commit_info['message']}\n"
            return f"{header}{existing}{new_commit}{after}"
        
        content = re.sub(pattern, replacer, content, flags=re.DOTALL)
        latest_session.write_text(content, encoding='utf-8')
        return True
    
    return False

def add_to_task_implementation(task_id, commit_info):
    """Add commit to task's implementation.md"""
    
    # Try multiple possible paths for task implementation
    possible_paths = [
        f"cypher/cdd/task-{task_id}/implementation.md",
        f"cypher/cdd/{task_id}/implementation.md",
        f"cypher/cdd/task{task_id}/implementation.md"
    ]
    
    impl_path = None
    for path in possible_paths:
        if os.path.exists(path):
            impl_path = path
            break
    
    if not impl_path:
        # Create new implementation.md in most likely location
        impl_path = f"cypher/cdd/{task_id}/implementation.md"
        os.makedirs(os.path.dirname(impl_path), exist_ok=True)
        
        with open(impl_path, 'w', encoding='utf-8') as f:
            f.write(f"# Implementation Log - Task {task_id}\n\n")
            f.write(f"## Git Branch\n`{commit_info['branch']}`\n\n")
            f.write("## Commits\n")
    
    # Read existing content
    with open(impl_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add commit to ## Commits section
    new_commit = f"- `{commit_info['hash'][:7]}`: {commit_info['message']}\n"
    
    if "## Commits" in content:
        content = content.replace("## Commits\n", f"## Commits\n{new_commit}")
    else:
        # Add commits section
        content += f"\n## Commits\n{new_commit}"
    
    with open(impl_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

def main():
    data = json.load(sys.stdin)
    
    if data.get("tool_name") == "Bash":
        command = data.get("tool_input", {}).get("command", "")
        
        if "git commit" in command and data.get("tool_response", {}).get("success"):
            try:
                # Get commit and branch info
                commit_hash = subprocess.run(
                    ["git", "rev-parse", "HEAD"], 
                    capture_output=True, text=True, timeout=2
                ).stdout.strip()
                
                commit_message = subprocess.run(
                    ["git", "log", "-1", "--pretty=%s"], 
                    capture_output=True, text=True, timeout=2
                ).stdout.strip()
                
                branch_name = subprocess.run(
                    ["git", "rev-parse", "--abbrev-ref", "HEAD"], 
                    capture_output=True, text=True, timeout=2
                ).stdout.strip()
                
                commit_info = {
                    "hash": commit_hash,
                    "message": commit_message,
                    "branch": branch_name,
                    "date": datetime.now().isoformat()
                }
                
                # Determine context and document appropriately
                context = get_commit_context(commit_message, branch_name)
                
                if context["is_significant"]:
                    if context["level"] == "session":
                        add_to_session_file(commit_info)
                    elif context["level"] == "task" and context["task_id"]:
                        add_to_task_implementation(context["task_id"], commit_info)
                        
            except Exception:
                # Fail silently
                pass
    
    print(json.dumps({"decision": "allow"}))

if __name__ == "__main__":
    main()
```

#### Decision Logic

**Session Level** (documents in `cypher/cdd/sessions/*.md`):
- Commits with `[PHASE`, `merge:`, `milestone`
- Major features/refactors
- Development milestones

**Task Level** (documents in `cypher/cdd/<task-id>/implementation.md`):
- Commits with `[task-123]` in message
- Commits on `task-123-*` branches
- Commits made within specific CDD directories

#### Benefits:
- **Automatic dual-level documentation**
- **Respects existing git-workflow.md conventions**
- **Context-aware**: Knows where to document based on commit context
- **Creates implementation.md automatically** if needed
- **Silent and fast** (<3 seconds)

#### Configuration:
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "python3 ~/.cypher/hooks/smart-commit-tracker.py",
            "timeout": 3
          }
        ]
      }
    ]
  }
}
```

This hook embodies Cypher's philosophy: automatic knowledge preservation without manual overhead. It ensures that implementation progress is always documented at the appropriate level, creating a complete audit trail from high-level phases down to individual task commits.