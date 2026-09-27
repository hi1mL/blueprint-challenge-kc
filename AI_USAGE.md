# AI Usage Log

### Turn 1 — 2026-09-26T14:36:01-07:00
Tool/assistant: Claude Code (Claude desktop app, Code tab)
Model: claude-opus-5-5 (Claude Opus 5.5)
Model identity source: runtime metadata
Capture: Live
Status: Completed

#### User prompt — verbatim
````text
1. Read AGENTS.md and follow its logging rules for this entire session. Then list the files in this folder and explain what the starter code does. Don't write any code yet.
````

#### Assistance and code contribution
- Read `AGENTS.md` (supplied to the assistant as project instructions) and created
  `AI_USAGE.md` with this entry (generated; logging file only, no application code).
- Listed files with `git ls-files` and `ls -la`.
- Read (review only, no changes): `README.md`, `docker-compose.yml`,
  `backend/app.py`, `backend/database.py`, `backend/db_models.py`,
  `backend/models.py`, `backend/requirements.txt`, `backend/docker-compose.yml`,
  `backend/tests/test_routes.py`, `.github/workflows/tests.yml`,
  `frontend/src/App.tsx`, `frontend/src/api/api.ts`, `frontend/src/types.ts`,
  `frontend/src/components/*.tsx` (incl. `components.test.tsx`),
  `frontend/src/App.test.tsx`, `frontend/src/api/api.test.ts`,
  `frontend/package.json`, `scripts/check_readiness.py`, `scripts/smoke-test.sh`.
- No application code written or modified, per the user's request.
- No applicant edits observed (git status was clean at session start).

#### Verification
Not run (no tests or builds executed; explanation only).

#### Assistant response — verbatim
`````markdown
I've read `AGENTS.md` and started `AI_USAGE.md` with this turn logged. No application code was written.

## Files

**Root:** `AGENTS.md` (AI-logging rules), `AI_USAGE.md` (new log), `README.md` (challenge spec), `docker-compose.yml` (Postgres + backend + frontend), `.github/workflows/tests.yml` (CI grading), `.dockerignore`, `.gitignore`

**backend/** — `app.py`, `database.py`, `db_models.py`, `models.py`, `requirements.txt`, `Dockerfile`, `docker-compose.yml` (backend+db only), `tests/test_routes.py`. `__pycache__/*.pyc` files are also committed; they're just build leftovers.

**frontend/** — Vite + React 19 + TypeScript. `src/App.tsx`, `src/api/api.ts`, `src/types.ts`, `src/components/{BookList,BookForm,BookDetail,CheckoutForm}.tsx`, tests (`App.test.tsx`, `api/api.test.ts`, `components/components.test.tsx`), plus Jest, ESLint, TS and Vite config.

**scripts/** — `check_readiness.py` (CI gate), `smoke-test.sh` (curl checks against running containers).

## What the starter code does

It's a LibraryConnect catalog app. Staff can add books, search and filter them, and record checkouts. The structure is all in place, but the parts that actually do the work are stubbed out with TODOs.

### Backend (FastAPI + SQLAlchemy)
- **`models.py`**: Pydantic schemas that already enforce validation: the `BookGenre` enum (6 values), `EmailStr` for the publisher email, and `date` for the checkout date. This is what produces 422 on bad input.
- **`db_models.py`**: `Book` and `Checkout` ORM tables. `Checkout.book_id` is a foreign key to `books.id`, and the relationship cascades.
- **`database.py`**: builds the engine from `DATABASE_URL` (falls back to SQLite) and provides the `get_db()` session dependency.
- **`app.py`**: CORS is set up for `localhost:5173` and there's a working `GET /` healthcheck. All 5 endpoints (`POST/GET /books`, `GET /books/{id}`, `POST /checkouts`, `GET /books/{id}/checkouts`) currently `raise HTTPException(501, "TODO…")`. Two gaps to note: nothing injects `get_db`, and nothing calls `Base.metadata.create_all`, so tables would never get created against real Postgres. The tests create their own tables.

### Frontend (React)
- **Components**: fully rendered and presentational (props in, callbacks out). They have labeled inputs, a genre filter, a "View Details" button, a checkout history list, and the forms. Their remaining TODOs are optional UX work: validation, empty state, submit confirmation, and prefilling the book.
- **`api/api.ts`**: all 5 functions `throw new Error("TODO…")`. The base URL is hardcoded to `http://localhost:8000`.
- **`App.tsx`**: holds the state (books, selected book, checkouts, filters, both forms). Every handler is stubbed with `setError("TODO…")`. Because the form `onChange` handlers are stubs, typing in a form doesn't do anything yet.

### Tests and grading
- **Backend tests** (in-memory SQLite, override `get_db`): check 422 validation, create/list/get, search plus genre filter (`q=career&genre=Reference` → 1 result, case-insensitive), 404 for a missing book on `GET /books/{id}`, `POST /checkouts`, and `GET /books/{id}/checkouts`, and that the checkout list only includes the requested book. Create endpoints may return 200 or 201.
- **Frontend tests**: check the exact fetch contract (inactive filters like `''`/`'All'` are left out of the query, special characters are URL-encoded, POSTs send a JSON content-type). `App.test.tsx` mocks the API and drives the full UI: filtering, creating a book that then appears in the list, viewing details and history, and creating a checkout that shows up next to existing history.
- **CI**: `check_readiness.py` skips grading while any executable `TODO: implement` stub remains in `app.py`, `App.tsx`, or `api.ts`. Once those are gone, it runs pytest (Py 3.12) and Jest (Node 22). The README says not to modify the tests or the workflow, and to keep the component props, labels, and headings as they are.

To pass, the work is: implement the 5 backend routes (with DB wiring and table creation), the 5 API functions, and the 6 `App.tsx` handlers. Let me know when you want to start.
`````

### Turn 2 — 2026-09-26T14:43:43-07:00
Tool/assistant: Claude Code (Claude desktop app, Code tab)
Model: claude-opus-5-5 (Claude Opus 5.5)
Model identity source: runtime metadata
Capture: Live
Status: Completed

#### User prompt — verbatim
````text
Now read README.md, this has the challenge description. list the files in this folder and explain what the starter code does, then break down the challenge into pieces representing the the order we should built them. no code yet
````

#### Assistance and code contribution
- Appended this Turn 2 entry to `AI_USAGE.md` (logging only).
- Ran `git status --short` and `git diff --stat HEAD -- README.md`. README.md and all
  other tracked files were unchanged since Turn 1; the only untracked file was `AI_USAGE.md`.
  Relied on the full README/source/test contents read in Turn 1 rather than re-reading them.
- Planning only: produced an ordered build plan (backend DB wiring → book routes →
  checkout routes → frontend API layer → App.tsx state/handlers → UX TODOs → end-to-end
  verification and submission). No application code written or modified.
- No applicant edits observed.

#### Verification
Not run (no tests or builds executed; planning only).

#### Assistant response — verbatim
`````markdown
I read `README.md` in full last turn. `git status` shows it and every other tracked file are unchanged since then; the only new file is `AI_USAGE.md`, where this turn is logged. No code written.

## Files (unchanged from last turn)

- **Root:** `README.md` (challenge spec), `AGENTS.md`, `AI_USAGE.md`, `docker-compose.yml`, `.github/workflows/tests.yml`, `.gitignore`, `.dockerignore`
- **backend/:** `app.py` (routes), `models.py` (Pydantic schemas), `db_models.py` (SQLAlchemy tables), `database.py` (engine/session), `requirements.txt`, `Dockerfile`, `docker-compose.yml`, `tests/test_routes.py`
- **frontend/src/:** `App.tsx` (state + handlers), `api/api.ts` (fetch calls), `types.ts`, `components/` (`BookList`, `BookForm`, `BookDetail`, `CheckoutForm`), plus three test files
- **scripts/:** `check_readiness.py` (CI grading gate), `smoke-test.sh`

## What the starter code does

The challenge asks for an internal tool where library staff manage a book catalog (create, list, view details), search by title and filter by genre, and record and view checkouts per book. The stack is React, FastAPI, and PostgreSQL.

The starter gives you the scaffolding, and everything that actually does work is a stub:
- **Done already:** Pydantic validation (genre enum, email, date → automatic 422s), the ORM tables `Book`/`Checkout` with a foreign key, the DB engine and `get_db()`, CORS, the healthcheck, all four UI components (labels, headings, and callbacks the tests depend on), types, Docker setup, and tests.
- **Stubbed:** all 5 backend routes return 501, all 5 `api.ts` functions throw, and all 6 `App.tsx` handlers only set a TODO error. Tables are also never created, and routes aren't wired to a DB session.
- **Grading:** CI skips grading until those `TODO: implement` stub lines are gone, then requires pytest and Jest to both pass. Tests and workflow must stay unchanged.

## Build order

**1. Backend foundation** (`backend/app.py`)
- Create tables at startup (`Base.metadata.create_all`, ideally in a lifespan hook).
- Inject `db: Session = Depends(get_db)` into the routes. The tests override `get_db`, so this is required.

**2. Book endpoints**
- `POST /books`: save the book and return it with its `id` (201).
- `GET /books/{id}`: return the book, or 404.
- `GET /books?q=&genre=`: case-insensitive title match (`ilike`) plus an optional genre filter.
- ✅ Checkpoint: the book tests in `pytest backend/tests` pass.

**3. Checkout endpoints**
- `POST /checkouts`: 404 if the book doesn't exist, otherwise save it and return it.
- `GET /books/{id}/checkouts`: 404 if the book doesn't exist, otherwise that book's checkouts only.
- ✅ Checkpoint: all 12 backend tests pass.

**4. Frontend API layer** (`frontend/src/api/api.ts`)
- A small fetch helper that throws on `!response.ok`.
- `listBooks` should build the query with `URLSearchParams` and leave out an empty `q` and `genre === 'All'`.
- POSTs send `Content-Type: application/json`.
- ✅ Checkpoint: `api.test.ts` passes.

**5. App wiring** (`frontend/src/App.tsx`), one handler at a time:
1. The form `onChange` handlers: just set state. Nothing else works until these do.
2. `handleLoadBooks`: load on mount and whenever search or genre changes, which makes the "Load Books" button optional.
3. `handleSelectBook`: fetch the book and its checkouts, and prefill the checkout form's `book_id`.
4. `handleCreateBook`: create the book, add it to the list or refetch, and reset the form.
5. `handleCreateCheckout`: create the checkout, refresh history if it's for the selected book, and reset the form.
6. Clear or show errors properly.
- ✅ Checkpoint: all Jest tests pass. `check_readiness.py` should report `ready=true`.

**6. UX polish** (the non-blocking TODOs): required-field validation, an empty-state message, submit feedback and confirmation, and removing the "Integration TODO" card and placeholder text. Some light styling so non-technical staff find it clear.

**7. End-to-end and submission**
- Run `docker compose up --build` and `./scripts/smoke-test.sh`, then click through the real app against Postgres.
- Push, confirm the CI **Grade** shows PASS, and open a PR titled `[Your Name] - …`.
- Add the submission summary to `AI_USAGE.md`.

Steps 1–3 and 4 are independent, so the frontend API layer could come first if you prefer. I'd do the backend first so the real app can be tried as soon as the frontend is wired up. Ready to start step 1 when you are.
`````

### Turn 3 — 2026-09-26T14:56:45-07:00
Tool/assistant: Claude Code (Claude desktop app, Code tab)
Model: claude-opus-5-5 (Claude Opus 5.5)
Model identity source: runtime metadata
Capture: Live
Status: Completed

#### User prompt — verbatim
````text
Build only step 1 for now
````

#### Assistance and code contribution
- Inspected `.gitignore`, `backend/Dockerfile` (runs `uvicorn app:app` from `backend/`, so
  the non-relative import fallback must keep working), and the Python environment.
  FastAPI was not installed globally (`ModuleNotFoundError`), so I created a throwaway venv
  in the session scratchpad (outside the repo) and installed `backend/requirements.txt` there.
- **Modified existing code, `backend/app.py`** (all additions were generated by the assistant):
  - Imports: `Depends`, `sqlalchemy.orm.Session`, `AsyncIterator`, `asynccontextmanager`,
    `db_models` (so the tables register on `Base.metadata`), and `Base, engine, get_db`
    from `database`. Both the relative and absolute import branches were updated.
  - New `lifespan()` context manager that calls `Base.metadata.create_all(bind=engine)`
    on startup, passed to `FastAPI(..., lifespan=lifespan)`.
  - Added a `db: Session = Depends(get_db)` parameter to `create_book`, `list_books`,
    `get_book`, `create_checkout`, and `list_book_checkouts`, with `_ = db` placeholders.
    The existing 501 stub bodies and TODOs are left as they were for steps 2–3.
- No other files changed. No applicant edits observed.

#### Verification
- Executed: `DATABASE_URL='sqlite:///:memory:' python -m pytest -q backend/tests` (scratchpad
  venv, Python 3.14.7). Result: **5 passed, 7 failed**. The passes are the five 422-validation
  tests. The failures are all routes that still return 501 (expected until steps 2–3).
- Executed: a startup check against a fresh SQLite file in the scratchpad. Tables before
  startup: `[]`. After `TestClient` startup: `['books', 'checkouts']`. `GET /` → 200
  `{'status': 'ok'}`, and invalid `POST /books` → 422.
- Not run: Postgres/Docker, frontend tests.

#### Assistant response — verbatim
`````markdown
Step 1 is done. The only file changed is `backend/app.py`.

**What changed**
- **Table creation:** a new `lifespan` hook runs `Base.metadata.create_all(bind=engine)` when the app starts. It imports `db_models` so both tables are registered, and it only creates tables that are missing, so restarts are safe.
- **DB session injection:** all 5 routes now take `db: Session = Depends(get_db)`. The tests override `get_db` with their in-memory database, so this is what connects the routes to the test DB.
- The route bodies are still the original 501 stubs, which steps 2–3 will replace. I updated both import branches (relative for pytest's `backend.app`, absolute for Docker's `uvicorn app:app`).

**Verification**

FastAPI wasn't installed on your machine, so I made a throwaway venv in my scratchpad (not in the repo) to test with.
- `pytest backend/tests`: **5 passed, 7 failed.** The 5 validation (422) tests pass. The 7 failures are the routes that still return 501, which is expected until steps 2–3.
- Startup check on a fresh DB: no tables before, `books` and `checkouts` after startup. `GET /` returns 200.
- Not tested yet against Postgres/Docker. That's planned for step 7.

**One thing to know:** if you run pytest locally without setting `DATABASE_URL`, startup will create a `libraryconnect.db` SQLite file in your current directory, and `.gitignore` doesn't exclude it. CI sets `sqlite:///:memory:`, so it isn't affected. Locally you can run:

```bash
DATABASE_URL='sqlite:///:memory:' python -m pytest -q backend/tests
```

Ready for step 2 (book endpoints) when you are.
`````

### Turn 4 — 2026-09-26T15:01:06-07:00
Tool/assistant: Claude Code (Claude desktop app, Code tab)
Model: claude-opus-5-5 (Claude Opus 5.5)
Model identity source: runtime metadata
Capture: Live
Status: Completed

#### User prompt — verbatim
````text
what feature did  you just build
````

#### Assistance and code contribution
- Explanation only, based on the Turn 3 change to `backend/app.py`. No files read or
  modified other than this log. No applicant edits observed.

#### Verification
Not run (question only).

#### Assistant response — verbatim
`````markdown
None of the README's features yet. Step 1 was backend groundwork that all the features depend on, not a feature a staff member can use.

It did two things in `backend/app.py`:

1. **The database tables get created.** When the backend starts, it now creates the `books` and `checkouts` tables if they're missing. Before this, nothing ever created them, so the first save would have failed.
2. **The API routes can reach the database.** Each of the 5 endpoints now receives a database session. The route bodies still return "501 not implemented", so they don't use it yet.

From a user's point of view nothing changes yet: you still can't create, list, or check out books. The first real feature, **Book Management** (create a book, list books, view one book), comes in step 2. **Search and Filtering** is also part of step 2, on the `GET /books` endpoint.
`````

### Turn 5 — 2026-09-26T15:03:18-07:00
Tool/assistant: Claude Code (Claude desktop app, Code tab)
Model: claude-opus-5-5 (Claude Opus 5.5)
Model identity source: runtime metadata
Capture: Live
Status: Completed

#### User prompt — verbatim
````text
in what way do the steps differ from the features
````

#### Assistance and code contribution
- Explanation only, comparing the README's features with the Turn 2 build plan. Added
  a step-by-feature mapping table and offered a feature-by-feature (vertical slice)
  ordering as an alternative. No files read or modified other than this log. No
  applicant edits observed.

#### Verification
Not run (question only).

#### Assistant response — verbatim
`````markdown
**Features** describe what staff can do. The README lists three: Book Management, Search and Filtering, and Checkout Tracking. **Steps** are the order I proposed for writing the code, and they're split by *layer* (backend → frontend API calls → screen), not by feature.

That means each feature is spread across several steps, and most steps contain pieces of more than one feature:

| Step | Book Management | Search & Filtering | Checkout Tracking |
|---|---|---|---|
| 1. Backend foundation (tables + DB session) | shared groundwork | shared groundwork | shared groundwork |
| 2. Book endpoints | ✅ create / list / get one | ✅ `q` + `genre` on list | — |
| 3. Checkout endpoints | — | — | ✅ create / list per book |
| 4. Frontend API calls (`api.ts`) | ✅ | ✅ | ✅ |
| 5. App wiring (`App.tsx`) | ✅ | ✅ | ✅ |
| 6. UX polish | ✅ | ✅ (empty state) | ✅ |
| 7. End-to-end + submit | ✅ | ✅ | ✅ |

So a feature is only usable by staff once it's done in steps 2/3, 4 **and** 5. For example, Book Management needs the backend route, the `api.ts` call, and the `App.tsx` handler.

**Why I ordered it by layer:** the starter code and tests are organized that way (backend tests, API tests, App tests), so each step ends with a test checkpoint you can run. Each layer is also built on the one below it.

**The alternative is building by feature ("vertical slices"):** do Book Management through all layers, then Search, then Checkouts. The upside is that each feature works in the real app sooner. The downside is going back into the same files (`app.py`, `api.ts`, `App.tsx`) three times, and CI still won't grade anything until all the stubs are gone. Either works. Tell me if you'd rather switch.
`````

### Turn 6 — 2026-09-26T15:06:31-07:00
Tool/assistant: Claude Code (Claude desktop app, Code tab)
Model: claude-opus-5-5 (Claude Opus 5.5)
Model identity source: runtime metadata
Capture: Live
Status: Completed

#### User prompt — verbatim
````text
how do i run the app to test step 1. walk me through
````

#### Assistance and code contribution
- Checked the environment: `docker` was not found on PATH, and `py -0` showed only Python 3.14
  (64-bit). Listed `backend/`.
- Wrote a PowerShell walkthrough for running the backend locally on SQLite (a venv in
  `backend/.venv`, uvicorn, `/` and `/docs` checks, a table check, and pytest). No code
  written or modified. No applicant edits observed.

#### Verification
- None of the walkthrough commands were run in this turn. Equivalent checks were run in
  Turn 3 (pytest: 5 passed / 7 failed; lifespan created `books` and `checkouts` tables).
  The exact PowerShell commands are suggested for the applicant and not executed by me.

#### Assistant response — verbatim
`````markdown
Docker isn't installed on this machine (`docker` isn't found), so the simplest way is to run the backend directly with Python. It will use a local SQLite file instead of Postgres. The frontend isn't useful yet because every button still shows a TODO, so we'll only run the backend.

Commands are for **PowerShell**, starting from the repo folder (`blueprint-challenge-kc`).

### 1. Set up a Python environment (one time)

```powershell
cd backend
```

```powershell
py -m venv .venv
```

```powershell
.venv\Scripts\python -m pip install -r requirements.txt
```

I call `.venv\Scripts\python` directly so you don't have to activate the venv. That avoids PowerShell's script-execution-policy error.

### 2. Start the backend

```powershell
.venv\Scripts\python -m uvicorn app:app --reload
```

Wait for `Application startup complete.` Leave this terminal running.

### 3. Check what step 1 did

**a. Server is up.** Open http://localhost:8000/ in a browser. You should see `{"status":"ok"}`.

**b. Tables were created at startup.** This is the main thing step 1 added. A `libraryconnect.db` file should now exist in `backend/`. In a **second** terminal, from `backend/`:

```powershell
.venv\Scripts\python -c "import sqlite3; print(sqlite3.connect('libraryconnect.db').execute('select name from sqlite_master').fetchall())"
```

You should see `books` and `checkouts` in the output, along with some `ix_...` index names. For extra proof: stop the server (Ctrl+C), delete `libraryconnect.db`, start it again, and the file and tables come back.

**c. Routes are wired up.** Open http://localhost:8000/docs. All 5 endpoints are listed. Click **POST /books → Try it out**:
- Send `"genre": "Mystery"` or a bad email → **422**. Validation is working.
- Send a valid book → **501 "TODO: implement POST /books"**. That's expected until step 2.

### 4. (Optional) Run the backend tests

From the repo root, in a second terminal:

```powershell
$env:DATABASE_URL = 'sqlite:///:memory:'
```

```powershell
backend\.venv\Scripts\python -m pytest -q backend/tests
```

Expected result: **5 passed, 7 failed**. The 7 failures are the 501 stubs, which steps 2–3 will fix.

### Cleanup notes
- `backend/.venv/` and `backend/libraryconnect.db` aren't in `.gitignore`, so don't commit them. I can add them to `.gitignore` if you want.
- To test against real Postgres (as the README intends), install Docker Desktop and run `docker compose up --build` from the repo root. I'd leave that for step 7.
`````

### Turn 7 — 2026-09-26T15:21:02-07:00
Tool/assistant: Claude Code (Claude desktop app, Code tab)
Model: claude-opus-5-5 (Claude Opus 5.5)
Model identity source: runtime metadata
Capture: Live
Status: Completed

#### User prompt — verbatim
````text
for the "check what step 1 did" step, do i paste that entire command, even the stuff before the quotation marks
````

#### Assistance and code contribution
- Explained the parts of the table-check command. No repo code written or modified.
- Copied the Turn 3 scratchpad test DB to `libraryconnect.db` in the scratchpad (outside
  the repo) so the exact command could be tested there. No applicant edits observed.

#### Verification
- Executed in PowerShell 5.1 (from the scratchpad, using the scratchpad venv's python):
  `venv\Scripts\python -c "import sqlite3; print(sqlite3.connect('libraryconnect.db').execute('select name from sqlite_master').fetchall())"`
  Output: `[('books',), ('ix_books_title',), ('ix_books_id',), ('ix_books_genre',), ('checkouts',), ('ix_checkouts_book_id',), ('ix_checkouts_id',)]`.
  This confirms the quoting works in PowerShell. It was not run against the applicant's
  `backend/libraryconnect.db`.

#### Assistant response — verbatim
`````markdown
Yes, paste the **whole line**, including everything before the quotes. It's one command:

```powershell
.venv\Scripts\python -c "import sqlite3; print(sqlite3.connect('libraryconnect.db').execute('select name from sqlite_master').fetchall())"
```

What each part does:
- `.venv\Scripts\python` runs the Python inside your venv. This part is required. Without it, PowerShell doesn't know what to run the rest with.
- `-c` tells Python "run the following code".
- `"…"` is the short Python snippet itself. It opens `libraryconnect.db` and prints the names of everything inside it.

Two things to check before running it:
1. You're in the `backend` folder, since that's where `.venv` and `libraryconnect.db` are. If your prompt doesn't end in `\backend>`, run `cd backend` first.
2. The server from step 2 has been started at least once, because that's what creates `libraryconnect.db`.

I ran this exact line in PowerShell on a copy of my test database, and it printed:

```text
[('books',), ('ix_books_title',), ('ix_books_id',), ('ix_books_genre',), ('checkouts',), ('ix_checkouts_book_id',), ('ix_checkouts_id',)]
```

If you see `books` and `checkouts` in yours, step 1 is working. The `ix_…` entries are indexes and can be ignored. If you get `[]`, the file exists but the server hasn't created the tables. Let me know if that happens.
`````

### Turn 8 — 2026-09-26T18:12:15-07:00
Tool/assistant: Claude Code (Claude desktop app, Code tab)
Model: claude-opus-5-5 (Claude Opus 5.5)
Model identity source: runtime metadata
Capture: Live
Status: Completed

#### User prompt — verbatim
````text
briefly walk me through what step 1 does in simplified language, and how it connects to step 2 (make this part very short)
````

#### Assistance and code contribution
- Plain-language explanation of the Turn 3 change to `backend/app.py` and how it leads into
  step 2. No files read or modified other than this log. No applicant edits observed.

#### Verification
Not run (question only).

#### Assistant response — verbatim
`````markdown
**Step 1, simply put:**

Think of the database as a filing cabinet.

1. **It builds the drawers.** When the backend starts, it checks that there's a "books" drawer and a "checkouts" drawer, and creates them if they're missing.
2. **It gives each endpoint a key to the cabinet.** Every request to the backend (for example "add a book" or "list books") is now handed a database connection it can use.

Nothing is put in or taken out of the cabinet yet. The endpoints have the key but still just say "not implemented."

**How it connects to step 2:** step 2 uses that key. The book endpoints will put books into the drawer and read them back out (including searching and filtering).
`````
