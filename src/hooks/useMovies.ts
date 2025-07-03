import { useState, useEffect } from 'react';
import { Movie, Genre } from '../types/movie';
import { tmdbApi } from '../services/tmdbApi';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [moviesResponse, genresResponse] = await Promise.all([
          tmdbApi.getPopularMovies(),
          tmdbApi.getGenres(),
        ]);
        setMovies(moviesResponse.results);
        setGenres(genresResponse.genres);
      } catch (err) {
        setError('Failed to fetch movies');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { movies, genres, loading, error, setMovies };
};