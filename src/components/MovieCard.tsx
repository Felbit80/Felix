import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar } from 'lucide-react';
import { Movie } from '../types/movie';
import { getImageUrl } from '../services/tmdbApi';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';

  return (
    <Link 
      to={`/movie/${movie.id}`}
      className="group block bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-white text-xs font-medium">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
            {movie.title}
          </h3>
          {releaseYear && (
            <div className="flex items-center gap-1 text-gray-300 text-xs">
              <Calendar className="w-3 h-3" />
              <span>{releaseYear}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 leading-tight">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
          {releaseYear && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{releaseYear}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;