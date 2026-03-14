# OpenAI ChatKit Starter App

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![Next.js](https://img.shields.io/badge/Built%20with-Next.js-black)
![OpenAI](https://img.shields.io/badge/Powered%20by-OpenAI-orange)

A minimal Next.js starter for building and shipping an OpenAI ChatKit interface backed by an Agent Builder workflow.

Live demo: https://openai-chatkit-starter-app-gray-pi.vercel.app/

## Overview

This project gives you a working ChatKit setup with:

- a responsive chat UI powered by `@openai/chatkit-react`
- a built-in session endpoint for creating ChatKit sessions
- local settings for API key, workflow ID, and optional workflow version
- light/dark theme support and a simple starter configuration
- file upload enabled in the ChatKit session config

The app is designed for a lightweight deployment flow: users bring their own OpenAI API key and workflow ID, and those values stay in the browser.

## Demo

- Published app: https://openai-chatkit-starter-app-gray-pi.vercel.app/

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- OpenAI ChatKit React SDK
- Tailwind CSS 4

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000`.

### 3. Configure the app

When the app opens, use the Settings panel and provide:

- `OpenAI API Key` from https://platform.openai.com/api-keys
- `Workflow ID` from https://platform.openai.com/agent-builder
- `Workflow Version` if you want to pin a specific published version; leave it empty to use the latest

<img src="./public/docs/workflow.jpg" width="560" alt="Workflow ID location in Agent Builder" />

Credentials are stored in browser `localStorage`. The API key is only used to request a ChatKit session from OpenAI through the app's session route.

## How It Works

1. The client collects the user's API key and workflow details in the Settings modal.
2. The app sends a request to [`app/api/create-session/route.ts`](/Users/maxryaguzov/repositories/openai-chatkit-starter-app/app/api/create-session/route.ts).
3. That route creates a ChatKit session with the OpenAI API and returns a client secret.
4. The ChatKit widget connects to the selected workflow and renders the chat experience.

The route also persists a generated session identifier in a cookie so the same browser session can be reused.

## Project Structure

- [`app/App.tsx`](/Users/maxryaguzov/repositories/openai-chatkit-starter-app/app/App.tsx) wires the main page layout and app state
- [`components/ChatKitPanel.tsx`](/Users/maxryaguzov/repositories/openai-chatkit-starter-app/components/ChatKitPanel.tsx) renders the ChatKit experience and session lifecycle
- [`components/SettingsPanel.tsx`](/Users/maxryaguzov/repositories/openai-chatkit-starter-app/components/SettingsPanel.tsx) manages API key and workflow configuration
- [`app/api/create-session/route.ts`](/Users/maxryaguzov/repositories/openai-chatkit-starter-app/app/api/create-session/route.ts) creates ChatKit sessions
- [`lib/config.ts`](/Users/maxryaguzov/repositories/openai-chatkit-starter-app/lib/config.ts) contains prompts, greeting text, placeholder copy, and theme config

## Customization

You will usually want to adjust:

- starter prompts and greeting text in [`lib/config.ts`](/Users/maxryaguzov/repositories/openai-chatkit-starter-app/lib/config.ts)
- ChatKit event handling in [`components/ChatKitPanel.tsx`](/Users/maxryaguzov/repositories/openai-chatkit-starter-app/components/ChatKitPanel.tsx)
- UI behavior and validation in [`components/SettingsPanel.tsx`](/Users/maxryaguzov/repositories/openai-chatkit-starter-app/components/SettingsPanel.tsx)

For theme experimentation, use the ChatKit playground:

- https://chatkit.studio/playground

## Deployment

This app is ready to deploy to Vercel.

```bash
npm run build
```

If you deploy it publicly, add your production domain to the OpenAI domain allowlist:

- https://platform.openai.com/settings/organization/security/domain-allowlist

No server-side secret is required for the default flow because each user supplies their own API key in the browser.

## Notes

- Workflow IDs should start with `wf_`
- OpenAI API keys should start with `sk-`
- If a pinned workflow version is no longer available, the app falls back to the latest published version

## References

- ChatKit JavaScript docs: http://openai.github.io/chatkit-js/
- OpenAI Agent Builder: https://platform.openai.com/agent-builder
- Advanced ChatKit examples: https://github.com/openai/openai-chatkit-advanced-samples
