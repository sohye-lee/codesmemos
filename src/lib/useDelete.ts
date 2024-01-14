import { useState } from 'react';

interface UseDeleteState<T> {
  loading: Boolean;
  data?: T;
  error?: object;
}
type UseDeleteResult<T> = [() => void, UseDeleteState<T>];

export default function useDelete<T = any>(
  url: string,
  identity: string
): UseDeleteResult<T> {
  const [state, setState] = useState<UseDeleteState<T>>({
    data: undefined,
    error: undefined,
    loading: false,
  });

  const func = () => {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identity }),
    })
      .then((res) => res.json())
      .then((data) => setState((prev) => ({ ...prev, data, loading: false })))
      .catch((error) =>
        setState((prev) => ({ ...prev, error, loading: false }))
      );
  };
  return [func, { ...state }];
}
