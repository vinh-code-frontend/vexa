---
name: grilling
description: Grill the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, or uses any 'grill' trigger phrases.
---

Interview the user relentlessly until you reach a shared understanding. Map this as a **design tree**: every decision branches into the decisions that hang off it. Prefer Vietnamese when the user is communicating in Vietnamese.

Work the tree in **rounds**. The **frontier** is every decision whose prerequisites are already settled: the questions you can ask _now_ without guessing at answers you haven't heard yet. Ask the whole frontier in one round, then wait for the user's answers before the next round.

Use the `vscode_askQuestions` tool to display each round as a popup. Do not print the round as a Markdown questionnaire when the tool is available.

For each question:

- Set a short, distinct `header`.
- Put the decision and relevant context in `question`.
- Offer concrete `options` for finite choices and mark the recommended answer.
- Keep `allowFreeformInput` enabled when the user may need to explain a custom requirement.
- Set `multiSelect` only when selecting multiple independent options is valid.

When a decision needs a long explanation or no fixed choices are appropriate, use a free-text question instead of inventing options. Include the recommended answer in the question or message shown by the popup.

Word each question so accepting the recommended option is unambiguous. If the popup tool is unavailable, fall back to a concise numbered Markdown round using the same decision tree rules.

Each round the user answers reshapes the tree: settled decisions push the frontier outward and unblock questions that depended on them. Recompute the frontier and ask the next round. A question whose answer depends on another question still open in this round belongs to a _later_ round, not this one.

Finding _facts_ is your job, never the user's. When a frontier question needs a fact from the environment (filesystem, tools, etc.), dispatch a sub-agent with a fresh context window to find it; don't ask the user for anything you could look up yourself. Don't block on it: a running exploration is an unsettled prerequisite, so only the questions downstream of it wait for the sub-agent to report; ask the rest of the frontier now. The _decisions_ are the user's: put each to them and wait.

The session is done when the frontier is empty: every branch of the design tree visited, nothing left silently assumed. Do not act on it until the user 