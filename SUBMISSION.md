# How a week actually works

One week = one branch = one pull request. That is the whole "submission package".

If you only read one thing, read this: **you push every day, not once a week.** The log for
today must be on GitHub tonight. A folder full of logs pushed on Sunday counts as one day,
and the bot will have opened an issue every night in between.

---

## Monday: start the week's branch

```bash
git checkout main
git pull
git checkout -b week-1
```

You now work on `week-1` all week. `main` stays as it was until the PR is merged.

## Every day: work, log, push

Do the hour. Then write today's log and push it:

```bash
# ... you did the work, files are changed ...
cp logs/TEMPLATE.md logs/2026-09-15.md     # today's date
# fill in the 5 lines
git add -A
git commit -m "day 1: ssh keys working, started backup.sh"
git push
```

Three sentences and twenty focused minutes is a valid day. A day with no push is a missed day,
and at 23:30 the bot opens an issue saying so. Close the issue by pushing the log.

## Sunday, before 9pm: open the pull request

```bash
git push
gh pr create --base main --head week-1 --title "Week 1"
```

Or press the green "Compare & pull request" button GitHub shows you.

A form appears already filled with headings. Complete it. That filled-in form **is** the
submission package. Nothing is emailed, nothing is uploaded anywhere else.

### What a finished one looks like

> ## Week 1 submission
>
> **What runs:** `bash backup.sh ~/projects` creates `backup-2026-09-20.tar.gz` and skips
> `node_modules`. Tested on a fresh Ubuntu VM.
>
> **Done-when line met?** yes
>
> **DSA:** 3/3 · Two Sum 25 min · Best Time to Buy and Sell Stock 40 min (needed a hint on the
> running-minimum idea) · Contains Duplicate 10 min
>
> **What I'd do differently:** I fought the tar flags for an hour before reading `man tar`.
> Next time I read the manual first.
>
> **Where I need review most:** the error handling in `backup.sh` when the folder does not
> exist. I am not sure my exit codes are right.
>
> ## Checklist
> - [x] 7 daily logs in `logs/`
> - [x] No secrets committed
> - [x] README updated if setup changed
> - [x] A peer has reviewed this before mentor review

Honest beats impressive. "Done-when met? partly" with a clear reason is a good submission.
A vague "everything works" is not.

## Monday: review each other

Open the other person's PR, read the code, leave **at least two real comments**. A real comment
asks or points at something specific:

- "Why `chmod 777` here? Would 755 work?"
- "This breaks if the folder name has a space in it, try it."

"Nice work 👍" is not a review.

## By Wednesday: Shina reviews

He approves, or requests changes. If he requests changes, push fixes to the same branch, the
PR updates itself. Once approved, merge it, and start the next branch from `main`.

---

## The fortnightly call

Sundays at 8pm, every second week: 27 Sep, 11 Oct, 25 Oct, 8 Nov, 22 Nov, 6 Dec. Sixty minutes.
You demo what runs, ask what you could not solve in writing, and hear what the next fortnight is.

The call is **not** where work gets submitted or checked. That happens in the PR, weekly, whether
or not a call is happening. On the six weeks with no call, nothing changes: branch, push daily,
PR by Sunday 9pm.

The call holds even if only one person shows up.

## Quick answers

**Do I push once a week?** No. Daily. The bot checks nightly.

**Can I commit straight to `main`?** No. Then there is nothing to open a PR from.

**I missed Tuesday.** Log Wednesday and carry on. Two missed *weekly deliverables* pauses you,
one missed daily log does not.

**Finished early?** Open the PR early. Reviews can start sooner.

**Stuck more than 45 minutes?** Write the blocker in the log and in the group. AI first, then
your peer, then Shina.
