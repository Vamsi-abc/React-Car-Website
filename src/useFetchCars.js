import { useState, useEffect } from 'react';

// Live public API endpoint
const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=3';

export function useFetchCars(fallbackCars) {
  const [data, setData] = useState(fallbackCars);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    async function fetchShowroomStatus() {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('API connection failed');
        await res.json();

        if (isSubscribed) {
          setData(fallbackCars);
          setLoading(false);
        }
      } catch (err) {
        if (isSubscribed) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchShowroomStatus();

    return () => {
      isSubscribed = false;
    };
  }, [fallbackCars]);

  return { data, loading, error };
}