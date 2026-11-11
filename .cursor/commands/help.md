# Help - Available Commands

Show the user all available Cursor commands and guide them on what to do.

## Instructions for AI

Display this information in a friendly, clear way:

---

## Welcome! Here are the commands you can use:

### `/setup`

**Run this first!** Installs everything the project needs to work.

- Enables pnpm via Corepack
- Downloads all project dependencies from the lockfile
- Creates `.env` from `.env.example`
- Optionally sets up Postgres (Docker or hosted URL)
- Takes about 1-2 minutes

### `/start`

**Launches the app** so you can see it in the browser.

- Starts the development server
- Open http://localhost:3000 to see Project Compass
- Changes you make will auto-refresh
- The project list does not need a database

### `/help`

**You're here!** Shows this list of commands.

---

## Suggested Workflow

**First time?** Do this:

1. Type `/setup` and wait for it to finish
2. Type `/start` to launch the app
3. Open http://localhost:3000 in your browser

**Need help anytime?**

- Type `/help` to see this guide
- Or just ask in the chat

---

## Tone

Be warm and welcoming. Make the next step obvious.
