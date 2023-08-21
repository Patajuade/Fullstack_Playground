import { useEffect, useState } from "react";

const useFetch = (url: string, options: RequestInit) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [pending, setIsPending] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        setIsPending(true);
        const { signal } = abortController;
        const res = await fetch(url, { ...options, signal });
        const json = await res.json();

        setResponse(json);
        setIsPending(false);
      } catch (error: any) {
        setError(error);
      }
    };

    fetchData();

    return () => {
      if (abortController.abort) {
        abortController.abort();
      }
    };
  }, []);

  return { response, error, pending };
};

export default useFetch;
