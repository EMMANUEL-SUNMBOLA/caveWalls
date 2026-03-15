# Commit Message Generation Rules

You are given a Git diff from this repository.

Your task is to generate a Git commit message and write it as plain text suitable for saving into a file named commit-message.txt.

Workflow

1. Run `git status && git diff HEAD && git log -n 3 --oneline` to see changes
2. Generate the commit message and present it for user review first
3. After approval, write to commit-message.txt
4. Commit using: `git add . && git commit -F commit-message.txt && git push`
   - Use `git add .` (not `git add -A`)
   - Push without specifying a branch

Format requirements
The output must contain exactly the text that should appear inside commit-message.txt.
Do not include explanations, comments, or code fences.
Do not include the filename itself in the output.

Commit message structure

Line 1  
A conventional commit style summary line.

Rules for summary line  
Use a type prefix such as feat, fix, or chore  
Imperative tense  
Business readable language  
High level summary of the outcome  
Fewer than 72 characters

Line 2  
Blank line

Lines 3 onward  
A concise change summary list.

Rules for change summary  
Use asterisk bullets  
Short clear statements  
Describe what was added, changed, or fixed  
Avoid low level implementation details

Input
Git diff

Output
Only the commit message text exactly as it should appear in commit-message.txt

Feature Rating Task (not included in commit message)
After generating the commit message, rate each implemented feature on a grade scale (A-F) with brief notes. Present this as a table before the commit message. This helps track implementation quality over time.
