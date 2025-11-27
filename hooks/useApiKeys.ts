"use client";

import { useState, useEffect, useCallback } from "react";

const OPENAI_API_KEY_STORAGE = "openai_api_key";
const WORKFLOW_ID_STORAGE = "chatkit_workflow_id";

export interface ApiKeys {
  openaiApiKey: string;
  workflowId: string;
}

export function useApiKeys() {
  const [keys, setKeys] = useState<ApiKeys>({
    openaiApiKey: "",
    workflowId: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedApiKey = localStorage.getItem(OPENAI_API_KEY_STORAGE) ?? "";
      const storedWorkflowId = localStorage.getItem(WORKFLOW_ID_STORAGE) ?? "";
      setKeys({
        openaiApiKey: storedApiKey,
        workflowId: storedWorkflowId,
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

  const setBothKeys = useCallback((apiKey: string, workflowId: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(OPENAI_API_KEY_STORAGE, apiKey);
      localStorage.setItem(WORKFLOW_ID_STORAGE, workflowId);
      setKeys({ openaiApiKey: apiKey, workflowId });
    }
  }, []);

  const clearKeys = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(OPENAI_API_KEY_STORAGE);
      localStorage.removeItem(WORKFLOW_ID_STORAGE);
      setKeys({ openaiApiKey: "", workflowId: "" });
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
    setBothKeys,
    clearKeys,
  };
}
