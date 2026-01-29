# Commit Message Generation Rules

You are given a Git diff from this repository.

Your task is to generate a Git commit message and write it as plain text suitable for saving into a file named commit-message.txt.

Format requirements
run a git list of modified or new files then diff the files to see what changed
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
