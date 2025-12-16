"use client";

import { useState, useEffect, useCallback } from "react";

const OPENAI_API_KEY_STORAGE = "openai_api_key";
const WORKFLOW_ID_STORAGE = "chatkit_workflow_id";
const WORKFLOW_VERSION_STORAGE = "chatkit_workflow_version";

export interface ApiKeys {
  openaiApiKey: string;
  workflowId: string;
  workflowVersion: number | null;
}

export function useApiKeys() {
  const [keys, setKeys] = useState<ApiKeys>({
    openaiApiKey: "",
    workflowId: "",
    workflowVersion: null,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedApiKey = localStorage.getItem(OPENAI_API_KEY_STORAGE) ?? "";
      const storedWorkflowId = localStorage.getItem(WORKFLOW_ID_STORAGE) ?? "";

      const rawVersion = localStorage.getItem(WORKFLOW_VERSION_STORAGE);
      const parsedVersion = rawVersion ? Number(rawVersion) : null;
      const storedWorkflowVersion =
        rawVersion &&
        typeof parsedVersion === "number" &&
        Number.isFinite(parsedVersion) &&
        parsedVersion > 0
          ? parsedVersion
          : null;

      setKeys({
        openaiApiKey: storedApiKey,
        workflowId: storedWorkflowId,
        workflowVersion: storedWorkflowVersion,
      });
      setIsLoaded(true);
    }
  }, []);

  const setOpenaiApiKey = useCallback((key: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(OPENAI_API_KEY_STORAGE, key);
      setKeys((prev) => ({ ...prev, openaiApiKey: key }));
    }
  }, []);

  const setWorkflowId = useCallback((id: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(WORKFLOW_ID_STORAGE, id);
      setKeys((prev) => ({ ...prev, workflowId: id }));
    }
  }, []);

  const setWorkflowVersion = useCallback((version: number | null) => {
    if (typeof window !== "undefined") {
      if (version === null) {
        localStorage.removeItem(WORKFLOW_VERSION_STORAGE);
      } else {
        localStorage.setItem(WORKFLOW_VERSION_STORAGE, String(version));
      }
      setKeys((prev) => ({ ...prev, workflowVersion: version }));
    }
  }, []);

  const setBothKeys = useCallback((apiKey: string, workflowId: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(OPENAI_API_KEY_STORAGE, apiKey);
      localStorage.setItem(WORKFLOW_ID_STORAGE, workflowId);
      setKeys((prev) => ({ ...prev, openaiApiKey: apiKey, workflowId }));
    }
  }, []);

  const clearKeys = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(OPENAI_API_KEY_STORAGE);
      localStorage.removeItem(WORKFLOW_ID_STORAGE);
      localStorage.removeItem(WORKFLOW_VERSION_STORAGE);
      setKeys({ openaiApiKey: "", workflowId: "", workflowVersion: null });
    }
  }, []);

  const hasValidKeys = Boolean(
    keys.openaiApiKey?.startsWith("sk-") && keys.workflowId?.startsWith("wf_")
  );

  return {
    keys,
    isLoaded,
    hasValidKeys,
    setOpenaiApiKey,
    setWorkflowId,
    setWorkflowVersion,
    setBothKeys,
    clearKeys,
  };
}
