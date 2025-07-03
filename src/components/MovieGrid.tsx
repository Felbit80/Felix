import React from 'react';
import { Movie } from '../types/movie';
import MovieCard from './MovieCard';
import LoadingSpinner from './LoadingSpinner';

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  title?: string;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, loading, title }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {title && (
        <h2 className="text-3xl font-bold text-white mb-8">{title}</h2>
      )}
      
      {movies.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">Nenhum filme encontrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieGrid;