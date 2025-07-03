import { useState, useEffect, useCallback } from 'react';
import { Movie } from '../types/movie';
import { tmdbApi } from '../services/tmdbApi';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await tmdbApi.searchMovies(searchQuery);
      setResults(response.results);
    } catch (err) {
      setError('Search failed');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      search(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, search]);

  return { query, setQuery, results, loading, error };
};