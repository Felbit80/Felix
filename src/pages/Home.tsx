import React, { useState, useMemo } from 'react';
import MovieGrid from '../components/MovieGrid';
import FilterBar from '../components/FilterBar';
import { useMovies } from '../hooks/useMovies';

const Home: React.FC = () => {
  const { movies, genres, loading, error } = useMovies();
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('popularity');

  const filteredAndSortedMovies = useMemo(() => {
    let filtered = [...movies];

    // Filter by genre
    if (selectedGenre) {
      filtered = filtered.filter((movie) =>
        movie.genre_ids.includes(selectedGenre)
      );
    }

    // Sort movies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'release_date':
          return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
        case 'vote_average':
          return b.vote_average - a.vote_average;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'popularity':
        default:
          return b.popularity - a.popularity;
      }
    });

    return filtered;
  }, [movies, selectedGenre, sortBy]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">Erro ao carregar filmes</p>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-red-900 via-red-800 to-red-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Descubra filmes incríveis
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Explore milhares de filmes, encontre seus favoritos e descubra o que assistir em seguida.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
      </div>

      {/* Filters */}
      <FilterBar
        genres={genres}
        selectedGenre={selectedGenre}
        sortBy={sortBy}
        onGenreChange={setSelectedGenre}
        onSortChange={setSortBy}
      />

      {/* Movies Grid */}
      <MovieGrid
        movies={filteredAndSortedMovies}
        loading={loading}
        title="Popular Movies"
      />
    </div>
  );
};

export default Home;