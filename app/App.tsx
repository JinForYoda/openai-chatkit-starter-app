"use client";

import { useCallback } from "react";
import { ChatKitPanel, type FactAction } from "@/components/ChatKitPanel";
import { SettingsPanel } from "@/components/SettingsPanel";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useApiKeys } from "@/hooks/useApiKeys";

export default function App() {
  const { scheme, setScheme } = useColorScheme();
  const { keys, isLoaded, hasValidKeys, setBothKeys, clearKeys } = useApiKeys();

  const handleWidgetAction = useCallback(async (action: FactAction) => {
    // Handle widget actions (e.g., save facts)
  }, []);

  const handleResponseEnd = useCallback(() => {
    // Handle response completion
  }, []);

  // Show loading state while keys are being loaded from localStorage
  if (!isLoaded) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100 dark:bg-slate-950">
        <div className="text-slate-500 dark:text-slate-400">Loading...</div>
      </main>
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-end bg-slate-100 dark:bg-slate-950">
      <SettingsPanel keys={keys} onSave={setBothKeys} onClear={clearKeys} />
      {hasValidKeys && (
        <div className="mx-auto w-full max-w-5xl">
          <ChatKitPanel
            key={`${keys.openaiApiKey}-${keys.workflowId}`}
            theme={scheme}
            apiKeys={keys}
            onWidgetAction={handleWidgetAction}
            onResponseEnd={handleResponseEnd}
            onThemeRequest={setScheme}
          />
        </div>
      )}
    </main>
  );
}
