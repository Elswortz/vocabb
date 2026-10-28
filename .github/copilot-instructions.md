# VocAbb — GitHub Copilot Instructions

## Project Overview
VocAbb is a full-stack English vocabulary learning application.

## Technology Stack
- Frontend: React, TypeScript, Vite, Material UI.
- Data fetching and caching: TanStack Query.
- Forms and validation: React Hook Form and Zod.
- Backend: Node.js, Express, TypeScript.
- Database and authentication: Supabase and PostgreSQL.
- Authentication uses access tokens and an HttpOnly refresh-token cookie.

## Architecture
- The repository contains frontend and backend applications.
- Frontend uses a feature-based architecture.
- Follow the existing folder structure, naming conventions and coding style.
- Reuse existing API services, hooks, schemas, middleware and types.
- Keep frontend and backend API contracts consistent.
- Inspect relevant code before proposing or implementing changes.

## Development Workflow
- Work in small, sequential steps.
- Explain the approach before significant changes.
- Do not refactor unrelated code.
- Do not modify files outside the scope of the current task without asking.
- Run the relevant build or tests after changes when possible.
- Never claim a command or test succeeded unless it was actually run.
- Explain what changed, why it changed and how to verify it.
- If information is missing, inspect the repository instead of guessing.

## Security
- Never expose secrets, passwords, access tokens or API keys.
- Never put Supabase service-role credentials in frontend code.
- Preserve backend authentication, validation and authorization checks.
- Frontend role-based visibility is not a substitute for backend authorization.
- Ask before destructive operations or database schema changes.

## Collaboration
- Explain technical decisions in Russian.
- Prefer maintainable, beginner-friendly solutions.
- Implement one focused task at a time.
- Wait for approval before making broad changes.
- Preserve existing behavior unless a change is explicitly requested.

## Project Context
- Read DEVELOPMENT_STATUS.md before starting a development task, if it exists.
- Keep documentation and development status consistent with verified code.
- Distinguish implemented and tested features from planned features.
- Never assume that previous chat history accurately reflects the current code.