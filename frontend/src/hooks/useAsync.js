import { useCallback, useState } from 'react';

export const useAsync = (asyncFunction) => {
  const [state, setState] = useState({ loading: false, error: '' });
  const execute = useCallback(async (...args) => {
    setState({ loading: true, error: '' });
    try {
      const result = await asyncFunction(...args);
      setState({ loading: false, error: '' });
      return result;
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong. Please try again.';
      setState({ loading: false, error: message });
      throw error;
    }
  }, [asyncFunction]);
  return { ...state, execute };
};
