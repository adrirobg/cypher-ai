# Claude CLI Hooks Implementation Guide

## Overview

This guide describes a hooks system for Claude CLI that provides intelligent command validation, automatic context management, and session continuity. The system intercepts Claude's file operations and bash commands to add safety checks, learning capabilities, and automatic backup functionality.

## Hook Architecture

### Available Hook Points

The system supports 8 hook points that integrate with Claude CLI:
- **pre-read** / **post-read**: Before/after file reading operations
- **pre-edit** / **post-edit**: Before/after file editing operations  
- **pre-write** / **post-write**: Before/after file writing operations
- **pre-bash** / **post-bash**: Before/after bash command execution

### Configuration

Hooks are configured in a JSON file (`config/hooks_config.json`):

```json
{
  "hooks": {
    "pre-edit": "python3 hooks/pre_edit.py",
    "post-edit": "python3 hooks/post_edit.py",
    "pre-bash": "python3 hooks/pre_bash.py",
    "post-bash": "python3 hooks/post_bash.py",
    "pre-read": "python3 hooks/pre_read.py",
    "post-read": "python3 hooks/post_read.py",
    "pre-write": "python3 hooks/pre_write.py",
    "post-write": "python3 hooks/post_write.py"
  }
}
```

### Hook Implementation Pattern

Each hook follows a standard pattern:

```python
#!/usr/bin/env python3
import sys
import json

def main():
    # Read input from stdin
    input_data = json.loads(sys.stdin.read())
    
    # Perform validation/checks
    # Can access: file_path, old_string, new_string, command, etc.
    
    # Return response
    response = {
        "allow": True,  # or False to block
        "message": "Validation passed"
    }
    
    print(json.dumps(response))

if __name__ == "__main__":
    main()
```

## Key Features

### 1. Auto-Compact Integration

The most powerful feature is automatic session backup before Claude's context compaction:

#### Context Monitoring
- Continuously estimates token usage during sessions
- Triggers automatic backup at 90% capacity threshold
- Prevents loss of work when context limits are reached

#### Enhanced Git Backup
- **Directory-Safe Operations**: Uses `cwd` parameter to avoid changing directories
- **Auto-Initialize**: Automatically creates git repository if none exists
- **Resilient Design**: Session backup continues even if git operations fail
- **Audit Trail**: All git operations logged to `/tmp/git_backup.log`
- **Graceful Degradation**: Non-blocking failures ensure work is never lost

#### Pre-Compact Backup Hook
When triggered, automatically:
1. Captures all modified files
2. Saves session summaries
3. Creates git commits with descriptive messages
4. Generates continuation documentation
5. Notifies user with clear next steps

### 2. Session Continuity

The system maintains context across Claude sessions through:

- **LAST_SESSION.md**: Quick reference of previous session's work
- **ACTIVE_TODOS.md**: Current task tracking that persists
- **Session Summaries**: Detailed logs in `docs/development/`
- **Automatic Git Commits**: Preserves work state at key moments

### 3. Intelligent Validation

Pre-execution hooks can:
- Validate file paths before operations
- Check for common mistakes (e.g., python vs python3)
- Prevent edits to non-existent files
- Enforce project-specific coding standards
- Block potentially harmful commands

### 4. Shadow Learner Integration

A background learning system watches hook interactions to:
- Learn from command patterns and outcomes
- Identify common mistakes and prevent their recurrence
- Build knowledge of user habits and preferences
- Provide increasingly intelligent suggestions over time

## Implementation Examples

### Hook Blocking in Action

When a hook blocks an operation, it provides clear feedback:

```
$ pip --help
Bash operation blocked by hook:
- ⛔ pip commands fail (command not found) (confidence: 95%)
```

This demonstrates how the shadow learner prevents known problematic commands based on learned patterns.

### Basic Pre-Edit Hook

```python
#!/usr/bin/env python3
import sys
import json
import os

def validate_edit(file_path, old_string, new_string):
    # Check if file exists
    if not os.path.exists(file_path):
        return False, f"File {file_path} does not exist"
    
    # Check for python3 usage
    if "python " in new_string and "python3" not in new_string:
        return True, "Warning: Consider using python3 instead of python"
    
    return True, "Edit validated"

def main():
    input_data = json.loads(sys.stdin.read())
    
    file_path = input_data.get("file_path", "")
    old_string = input_data.get("old_string", "")
    new_string = input_data.get("new_string", "")
    
    allow, message = validate_edit(file_path, old_string, new_string)
    
    response = {
        "allow": allow,
        "message": message
    }
    
    print(json.dumps(response))

if __name__ == "__main__":
    main()
```

### Context Monitor Implementation

```python
#!/usr/bin/env python3
import json
import subprocess
from datetime import datetime

def estimate_context_usage():
    # Estimate tokens based on session activity
    # This is a simplified example
    return 0.92  # 92% usage

def trigger_backup():
    # Create session summary
    summary = {
        "timestamp": datetime.now().isoformat(),
        "files_modified": get_modified_files(),
        "todos": get_active_todos()
    }
    
    # Save to persistent storage
    with open("docs/development/session_backup.json", "w") as f:
        json.dump(summary, f, indent=2)
    
    # Git backup with improved error handling
    try:
        # Check if git repo exists, initialize if needed
        if not os.path.exists(".git"):
            subprocess.run(["git", "init"], cwd=os.getcwd())
        
        # Use cwd parameter to avoid directory changes
        subprocess.run(["git", "add", "-A"], cwd=os.getcwd())
        subprocess.run(["git", "commit", "-m", "Auto-backup before context compact"], 
                      cwd=os.getcwd())
        
        # Log success
        with open("/tmp/git_backup.log", "a") as log:
            log.write(f"{datetime.now()}: Git backup successful\n")
    except Exception as e:
        # Log failure but continue
        with open("/tmp/git_backup.log", "a") as log:
            log.write(f"{datetime.now()}: Git backup failed: {e}\n")
    
    # Notify user - continues regardless of git status
    with open("CONTEXT_BACKUP_COMPLETE.md", "w") as f:
        f.write("# Context Backup Complete\n\n")
        f.write("Your work has been saved. To continue:\n")
        f.write("1. Start a new Claude session\n")
        f.write("2. Reference LAST_SESSION.md\n")
        f.write("3. Check ACTIVE_TODOS.md\n")

def main():
    usage = estimate_context_usage()
    if usage > 0.9:
        trigger_backup()

if __name__ == "__main__":
    main()
```

## Benefits

1. **Never Lose Work**: Automatic backups before context limits
2. **Seamless Continuity**: Pick up exactly where you left off
3. **Error Prevention**: Catch mistakes before they happen
4. **Learning System**: Improves over time based on usage patterns
5. **Git Integration**: Automatic commits preserve work history
6. **Customizable**: Add project-specific validations easily

## Setup Instructions

1. Create a `hooks/` directory in your project
2. Implement desired hook scripts
3. Configure Claude CLI to use your hooks configuration
4. Set appropriate permissions: `chmod +x hooks/*.py`
5. Test with simple commands first

## Best Practices

1. **Keep Hooks Fast**: Validation should be quick to avoid slowing down Claude
2. **Fail Gracefully**: Don't block operations unless absolutely necessary
3. **Log Wisely**: Record important events without cluttering output
4. **Test Thoroughly**: Ensure hooks work across different scenarios
5. **Document Behavior**: Make it clear what each hook does

## Conclusion

This hooks system transforms Claude CLI into a more intelligent, reliable development assistant. By intercepting operations at key points, it provides safety nets, maintains context across sessions, and learns from usage patterns to prevent future mistakes. The automatic backup integration with Claude's context compaction ensures you never lose work, while the shadow learner quietly improves the experience over time.

 Claude CLI Hooks Implementation Guide

## Overview

This guide describes a hooks system for Claude CLI that provides intelligent command validation, automatic context management, and session continuity. The system intercepts Claude's file operations and bash commands to add safety checks, learning capabilities, and automatic backup functionality.

## Hook Architecture

### Available Hook Points

The system supports 8 hook points that integrate with Claude CLI:
- **pre-read** / **post-read**: Before/after file reading operations
- **pre-edit** / **post-edit**: Before/after file editing operations  
- **pre-write** / **post-write**: Before/after file writing operations
- **pre-bash** / **post-bash**: Before/after bash command execution

### Configuration

Hooks are configured in a JSON file (`config/hooks_config.json`):

```json
{
  "hooks": {
    "pre-edit": "python3 hooks/pre_edit.py",
    "post-edit": "python3 hooks/post_edit.py",
    "pre-bash": "python3 hooks/pre_bash.py",
    "post-bash": "python3 hooks/post_bash.py",
    "pre-read": "python3 hooks/pre_read.py",
    "post-read": "python3 hooks/post_read.py",
    "pre-write": "python3 hooks/pre_write.py",
    "post-write": "python3 hooks/post_write.py"
  }
}
```

### Hook Implementation Pattern

Each hook follows a standard pattern:

```python
#!/usr/bin/env python3
import sys
import json

def main():
    # Read input from stdin
    input_data = json.loads(sys.stdin.read())
    
    # Perform validation/checks
    # Can access: file_path, old_string, new_string, command, etc.
    
    # Return response
    response = {
        "allow": True,  # or False to block
        "message": "Validation passed"
    }
    
    print(json.dumps(response))

if __name__ == "__main__":
    main()
```

## Key Features

### 1. Auto-Compact Integration

The most powerful feature is automatic session backup before Claude's context compaction:

#### Context Monitoring
- Continuously estimates token usage during sessions
- Triggers automatic backup at 90% capacity threshold
- Prevents loss of work when context limits are reached

#### Pre-Compact Backup Hook
When triggered, automatically:
1. Captures all modified files
2. Saves session summaries
3. Creates git commits with descriptive messages
4. Generates continuation documentation
5. Notifies user with clear next steps

### 2. Session Continuity

The system maintains context across Claude sessions through:

- **LAST_SESSION.md**: Quick reference of previous session's work
- **ACTIVE_TODOS.md**: Current task tracking that persists
- **Session Summaries**: Detailed logs in `docs/development/`
- **Automatic Git Commits**: Preserves work state at key moments

### 3. Intelligent Validation

Pre-execution hooks can:
- Validate file paths before operations
- Check for common mistakes (e.g., python vs python3)
- Prevent edits to non-existent files
- Enforce project-specific coding standards
- Block potentially harmful commands

### 4. Shadow Learner Integration

A background learning system watches hook interactions to:
- Learn from command patterns and outcomes
- Identify common mistakes and prevent their recurrence
- Build knowledge of user habits and preferences
- Provide increasingly intelligent suggestions over time

## Implementation Example

### Basic Pre-Edit Hook

```python
#!/usr/bin/env python3
import sys
import json
import os

def validate_edit(file_path, old_string, new_string):
    # Check if file exists
    if not os.path.exists(file_path):
        return False, f"File {file_path} does not exist"
    
    # Check for python3 usage
    if "python " in new_string and "python3" not in new_string:
        return True, "Warning: Consider using python3 instead of python"
    
    return True, "Edit validated"

def main():
    input_data = json.loads(sys.stdin.read())
    
    file_path = input_data.get("file_path", "")
    old_string = input_data.get("old_string", "")
    new_string = input_data.get("new_string", "")
    
    allow, message = validate_edit(file_path, old_string, new_string)
    
    response = {
        "allow": allow,
        "message": message
    }
    
    print(json.dumps(response))

if __name__ == "__main__":
    main()
```

### Context Monitor Implementation

```python
#!/usr/bin/env python3
import json
import subprocess
from datetime import datetime

def estimate_context_usage():
    # Estimate tokens based on session activity
    # This is a simplified example
    return 0.92  # 92% usage

def trigger_backup():
    # Create session summary
    summary = {
        "timestamp": datetime.now().isoformat(),
        "files_modified": get_modified_files(),
        "todos": get_active_todos()
    }
    
    # Save to persistent storage
    with open("docs/development/session_backup.json", "w") as f:
        json.dump(summary, f, indent=2)
    
    # Create git commit
    subprocess.run(["git", "add", "-A"])
    subprocess.run(["git", "commit", "-m", "Auto-backup before context compact"])
    
    # Notify user
    with open("CONTEXT_BACKUP_COMPLETE.md", "w") as f:
        f.write("# Context Backup Complete\n\n")
        f.write("Your work has been saved. To continue:\n")
        f.write("1. Start a new Claude session\n")
        f.write("2. Reference LAST_SESSION.md\n")
        f.write("3. Check ACTIVE_TODOS.md\n")

def main():
    usage = estimate_context_usage()
    if usage > 0.9:
        trigger_backup()

if __name__ == "__main__":
    main()
```

## Benefits

1. **Never Lose Work**: Automatic backups before context limits
2. **Seamless Continuity**: Pick up exactly where you left off
3. **Error Prevention**: Catch mistakes before they happen
4. **Learning System**: Improves over time based on usage patterns
5. **Git Integration**: Automatic commits preserve work history
6. **Customizable**: Add project-specific validations easily

## Setup Instructions

1. Create a `hooks/` directory in your project
2. Implement desired hook scripts
3. Configure Claude CLI to use your hooks configuration
4. Set appropriate permissions: `chmod +x hooks/*.py`
5. Test with simple commands first

## Best Practices

1. **Keep Hooks Fast**: Validation should be quick to avoid slowing down Claude
2. **Fail Gracefully**: Don't block operations unless absolutely necessary
3. **Log Wisely**: Record important events without cluttering output
4. **Test Thoroughly**: Ensure hooks work across different scenarios
5. **Document Behavior**: Make it clear what each hook does

## Conclusion

This hooks system transforms Claude CLI into a more intelligent, reliable development assistant. By intercepting operations at key points, it provides safety nets, maintains context across sessions, and learns from usage patterns to prevent future mistakes. The automatic backup integration with Claude's context compaction ensures you never lose work, while the shadow learner quietly improves the experience over time.