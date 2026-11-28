---
name: git-comment
description: "Create a concise Git commit message or change summary that follows the repository rules and accurately describes the implemented changes. Use when the user asks for a git comment, commit message, change description, PR summary, or a short explanation of a diff."
---

# Git Comment

Create a short, specific comment for the current Git changes. The comment may be used as a commit message, PR change summary, or review note depending on the user's request.

## Workflow

1. Read the repository instructions that apply to the changed files.
   - Check `.github/copilot-instructions.md`, `AGENTS.md`, applicable instruction files, and contribution guidance.
   - Follow the repository's language, formatting, commit prefix, and scope conventions.
2. Inspect the current change set.
   - Review `git status` and the relevant `git diff`.
   - Use nearby code or tests only when needed to understand the purpose of a change.
   - Do not describe generated files as hand-written work unless the diff confirms it.
3. Identify the primary intent of the changes.
   - Prefer the smallest accurate scope.
   - Mention the affected feature, module, or behavior.
   - Include important implementation details only when they help explain why the change matters.
4. Produce the requested comment.
   - Keep the default to one concise line.
   - Use a short title plus an optional body only when the change needs context.
   - State what changed and, when useful, the outcome or reason.
   - Avoid vague wording such as `update files`, `fix stuff`, or `changes`.
   - Do not invent tests, behavior, issue IDs, or business requirements.
5. Validate the result.
   - Confirm that the comment matches the actual diff.
   - Remove unrelated changes from the description.
   - Keep the wording within the requested length.

## Default Format

Use this format unless the repository or user requests another one:

```text
<type>(<scope>): <imperative description>
```

Use a body only when needed:

```text
<type>(<scope>): <imperative description>

<one short paragraph explaining the key implementation detail or reason>
```

Common types are `feat`, `fix`, `refactor`, `test`, `docs`, `build`, `ci`, and `chore`. Use the repository's existing convention when it differs.

## Quality Rules

- Be concise: one line by default, generally no more than 72 characters for the title.
- Use imperative mood: `Add`, `Fix`, `Update`, `Remove`, or the equivalent repository language.
- Describe behavior or intent, not file mechanics.
- Mention security, migration, API contract, or breaking behavior when it is materially part of the diff.
- If the diff contains multiple unrelated intents, ask whether to create separate comments or provide a short list of comments.
- If there is no meaningful diff, say that there are no changes to summarize.
- Never run `git commit` unless the user explicitly asks for a commit.

## Output

Return only the comment by default. If the user asks for alternatives, provide at most three concise options and label the recommended one.
