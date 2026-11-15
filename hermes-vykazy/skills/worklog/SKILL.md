---
name: worklog
description: Capture work notes and draft daily logs and weekly reports
version: 1.0.0
metadata:
  hermes:
    tags: [timesheet, work-log, reporting]
    category: productivity
---

# Worklog

Turns voice notes, Plaud meeting summaries, forwarded documents and short text
notes into an evidence-based daily work log and a weekly report / timesheet.
All files live in the WorkLog folder (see AGENTS.md in that folder for the
owner's role, project list, project codes and report format).

## When to Use

- The user sends a message, voice note or file that starts with "log", "worklog",
  "note" or is a shared Plaud summary / transcript.
- The user types `/worklog` with or without text.
- A scheduled job asks for "DAILY CLOSE", "WEEKLY REPORT" or "IMPACT DIGEST".

## Folder layout (inside the WorkLog folder)

- `inbox/` raw inputs, one file per item: `YYYY-MM-DD_HHMM_<source>_<short-title>.md`
- `daily/YYYY-MM-DD.md` daily log
- `weekly/YYYY-Www.md` weekly report (ISO week), optional `.docx` copy
- `impact-log.md` running list of notable contributions
- `templates/weekly-template.md` the employer's report format (if present, follow it exactly)

## Procedure

### A. CAPTURE (any incoming note, voice note or file)

1. Save the raw input to `inbox/` using the naming pattern above. For files, store
   the extracted text, not the original binary. Keep the original wording.
2. Extract work entries. One entry = one activity:
   `start time | duration (h) | project code | category | what was done | with whom | source`
   Categories: Design, Coordination & meetings, Review & QA, Support for others,
   Site, Documentation, Admin, Other.
3. Append the entries to `daily/<today>.md` (create it if missing).
4. Reply in ONE short line: what was logged and anything missing
   (e.g. "Logged 1.5 h P-2301 Review & QA. Missing: who requested it?").

### B. DAILY CLOSE (scheduled, weekdays)

1. Read today's `inbox/` files and `daily/<today>.md`.
2. Merge duplicates (a Plaud meeting and a voice note about the same meeting are
   one entry). Sort by start time.
3. Write the final table to `daily/<today>.md` with a total of hours and a
   "Gaps" list (missing durations, unknown project codes, unexplained time).
4. Add any notable contribution (problem solved, risk caught, rework of someone
   else's output, decision unblocked) to `impact-log.md` with date and source.
5. Reply with: total hours, 3-6 bullet summary, the Gaps list as questions.
   Keep it under 120 words.

### C. WEEKLY REPORT (scheduled, Friday)

1. Read `daily/` files for Monday to today of the current ISO week and the
   week's entries in `impact-log.md`.
2. If `templates/weekly-template.md` exists, follow its structure exactly.
   Otherwise produce:
   - Timesheet table: project code, project name, hours per day, total.
   - Key outcomes (5-8 bullets, outcome first, then evidence).
   - Coordination and meetings (count and total hours).
   - Support and quality assurance for others (see Pitfalls for wording).
   - Next week: open items and risks.
3. Save to `weekly/YYYY-Www.md`. If asked for Word, also create the `.docx`.
4. Reply with a 5-line summary and attach the file using `MEDIA:<absolute path>`.
   This is a DRAFT for the user to review. Never send it to anyone else.

### D. IMPACT DIGEST (scheduled, monthly)

Summarise the last month of `impact-log.md` into 5-10 achievement statements
suitable for a performance review: situation, action, result, evidence.

## Pitfalls

- Never invent hours, people, decisions or project codes. Durations come only
  from recording length, an explicit statement by the user, or a calendar entry.
  If unknown, write `?` and list it under Gaps.
- Every entry must name its source (Plaud recording title and time, voice note
  time, email subject, file name).
- Rework or fixes of other people's work: describe the issue and the fix in
  neutral, factual language. No blame, no adjectives about colleagues, no names
  unless the user explicitly asks. Example: "Corrected grid references in the
  tender drawing set (24 sheets) before issue; prevented a re-issue." NOT
  "Fixed X's careless mistakes again."
- Do not copy full meeting transcripts into reports. Summarise outcomes only.
- Do not include client-confidential details (fees, disputes, personal data)
  in the weekly report unless the user explicitly asks.
- Use the language and spelling set in AGENTS.md (default: British English).

## Verification

- Daily file total equals the sum of the table rows.
- Every row has a source.
- Weekly totals per project equal the sum of the daily files.
