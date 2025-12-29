# 🧠 Monto Product Brain

AI-powered product knowledge base that automatically documents both platforms.

## What This Does

- **Extracts** knowledge from your codebase automatically
- **Documents** personas, user flows, components, APIs
- **Analyzes** edge cases and gaps
- **Suggests** improvements
- **Updates** automatically when you push code

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/your-org/monto-product-brain.git
cd monto-product-brain
npm install
```

### 2. Run Locally

```bash
npm run docs:dev
```

Visit `http://localhost:5173`

### 3. Build for Production

```bash
npm run docs:build
```

## Automation Setup

### Required Secrets

Add these to your GitHub repo settings → Secrets:

| Secret | Description |
|--------|-------------|
| `ANTHROPIC_API_KEY` | Your Claude API key |
| `REPO_ACCESS_TOKEN` | GitHub PAT with access to code repos |

### Enable GitHub Pages

1. Go to repo Settings → Pages
2. Source: GitHub Actions
3. Done! Site deploys automatically

### Set Up Webhooks (Optional)

To auto-extract when code changes, add this workflow to your code repos:

**In `user-platform/.github/workflows/notify-brain.yml`:**

```yaml
name: Notify Product Brain

on:
  push:
    branches: [main]
    paths: ['src/**']

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger extraction
        run: |
          curl -X POST \
            -H "Authorization: token ${{ secrets.BRAIN_REPO_TOKEN }}" \
            -H "Accept: application/vnd.github.v3+json" \
            https://api.github.com/repos/your-org/monto-product-brain/dispatches \
            -d '{"event_type":"code-updated","client_payload":{"platform":"user-platform"}}'
```

## File Structure

```
monto-product-brain/
├── docs/                          # All documentation (VitePress)
│   ├── index.md                   # Homepage/Dashboard
│   ├── user-platform/             # User Platform docs
│   │   ├── personas/
│   │   ├── flows/
│   │   └── inventory/
│   ├── backoffice/                # Backoffice docs
│   │   ├── personas/
│   │   ├── flows/
│   │   └── inventory/
│   ├── analysis/                  # Edge cases, gaps
│   └── suggestions/               # Improvement ideas
├── scripts/                       # Automation scripts
│   ├── extract.js                 # Codebase extraction
│   ├── analyze.js                 # Analysis agents
│   └── suggest.js                 # Suggestion agent
└── .github/workflows/             # GitHub Actions
    ├── deploy.yml                 # Auto-deploy on push
    └── extract.yml                # Auto-extract on code change
```

## Manual Commands

```bash
# Run local dev server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview

# Run extraction manually
npm run extract

# Run analysis manually
npm run analyze

# Generate suggestions
npm run suggest
```

## How It Works

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ Push to         │     │ GitHub Action   │     │ Site Updates    │
│ user-platform   │ ──▶ │ runs extraction │ ──▶ │ automatically   │
│ or backoffice   │     │ with Claude     │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Customization

### Theme

Edit `docs/.vitepress/config.js` to customize:
- Navigation
- Sidebar structure
- Colors and branding
- Search settings

### Content

All content is Markdown in the `docs/` folder. Edit directly or let the AI agents update it.

## Contributing

1. Edit markdown files in `docs/`
2. Commit and push
3. Site auto-deploys

## License

Private - Monto internal use only.
