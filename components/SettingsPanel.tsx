"use client";

import { useState, useEffect } from "react";
import type { ApiKeys } from "@/hooks/useApiKeys";

interface SettingsPanelProps {
  keys: ApiKeys;
  onSave: (apiKey: string, workflowId: string) => void;
  onWorkflowVersionChange?: (version: number | null) => void;
  onClear: () => void;
}

export function SettingsPanel({
  keys,
  onSave,
  onWorkflowVersionChange,
  onClear,
}: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [workflowIdInput, setWorkflowIdInput] = useState("");
  const [workflowVersionInput, setWorkflowVersionInput] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Sync state from props after mount to avoid hydration mismatch
  // Only runs once on mount
  useEffect(() => {
    setApiKeyInput(keys.openaiApiKey);
    setWorkflowIdInput(keys.workflowId);
    setWorkflowVersionInput(
      keys.workflowVersion ? String(keys.workflowVersion) : ""
    );
    setIsOpen(!keys.openaiApiKey || !keys.workflowId);
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setWorkflowIdInput(keys.workflowId);
  }, [keys.workflowId]);

  useEffect(() => {
    setWorkflowVersionInput(
      keys.workflowVersion ? String(keys.workflowVersion) : ""
    );
  }, [keys.workflowVersion]);

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null;
  }

  const syncDraftFromKeys = () => {
    setApiKeyInput(keys.openaiApiKey);
    setWorkflowIdInput(keys.workflowId);
    setWorkflowVersionInput(
      keys.workflowVersion ? String(keys.workflowVersion) : ""
    );
  };

  const handleSave = () => {
    const rawVersion = workflowVersionInput.trim();
    const nextVersion = rawVersion ? Number(rawVersion) : null;
    const resolvedVersion =
      typeof nextVersion === "number" &&
      Number.isFinite(nextVersion) &&
      nextVersion > 0
        ? Math.floor(nextVersion)
        : null;

    onWorkflowVersionChange?.(resolvedVersion);
    // Save both keys atomically in a single state update
    onSave(apiKeyInput.trim(), workflowIdInput.trim());
    setIsOpen(false);
  };

  const handleClear = () => {
    setApiKeyInput("");
    setWorkflowIdInput("");
    setWorkflowVersionInput("");
    onClear();
  };

  const isValid =
    apiKeyInput.trim().startsWith("sk-") &&
    workflowIdInput.trim().startsWith("wf_");

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          syncDraftFromKeys();
          setIsOpen(true);
        }}
        className="fixed top-4 right-4 z-50 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-lg transition-colors hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
      >
        ⚙️ Settings
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-800">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            API Configuration
          </h2>
          {keys.openaiApiKey && keys.workflowId && (
            <button
              onClick={() => {
                syncDraftFromKeys();
                setIsOpen(false);
              }}
              className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              ✕
            </button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Workflow Version
            </label>
            <div className="space-y-1">
              <input
                type="number"
                min={1}
                step={1}
                inputMode="numeric"
                value={workflowVersionInput}
                onChange={(e) => {
                  const nextRaw = e.target.value;
                  setWorkflowVersionInput(nextRaw);
                }}
                placeholder="(Latest)"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Active version:{" "}
                {keys.workflowVersion === null
                  ? "Latest"
                  : keys.workflowVersion}
              </p>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              OpenAI API Key
            </label>
            <div className="relative">
              <input
                type={showApiKey ? "text" : "password"}
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="sk-proj-..."
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 pr-20 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                {showApiKey ? "Hide" : "Show"}
              </button>
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Get your key from{" "}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                platform.openai.com/api-keys
              </a>
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Workflow ID
            </label>
            <input
              type="text"
              value={workflowIdInput}
              onChange={(e) => setWorkflowIdInput(e.target.value)}
              placeholder="wf_..."
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500"
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Get your workflow ID from{" "}
              <a
                href="https://platform.openai.com/agent-builder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Agent Builder
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleSave}
            disabled={!isValid}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 dark:disabled:bg-slate-600"
          >
            Save & Continue
          </button>
          {(apiKeyInput || workflowIdInput) && (
            <button
              onClick={handleClear}
              className="rounded-lg border border-red-300 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              Clear
            </button>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
          Keys are stored locally in your browser and never sent to our servers.
        </p>
      </div>
    </div>
  );
}
