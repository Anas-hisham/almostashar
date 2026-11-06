'use client';

import { useState } from 'react';

export function useAsyncAction(action: (...args: any[]) => Promise<any>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function run(...args: any[]) {
    setLoading(true);
    setError('');

    try {
      return await action(...args);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      throw err;
    } finally {
      setLoading(false);
    }
  }
  function clearError() {
    setError('');
  }
  return { run, loading, error, clearError };
}