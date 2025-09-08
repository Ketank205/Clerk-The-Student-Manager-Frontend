/**
 * @module hooks/useFetch
 * @description Custom React hook for handling async data fetching with loading and error states
 */

import { useEffect, useState, useRef } from "react";

/**
 * Custom hook for managing async operations with loading and error states
 * 
 * @function useFetch
 * @param {Function} fn - Async function to execute
 * @param {Array} [deps=[]] - Dependency array for useEffect
 * @returns {Object} Fetch state object
 * @returns {any} data - The resolved data from the async function
 * @returns {boolean} loading - Current loading state
 * @returns {Error|null} error - Error object if the async function failed
 * 
 * @example
 * // Basic usage
 * const { data, loading, error } = useFetch(
 *   () => fetch('/api/data').then(r => r.json()),
 *   []
 * );
 * 
 * @example
 * // With dependencies
 * const { data, loading, error } = useFetch(
 *   () => fetchUserData(userId),
 *   [userId]
 * );
 */
export default function useFetch(fn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(fn));
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    /**
     * Executes the async function and manages state
     * @async
     * @function runner
     */
    async function runner() {
      setLoading(true);
      setError(null);
      try {
        const result = await fn();
        if (mounted.current) setData(result);
      } catch (err) {
        if (mounted.current) setError(err);
      } finally {
        if (mounted.current) setLoading(false);
      }
    }

    runner();

    // Cleanup function to prevent setState on unmounted component
    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}