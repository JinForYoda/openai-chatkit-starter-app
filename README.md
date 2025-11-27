# ChatKit Starter Template

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![NextJS](https://img.shields.io/badge/Built_with-NextJS-blue)
![OpenAI API](https://img.shields.io/badge/Powered_by-OpenAI_API-orange)

This repository is the simplest way to bootstrap a [ChatKit](http://openai.github.io/chatkit-js/) application. It ships with a minimal Next.js UI, the ChatKit web component, and a ready-to-use session endpoint so you can experiment with OpenAI-hosted workflows built using [Agent Builder](https://platform.openai.com/agent-builder).

## What You Get

- Next.js app with `<openai-chatkit>` web component and theming controls
- API endpoint for creating a session at [`app/api/create-session/route.ts`](app/api/create-session/route.ts)
- Config file for starter prompts, theme, placeholder text, and greeting message

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the app

```bash
npm run dev
```

### 3. Configure your API credentials

When you first open the app at `http://localhost:3000`, you'll see a Settings panel. Enter your credentials:

- **OpenAI API Key** — Get your key from the [OpenAI API Keys](https://platform.openai.com/api-keys) page. Must be created within the same org & project as your Agent Builder workflow.
- **Workflow ID** — Get your workflow ID from the [Agent Builder](https://platform.openai.com/agent-builder) interface after clicking "Publish" (starts with `wf_...`).

<img src="./public/docs/workflow.jpg" width=500 />

Your credentials are stored in your browser's localStorage and never sent to any server except OpenAI's API.

> Note: If your workflow uses a model requiring organization verification (e.g., GPT-5), verify your organization first at [organization settings](https://platform.openai.com/settings/organization/general).

### 4. Deploy to Vercel

This app is ready for Vercel deployment out of the box:

```bash
npm run build
vercel deploy
```

Or connect your GitHub repo to Vercel for automatic deployments. No environment variables are required — users configure their own API keys in the browser.

Before deploying, add your domain to the [Domain allowlist](https://platform.openai.com/settings/organization/security/domain-allowlist) on your OpenAI dashboard.

## Customization Tips

- Adjust starter prompts, greeting text, [chatkit theme](https://chatkit.studio/playground), and placeholder copy in [`lib/config.ts`](lib/config.ts).
- Update the event handlers inside [`components/.tsx`](components/ChatKitPanel.tsx) to integrate with your product analytics or storage.

## References

- [ChatKit JavaScript Library](http://openai.github.io/chatkit-js/)
- [Advanced Self-Hosting Examples](https://github.com/openai/openai-chatkit-advanced-samples)
