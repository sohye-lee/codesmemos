import { useState } from "react";

interface UseEditState<T> {
  loading: Boolean;
  data?: T;
  error?: object;
}

type UseEditResult<T> = [(data: any) => void, UseEditState<T>];

export default function useEdit<T = any>(url: string): UseEditResult<T> {
  const [state, setState] = useState<UseEditState<T>>({
    data: undefined,
    error: undefined,
    loading: false,
  });
  const func = (data: any) => {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => setState((prev) => ({ ...prev, data, loading: false })))
      .catch((error) =>
        setState((prev) => ({ ...prev, loading: false, error }))
      );
  };

  return [func, { ...state }];
}
