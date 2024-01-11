import { useState } from 'react';

interface UseCreateState<T> {
  loading: Boolean;
  data?: T;
  error?: object;
}

type UseCreateResult<T> = [(data: any) => void, UseCreateState<T>];

export default function useCreate<T = any>(url: string): UseCreateResult<T> {
  const [state, setState] = useState<UseCreateState<T>>({
    data: undefined,
    error: undefined,
    loading: false,
  });
  const func = (data: any) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
