import axios from 'axios';
import { Movie, MovieDetails, Genre, Cast, Video, ApiResponse } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const tmdbApi = {
  // Get popular movies
  getPopularMovies: (page: number = 1): Promise<ApiResponse<Movie>> =>
    api.get(`/movie/popular?page=${page}`).then(res => res.data),

  // Get movie details
  getMovieDetails: (movieId: number): Promise<MovieDetails> =>
    api.get(`/movie/${movieId}`).then(res => res.data),

  // Get movie cast
  getMovieCredits: (movieId: number): Promise<{ cast: Cast[] }> =>
    api.get(`/movie/${movieId}/credits`).then(res => res.data),

  // Get movie videos/trailers
  getMovieVideos: (movieId: number): Promise<{ results: Video[] }> =>
    api.get(`/movie/${movieId}/videos`).then(res => res.data),

  // Search movies
  searchMovies: (query: string, page: number = 1): Promise<ApiResponse<Movie>> =>
    api.get(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`).then(res => res.data),

  // Get genres
  getGenres: (): Promise<{ genres: Genre[] }> =>
    api.get('/genre/movie/list').then(res => res.data),

  // Get movies by genre
  getMoviesByGenre: (genreId: number, page: number = 1): Promise<ApiResponse<Movie>> =>
    api.get(`/discover/movie?with_genres=${genreId}&page=${page}`).then(res => res.data),

  // Get top rated movies
  getTopRatedMovies: (page: number = 1): Promise<ApiResponse<Movie>> =>
    api.get(`/movie/top_rated?page=${page}`).then(res => res.data),

  // Get now playing movies
  getNowPlayingMovies: (page: number = 1): Promise<ApiResponse<Movie>> =>
    api.get(`/movie/now_playing?page=${page}`).then(res => res.data),
};

export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder-movie.jpg';
  return `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${size}${path}`;
};