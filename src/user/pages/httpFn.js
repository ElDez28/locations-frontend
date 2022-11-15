import { useState, useCallback, useRef, useEffect } from "react";

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const activeHttpRequest = useRef([]);
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      try {
        setIsLoading(true);
        const httpAbortCtrll = new AbortController();
        activeHttpRequest.current.push(httpAbortCtrll);
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrll.signal,
          credentials: "include",
        });
        setIsLoading(false);
        const data = await response.json();

        activeHttpRequest.current = activeHttpRequest.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrll
        );
        if (!response.ok) {
          throw new Error(data.message);
        }
        return data;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    const http = activeHttpRequest.current;
    return () => {
      http.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);
  return {
    isLoading,
    error,
    sendRequest,
    clearError,
  };
};
